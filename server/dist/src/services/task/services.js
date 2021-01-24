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
exports.taskService = exports.removeTaskService = exports.updateTaskService = exports.registerTaskService = exports.taskDirectoryService = void 0;
var repository_1 = require("../../database/repository");
var task_validator_1 = require("./task_validator");
var moment_1 = __importDefault(require("moment"));
var DEFAULT_ERROR_MESSAGE = "We are unable to process your request. Please check your entry and try again.";
var taskDirectoryService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, repository_1.TaskRepository.findAll(1, 500).catch(function (err) {
                    // throw a exception
                    console.error(err.message);
                    return res.status(500).send({
                        message: "We are unable to process your request at this time",
                        path: {},
                    });
                })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.status(200).send({ data: data })];
        }
    });
}); };
exports.taskDirectoryService = taskDirectoryService;
var registerTaskService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, _a, description, isComplete;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, task_validator_1.TaskValidator(req.body)];
            case 1:
                validator = _b.sent();
                if (!validator.valid) {
                    // throw a exception
                    return [2 /*return*/, res.status(403).send({
                            message: DEFAULT_ERROR_MESSAGE,
                            path: validator.errors
                        })];
                }
                _a = req.body, description = _a.description, isComplete = _a.isComplete;
                // initiate task create
                repository_1.TaskRepository.create({
                    description: description,
                    userId: req.user.id,
                    completedAt: (isComplete && isComplete == true) ? moment_1.default(new Date()).format("YYYY-MM-DD HH:mm:ss") : null,
                }).then(function (data) {
                    return res.status(201).send({
                        message: "registered successfully",
                        data: data
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
exports.registerTaskService = registerTaskService;
var updateTaskService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, validator, _a, description, isComplete;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, task_validator_1.TaskValidator(req.body)];
            case 1:
                validator = _b.sent();
                if (!validator.valid) {
                    // throw a exception
                    return [2 /*return*/, res.status(403).send({
                            message: DEFAULT_ERROR_MESSAGE,
                            path: validator.errors
                        })];
                }
                _a = req.body, description = _a.description, isComplete = _a.isComplete;
                repository_1.TaskRepository.update(id, {
                    description: description,
                    userId: req.user.id,
                    completedAt: (isComplete && isComplete == true) ? moment_1.default(new Date()).format("YYYY-MM-DD HH:mm:ss") : null,
                }).then(function (data) {
                    return res.status(201).send({
                        message: "updated successfully",
                        data: data
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
exports.updateTaskService = updateTaskService;
var removeTaskService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        if (!id) {
            // throw a exception
            return [2 /*return*/, res.status(403).send({
                    message: DEFAULT_ERROR_MESSAGE,
                    path: { id: "invalid id" }
                })];
        }
        repository_1.TaskRepository.delete(id).then(function (data) {
            return res.status(201).send({
                message: "removed successfully",
                data: data
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
exports.removeTaskService = removeTaskService;
var taskService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        if (!id) {
            // throw a exception
            return [2 /*return*/, res.status(403).send({
                    message: DEFAULT_ERROR_MESSAGE,
                    path: { id: "invalid id" }
                })];
        }
        // retrieve task
        repository_1.TaskRepository.findById(id).then(function (data) {
            if (data) {
                return res.status(201).send({
                    data: data
                });
            }
            return res.status(404).send({
                message: "",
                path: {
                    id: "task not found"
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
exports.taskService = taskService;
//# sourceMappingURL=services.js.map