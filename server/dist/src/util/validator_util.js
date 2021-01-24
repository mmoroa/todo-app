"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserInput = exports.isArrayEmpty = exports.isEmpty = void 0;
var joi_1 = __importDefault(require("joi"));
var isEmpty = function (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};
exports.isEmpty = isEmpty;
var isArrayEmpty = function (array) {
    return !(Array.isArray(array) && array.length);
};
exports.isArrayEmpty = isArrayEmpty;
var ValidateUserInput = function (input, rules) {
    var schema = joi_1.default.object(rules);
    var error = schema.validate(input, { abortEarly: false }).error;
    var errors = {};
    error === null || error === void 0 ? void 0 : error.details.forEach(function (item) {
        errors[item.path[0]] = item.message;
    });
    return {
        valid: exports.isEmpty(errors),
        errors: errors
    };
};
exports.ValidateUserInput = ValidateUserInput;
//# sourceMappingURL=validator_util.js.map