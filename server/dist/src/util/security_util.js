"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityUtil = void 0;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var constant_1 = require("./constant");
exports.SecurityUtil = {
    /*
    |--------------------------------------------------------------------------
    | Generate Access Token
    |--------------------------------------------------------------------------
    | create a session token across the entire site with given a timespan
    |
    */
    encrypt: function (data, expiresIn) {
        if (expiresIn === void 0) { expiresIn = '24h'; }
        return jsonwebtoken_1.sign(Object.assign({}, data), 'sercet', {
            expiresIn: expiresIn,
        });
    },
    /*
    |--------------------------------------------------------------------------
    | Verify access token
    |--------------------------------------------------------------------------
    | Verify whether a session token is valid within given a timespan
    |
    */
    verifyAccessToken: function (req, res, next) {
        // verify user access token
        var authHeader = req.headers.authorization;
        if (authHeader) {
            var token = authHeader.split(' ')[1];
            jsonwebtoken_1.verify(token, 'sercet', function (err, user) {
                if (err) {
                    console.error('VERIFY ACCESS TOKEN ERROR:' + err);
                    return res.sendStatus(403);
                }
                req.user = user.auth;
                next();
            });
        }
        else {
            res.status(401).send({
                message: constant_1.DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
            });
        }
    },
    /*
    |--------------------------------------------------------------------------
    | decode access token
    |--------------------------------------------------------------------------
    | decode encryption
    |
    */
    decodeAccessToken: function (token) {
        return jsonwebtoken_1.decode(token, { complete: true, json: true });
    },
    hash: function (str) { return bcryptjs_1.hashSync(str.toString(), bcryptjs_1.genSaltSync(10)); },
};
//# sourceMappingURL=security_util.js.map