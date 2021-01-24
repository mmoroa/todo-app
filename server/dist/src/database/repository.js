"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.RoleRepository = exports.TaskRepository = exports.UserRepository = void 0;
var user_entity_1 = __importDefault(require("./entities/user_entity"));
var repository_util_1 = require("../util/repository_util");
var task_entity_1 = __importDefault(require("./entities/task_entity"));
var role_entity_1 = __importDefault(require("./entities/role_entity"));
var http_util_1 = require("../util/http_util");
exports.UserRepository = __assign(__assign({}, repository_util_1.RepositoryUtil(user_entity_1.default)), { findById: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, user_entity_1.default.query().findById(id).withGraphFetched('role')];
        });
    }); }, findByIdWithTask: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, user_entity_1.default.query()
                    .findById(id)
                    .withGraphFetched('[role,tasks]')
                    .select('id', 'username', 'email', 'createdAt')
                    .withGraphFetched('role')
                    .modifyGraph('role', function (builder) {
                    builder.select('name');
                })
                    .modifyGraph('tasks', function (builder) {
                    builder.select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt');
                })];
        });
    }); }, findAll: function (page, limit) { return __awaiter(void 0, void 0, void 0, function () {
        var sortColumn, sortDirection, message, total, directory, remaining, hasNext, hasPrevious;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sortColumn = 'createdAt';
                    sortDirection = 'desc';
                    message = 'We are unable to process your request at this time. Please try again in a few minutes.';
                    // validate inputs
                    if (page && !(page >= 1 && page <= 100)) {
                        http_util_1.HttpException.BAD_REQUEST({ message: message, path: { page: 'You can query maximum 100 records!' } });
                    }
                    if (limit && limit < 1) {
                        http_util_1.HttpException.BAD_REQUEST({ message: message, path: { size: 'Size must be a positive integer!' } });
                    }
                    return [4 /*yield*/, user_entity_1.default.query().count()];
                case 1:
                    total = _a.sent();
                    return [4 /*yield*/, user_entity_1.default.query()
                            .select('id', 'username', 'email', 'createdAt', 'updatedAt')
                            .withGraphFetched('role')
                            .modifyGraph('role', function (builder) {
                            builder.select('name');
                        })
                            .offset((page - 1) * limit)
                            .limit(limit)
                            .orderBy(sortColumn, sortDirection)];
                case 2:
                    directory = _a.sent();
                    if (directory.length > 0) {
                        remaining = Math.ceil(total[0]['count(*)'] / limit);
                        hasNext = page < remaining;
                        hasPrevious = page > 1;
                        return [2 /*return*/, {
                                directory: directory,
                                pageInfo: {
                                    total: total[0]['count(*)'],
                                    remaining: remaining,
                                    hasNext: hasNext,
                                    hasPrevious: hasPrevious,
                                },
                            }];
                    }
                    return [2 /*return*/, null];
            }
        });
    }); } });
exports.TaskRepository = __assign(__assign({}, repository_util_1.RepositoryUtil(task_entity_1.default)), { findAll: function (page, limit) { return __awaiter(void 0, void 0, void 0, function () {
        var sortColumn, sortDirection, message, total, directory, remaining, hasNext, hasPrevious;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sortColumn = 'createdAt';
                    sortDirection = 'desc';
                    message = 'We are unable to process your request at this time. Please try again in a few minutes.';
                    // validate inputs
                    if (page && !(page >= 1 && page <= 100)) {
                        http_util_1.HttpException.BAD_REQUEST({ message: message, path: { page: 'You can query maximum 100 records!' } });
                    }
                    if (limit && limit < 1) {
                        http_util_1.HttpException.BAD_REQUEST({ message: message, path: { size: 'Size must be a positive integer!' } });
                    }
                    return [4 /*yield*/, task_entity_1.default.query().count()];
                case 1:
                    total = _a.sent();
                    return [4 /*yield*/, task_entity_1.default.query()
                            .select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt')
                            .withGraphFetched('user.[role]')
                            .modifyGraph('user', function (builder) {
                            builder.select('id', 'email', 'username', 'createdAt');
                        })
                            .modifyGraph('user.[role]', function (builder) {
                            builder.select('name');
                        })
                            .offset((page - 1) * limit)
                            .limit(limit)
                            .orderBy(sortColumn, sortDirection)];
                case 2:
                    directory = _a.sent();
                    if (directory.length > 0) {
                        remaining = Math.ceil(total[0]['count(*)'] / limit);
                        hasNext = page < remaining;
                        hasPrevious = page > 1;
                        return [2 /*return*/, {
                                directory: directory,
                                pageInfo: {
                                    total: total[0]['count(*)'],
                                    remaining: remaining,
                                    hasNext: hasNext,
                                    hasPrevious: hasPrevious,
                                },
                            }];
                    }
                    return [2 /*return*/, null];
            }
        });
    }); }, findById: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, task_entity_1.default.query()
                    .findById(id)
                    .select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt')
                    .withGraphFetched('user.[role]')
                    .modifyGraph('user', function (builder) {
                    builder.select('id', 'email', 'username', 'createdAt');
                })
                    .modifyGraph('user.[role]', function (builder) {
                    builder.select('name');
                })];
        });
    }); }, findUserTasks: function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, task_entity_1.default.query()
                        .select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt')
                        .where('userId', userId)
                        .withGraphFetched('user.[role]')
                        .modifyGraph('user', function (builder) {
                        builder.select('id', 'email', 'username', 'createdAt');
                    })
                        .modifyGraph('user.[role]', function (builder) {
                        builder.select('name');
                    })];
                case 1:
                    data = _a.sent();
                    if (data.length > 0) {
                        return [2 /*return*/, {
                                directory: data,
                                pageInfo: {
                                    total: data.length,
                                },
                            }];
                    }
                    return [2 /*return*/, null];
            }
        });
    }); } });
exports.RoleRepository = __assign({}, repository_util_1.RepositoryUtil(role_entity_1.default));
//# sourceMappingURL=repository.js.map