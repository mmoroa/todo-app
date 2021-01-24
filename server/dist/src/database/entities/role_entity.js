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
Object.defineProperty(exports, "__esModule", { value: true });
var objection_1 = require("objection");
var RoleEntity = /** @class */ (function (_super) {
    __extends(RoleEntity, _super);
    function RoleEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RoleEntity, "tableName", {
        get: function () {
            return 'role';
        },
        enumerable: false,
        configurable: true
    });
    RoleEntity.jsonSchema = {
        type: 'object',
        required: ['name', 'description'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            deletedAt: { type: 'string', nullable: true },
            blockedAt: { type: 'string', nullable: true }
        }
    };
    return RoleEntity;
}(objection_1.Model));
exports.default = RoleEntity;
//# sourceMappingURL=role_entity.js.map