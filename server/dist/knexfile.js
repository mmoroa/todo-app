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
Object.defineProperty(exports, "__esModule", { value: true });
var objection_1 = require("objection");
module.exports = __assign(__assign({ 
    // development: {
    client: 'sqlite3', useNullAsDefault: true, connection: {
        filename: 'tasks.db'
    } }, objection_1.knexSnakeCaseMappers()), { migrations: {
        tableName: "migrations",
        directory: "./src/database/migrations",
        extension: "ts",
    }, seeds: {
        directory: "./src/database/seeds",
        extension: "ts",
    } });
//# sourceMappingURL=knexfile.js.map