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
var user_entity_1 = __importDefault(require("./user_entity"));
var TaskEntity = /** @class */ (function (_super) {
    __extends(TaskEntity, _super);
    function TaskEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TaskEntity, "tableName", {
        get: function () {
            return 'task';
        },
        enumerable: false,
        configurable: true
    });
    TaskEntity.jsonSchema = {
        type: 'object',
        required: ['description', 'userId'],
        properties: {
            id: { type: 'integer' },
            description: { type: 'string' },
            userId: { type: 'integer' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            completedAt: { type: 'string', nullable: true }
        }
    };
    TaskEntity.relationMappings = function () { return ({
        user: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: user_entity_1.default,
            join: {
                from: 'task.userId',
                to: 'user.id'
            }
        },
    }); };
    return TaskEntity;
}(objection_1.Model));
exports.default = TaskEntity;
//# sourceMappingURL=task_entity.js.map