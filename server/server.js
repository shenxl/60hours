"use strict";

// =================================================================
// get the packages we need   ========================================
// =================================================================
var debug = require('debug')('app:' + process.pid),
    path = require("path"),
    fs = require("fs"),
    http_port = process.env.HTTP_PORT || 3000,
    https_port = process.env.HTTPS_PORT || 3443,
    jwt = require("express-jwt"),
    config = require("./config.json"),
    mongoose_uri = process.env.MONGOOSE_URI || "localhost/express-jwt-auth",
    onFinished = require('on-finished'),
    NotFoundError = require(path.join(__dirname, "errors", "NotFoundError.js")),
    utils = require(path.join(__dirname, "utils.js")),
    unless = require('express-unless');

// =================================================================
// 数据库连接 准备    ========================================
// =================================================================

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(mongoose_uri);
mongoose.connection.on('error', function () {
    debug('Mongoose连接失败');
});
mongoose.connection.once('open', function callback() {
    debug("Mongoose 已经连接到数据库");
});

// =================================================================
// express 初始化    ========================================
// =================================================================
var express = require('express'), app = express();

debug("加载插件");
app.use(require('morgan')("dev"));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('compression')());
app.use(require('response-time')());


app.use(function (req, res, next) {

    onFinished(res, function (err) {
        debug("[%s] finished request", req.connection.remoteAddress);
    });

    next();

});

// =================================================================
// JWT 验证过滤    ========================================
// =================================================================
var jwtCheck = jwt({
    secret: config.secret
});

jwtCheck.unless = unless;

app.use(jwtCheck.unless({path: '/api/login' }));
app.use(utils.middleware().unless({path: '/api/login' }));

app.use("/api", require(path.join(__dirname, "routes", "default.js"))());

// =================================================================
// 404 处理    ========================================
// =================================================================
app.all("*", function (req, res, next) {
    next(new NotFoundError("404"));
});

// =================================================================
// 异常 处理    ========================================
// =================================================================
app.use(function (err, req, res, next) {

    var errorType = typeof err,
        code = 500,
        msg = { message: "Internal Server Error" };

    switch (err.name) {
        case "UnauthorizedError":
            code = err.status;
            msg = undefined;
            break;
        case "BadRequestError":
        case "UnauthorizedAccessError":
        case "NotFoundError":
            code = err.status;
            msg = err.inner;
            break;
        default:
            break;
    }

    return res.status(code).json(msg);

});

// =================================================================
// http 连接    ========================================
// =================================================================
require('http').createServer(app).listen(http_port, function () {
    debug("HTTP Server listening on port: %s, in %s mode", http_port, app.get('env'));
});

// =================================================================
// https 连接    ========================================
// =================================================================
require('https').createServer({
    key: fs.readFileSync(path.join(__dirname, "keys", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "keys", "server.crt")),
    ca: fs.readFileSync(path.join(__dirname, "keys", "ca.crt")),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(https_port, function () {
    debug("HTTPS Server listening on port: %s, in %s mode", https_port, app.get('env'));
});