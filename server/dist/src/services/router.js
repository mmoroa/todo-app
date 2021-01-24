"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var security_util_1 = require("../util/security_util");
var authorisedUserService_1 = __importDefault(require("./authentication/authorisedUserService"));
var loginUserService_1 = __importDefault(require("./authentication/loginUserService"));
var registerUserService_1 = __importDefault(require("./authentication/registerUserService"));
var addTaskService_1 = __importDefault(require("./task/addTaskService"));
var removeTaskService_1 = __importDefault(require("./task/removeTaskService"));
var taskDetailsService_1 = __importDefault(require("./task/taskDetailsService"));
var taskDirectoryService_1 = __importDefault(require("./task/taskDirectoryService"));
var updateTaskService_1 = __importDefault(require("./task/updateTaskService"));
var userDirectoryService_1 = __importDefault(require("./user/userDirectoryService"));
var userProfileService_1 = __importDefault(require("./user/userProfileService"));
var baseUrl = '/api/v1';
module.exports = function (app) {
    // authentication router
    app.post(baseUrl + "/auth/register", registerUserService_1.default);
    app.post(baseUrl + "/auth", loginUserService_1.default);
    app.get(baseUrl + "/auth/me", security_util_1.SecurityUtil.verifyAccessToken, authorisedUserService_1.default);
    // user routers
    app.get(baseUrl + "/users/:id", security_util_1.SecurityUtil.verifyAccessToken, userProfileService_1.default);
    app.get(baseUrl + "/users", security_util_1.SecurityUtil.verifyAccessToken, userDirectoryService_1.default);
    // task routers
    app.post(baseUrl + "/todos", security_util_1.SecurityUtil.verifyAccessToken, addTaskService_1.default);
    app.get(baseUrl + "/todos", security_util_1.SecurityUtil.verifyAccessToken, taskDirectoryService_1.default);
    app.get(baseUrl + "/todos/:id", security_util_1.SecurityUtil.verifyAccessToken, taskDetailsService_1.default);
    app.put(baseUrl + "/todos/:id", security_util_1.SecurityUtil.verifyAccessToken, updateTaskService_1.default);
    app.put(baseUrl + "/todos/:id/isComplete", security_util_1.SecurityUtil.verifyAccessToken, updateTaskService_1.default);
    app.delete(baseUrl + "/todos/:id", security_util_1.SecurityUtil.verifyAccessToken, removeTaskService_1.default);
};
//# sourceMappingURL=router.js.map