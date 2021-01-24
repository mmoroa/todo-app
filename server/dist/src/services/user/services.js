"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileService = exports.registerUserService = exports.loginService = void 0;
var bcryptjs_1 = require("bcryptjs");
var security_util_1 = require("../../util/security_util");
var validator_util_1 = require("../../util/validator_util");
var repository_1 = require("../../database/repository");
var login_validator_1 = require("./login_validator");
var loginService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var DEFAULT_ERROR_MESSAGE, INCORRECT_PASSWORD_MESSAGE, validator, _a, email, password, auth;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                DEFAULT_ERROR_MESSAGE = "The username or password you have entered are incorrect. " +
                    "Please try again. As a reminder, your user ID and password are case-sensitive. ";
                INCORRECT_PASSWORD_MESSAGE = "The password you have entered is incorrect. Please try again. " +
                    'If you need to reset your password, select "Forgot your Password?"';
                return [4 /*yield*/, login_validator_1.LoginValidator(req.body)];
            case 1:
                validator = _b.sent();
                if (!validator.valid) {
                    // throw a exception
                    return [2 /*return*/, res.status(403).send({
                            message: DEFAULT_ERROR_MESSAGE,
                            path: validator.errors
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, repository_1.UserRepository.findOneBy("email", email).catch(function (err) {
                        // throw a exception
                        console.error(err.message);
                        return res.status(500).send({
                            message: "We are unable to process your request at this time",
                            path: {},
                        });
                    })];
            case 2:
                auth = _b.sent();
                if (validator_util_1.isArrayEmpty(auth)) {
                    // throw a exception
                    return [2 /*return*/, res.status(404).send({
                            message: DEFAULT_ERROR_MESSAGE,
                            path: { username: "invalid username", password: "invalid password" },
                        })];
                }
                // match password
                if (!bcryptjs_1.compareSync(password, auth[0].password)) {
                    return [2 /*return*/, res.status(403).send({
                            message: INCORRECT_PASSWORD_MESSAGE,
                            path: { password: "invalid password" },
                        })];
                }
                // grant user access
                return [2 /*return*/, res.status(200).send({
                        data: security_util_1.SecurityUtil.encrypt({ auth: auth[0] })
                    })];
        }
    });
}); };
exports.loginService = loginService;
var registerUserService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, DEFAULT_ERROR_MESSAGE, _a, email, password, auth;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, login_validator_1.LoginValidator(req.body)];
            case 1:
                validator = _b.sent();
                DEFAULT_ERROR_MESSAGE = "We are unable to process your request. Please check your entry and try again.";
                if (!validator.valid) {
                    // throw a exception
                    return [2 /*return*/, res.status(403).send({
                            message: DEFAULT_ERROR_MESSAGE,
                            path: validator.errors
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, repository_1.UserRepository.findOneBy("email", email)];
            case 2:
                auth = _b.sent();
                if (!validator_util_1.isArrayEmpty(auth)) {
                    // throw a exception
                    return [2 /*return*/, res.status(409).send({
                            message: "We are unable to process your request. A user, alias, or group already exists with that username",
                            path: { email: "Username already exists" },
                        })];
                }
                // register user
                repository_1.UserRepository.create({
                    roleId: 2,
                    email: email,
                    password: security_util_1.SecurityUtil.hash(password)
                }).then(function (data) {
                    return res.status(409).send({
                        message: "We are unable to process your request. A user, alias, or group already exists with that username",
                        path: { email: "Username already exists" },
                    });
                }).catch(function (err) {
                    // throw a exception
                    console.error(err.message);
                    return res.status(500).send({
                        message: "We are unable to process your request at this time",
                        path: {},
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
exports.registerUserService = registerUserService;
var userProfileService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.user.id;
        if (!id) {
            return [2 /*return*/, res.status(401).send({
                    message: "You are not authorized to perform this action. For assistance, please contact our customer service."
                })];
        }
        // lookup user
        repository_1.UserRepository.findById(id).then(function (data) {
            if (data) {
                return res.status(201).send({
                    data: data
                });
            }
            return res.status(404).send({
                message: "We are unable to process your request at this time.",
                path: {
                    id: "user not found"
                }
            });
        }).catch(function (err) {
            // throw a exception
            console.error(err.message);
            return res.status(500).send({
                message: "We are unable to process your request at this time",
                path: {},
            });
        });
        return [2 /*return*/];
    });
}); };
exports.userProfileService = userProfileService;
//# sourceMappingURL=services.js.map