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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = require("bcryptjs");
var repository_1 = require("../../database/repository");
var constant_1 = require("../../util/constant");
var security_util_1 = require("../../util/security_util");
var validator_util_1 = require("../../util/validator_util");
var loginUserValidator_1 = __importDefault(require("./validator/loginUserValidator"));
var LoginUserService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, _a, email, password, auth;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, loginUserValidator_1.default(req.body)];
            case 1:
                validator = _b.sent();
                if (!validator.valid) {
                    // throw a exception
                    return [2 /*return*/, res.status(400).send({
                            message: constant_1.DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
                            path: validator.errors,
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, repository_1.UserRepository.findOneBy('email', email).catch(function (err) {
                        // throw a exception
                        console.error(err.message);
                        return res.status(500).send({
                            message: constant_1.DEFAULT_INTERNAL_ERROR_MESSAGE,
                            path: {},
                        });
                    })];
            case 2:
                auth = _b.sent();
                if (validator_util_1.isArrayEmpty(auth)) {
                    // throw a exception
                    return [2 /*return*/, res.status(404).send({
                            message: constant_1.INCORRECT_CREDENTIALS_ERROR_MESSAGE,
                            path: { email: 'invalid username', password: 'invalid password' },
                        })];
                }
                // match password
                if (!bcryptjs_1.compareSync(password, auth[0].password)) {
                    return [2 /*return*/, res.status(403).send({
                            message: constant_1.INCORRECT_PASSWORD_MESSAGE,
                            path: { password: 'invalid password' },
                        })];
                }
                // grant user access
                return [2 /*return*/, res.status(200).send({
                        token: security_util_1.SecurityUtil.encrypt({ auth: auth[0] }),
                    })];
        }
    });
}); };
exports.default = LoginUserService;
//# sourceMappingURL=loginUserService.js.map