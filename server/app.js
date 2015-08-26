"use strict";

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

debug("应用启动!");

debug("加载 Mongoose");

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(mongoose_uri);
mongoose.connection.on('error', function () {
    debug('Mongoose连接失败');
});
mongoose.connection.once('open', function callback() {
    debug("Mongoose 已经连接到数据库");
});

debug("初始化 express");
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

var jwtCheck = jwt({
    secret: config.secret
});

jwtCheck.unless = unless;

app.use(jwtCheck.unless({path: '/api/login' }));
app.use(utils.middleware().unless({path: '/api/login' }));

app.use("/api", require(path.join(__dirname, "routes", "default.js"))());

// all other requests redirect to 404
app.all("*", function (req, res, next) {
    next(new NotFoundError("404"));
});

// error handler for all the applications
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

debug("Creating HTTP server on port: %s", http_port);
require('http').createServer(app).listen(http_port, function () {
    debug("HTTP Server listening on port: %s, in %s mode", http_port, app.get('env'));
});

debug("Creating HTTPS server on port: %s", https_port);
require('https').createServer({
    key: fs.readFileSync(path.join(__dirname, "keys", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "keys", "server.crt")),
    ca: fs.readFileSync(path.join(__dirname, "keys", "ca.crt")),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(https_port, function () {
    debug("HTTPS Server listening on port: %s, in %s mode", https_port, app.get('env'));
});