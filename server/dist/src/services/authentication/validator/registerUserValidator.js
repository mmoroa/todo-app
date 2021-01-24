"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validator_util_1 = require("../../../util/validator_util");
/*
|--------------------------------------------------------------------------
| REGISTER INPUT VALIDATION
|--------------------------------------------------------------------------
| validate submitted inputs
|
*/
var registerUserValidator = function (input) {
    // validation rules
    var rules = {
        email: joi_1.default.string().required().email().trim(),
        password: joi_1.default.string().required().trim(),
        username: joi_1.default.string().required().trim(),
    };
    return validator_util_1.ValidateUserInput(input, rules);
};
exports.default = registerUserValidator;
//# sourceMappingURL=registerUserValidator.js.map