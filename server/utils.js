"use strict";

/*
    redis的工具类。
 */

var debug = require('debug')('app:utils:' + process.pid),
    path = require('path'),
    util = require('util'),
    redis = require("redis"),
    client = redis.createClient(),
    _ = require("lodash"),
    config = require("./config.json"),
    jsonwebtoken = require("jsonwebtoken"),
    TOKEN_EXPIRATION = 60,
    TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60,
    UnauthorizedAccessError = require(path.join(__dirname, 'errors', 'UnauthorizedAccessError.js'));

client.on('error', function (err) {
    debug(err);
});

client.on('connect', function () {
    debug("Redis successfully connected");
});

/*
    从客户端上传的header中获得token。
 */
module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

/*
    根据user的ID 通过jwt生成token,并在redis中记录 {key : token , value: data}
 */
module.exports.create = function (user, req, res, next) {

    debug("Create token");

    if (_.isEmpty(user)) {
        return next(new Error('User data cannot be empty.'));
    }

    var data = {
        _id: user._id,
        username: user.username,
        access: user.access,
        name: user.name,
        email: user.email,
        token: jsonwebtoken.sign({ _id: user._id }, config.secret, {
            expiresInMinutes: TOKEN_EXPIRATION
        })
    };

    var decoded = jsonwebtoken.decode(data.token);

    data.token_exp = decoded.exp;
    data.token_iat = decoded.iat;

    debug("Token generated for user: %s, token: %s", data.username, data.token);

    client.set(data.token, JSON.stringify(data), function (err, reply) {
        if (err) {
            return next(new Error(err));
        }

        if (reply) {
            client.expire(data.token, TOKEN_EXPIRATION_SEC, function (err, reply) {
                if (err) {
                    return next(new Error("Can not set the expire value for the token key"));
                }
                if (reply) {
                    req.user = data;
                    next(); // we have succeeded
                } else {
                    return next(new Error('Expiration not set on redis'));
                }
            });
        }
        else {
            return next(new Error('Token没有保持在redis中'));
        }
    });

    return data;

};

/*
    从redis中检索token
 */
module.exports.retrieve = function (id, done) {

    debug("Calling retrieve for token: %s", id);

    if (_.isNull(id)) {
        return done(new Error("token_invalid"), {
            "message": "Invalid token"
        });
    }

    client.get(id, function (err, reply) {
        if (err) {
            return done(err, {
                "message": err
            });
        }

        if (_.isNull(reply)) {
            return done(new Error("token_invalid"), {
                "message": "Token doesn't exists, are you sure it hasn't expired or been revoked?"
            });
        } else {
            var data = JSON.parse(reply);
            debug("User data fetched from redis store for user: %s", data.username);

            if (_.isEqual(data.token, id)) {
                return done(null, data);
            } else {
                return done(new Error("token_doesnt_exist"), {
                    "message": "Token doesn't exists, login into the system so it can generate new token."
                });
            }

        }

    });

};



/*
 调用 JWT的verify验证token与用户的关系是否一致
 */
module.exports.verify = function (req, res, next) {

    debug("Verifying token");

    var token = exports.fetch(req.headers);

    jsonwebtoken.verify(token, config.secret, function (err, decode) {

        if (err) {
            req.user = undefined;
            return next(new UnauthorizedAccessError("invalid_token"));
        }

        exports.retrieve(token, function (err, data) {

            if (err) {
                req.user = undefined;
                return next(new UnauthorizedAccessError("invalid_token", data));
            }

            req.user = data;
            next();

        });

    });
};

/*
   退出时设置redis的相关键值对立即过期
 */
module.exports.expire = function (headers) {

    var token = exports.fetch(headers);

    debug("Expiring token: %s", token);

    if (token !== null) {
        client.expire(token, 0);
    }

    return token !== null;

};

/*
 中间件 供外部调用
 */
module.exports.middleware = function () {

    var func = function (req, res, next) {

        var token = exports.fetch(req.headers);

        exports.retrieve(token, function (err, data) {

            if (err) {
                req.user = undefined;
                return next(new UnauthorizedAccessError("invalid_token", data));
            } else {
                req.user = _.merge(req.user, data);
                next();
            }

        });
    };

    func.unless = require("express-unless");

    return func;

};

module.exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
module.exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;

debug("Loaded");