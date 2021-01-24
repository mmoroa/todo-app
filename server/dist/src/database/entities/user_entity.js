"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var objection_1 = require("objection");
var role_entity_1 = __importDefault(require("./role_entity"));
var task_entity_1 = __importDefault(require("./task_entity"));
var UserEntity = /** @class */ (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserEntity, "tableName", {
        get: function () {
            return 'user';
        },
        enumerable: false,
        configurable: true
    });
    UserEntity.jsonSchema = {
        type: 'object',
        required: ['email', 'password', 'username', 'roleId'],
        properties: {
            id: { type: 'integer' },
            roleId: { type: 'integer' },
            email: { type: 'string' },
            password: { type: 'string' },
            username: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            deletedAt: { type: 'string', nullable: true },
            blockedAt: { type: 'string', nullable: true },
        },
    };
    UserEntity.relationMappings = function () { return ({
        role: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: role_entity_1.default,
            join: {
                from: 'user.roleId',
                to: 'role.id',
            },
        },
        tasks: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: task_entity_1.default,
            join: {
                from: 'user.id',
                to: 'task.userId',
            },
        },
    }); };
    return UserEntity;
}(objection_1.Model));
exports.default = UserEntity;
//# sourceMappingURL=user_entity.js.map