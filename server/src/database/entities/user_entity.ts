import { Model } from 'objection';
import RoleEntity from './role_entity';
import TaskEntity from './task_entity';

class UserEntity extends Model {
    id!: number;
    roleId!: number;
    email!: string;
    password!: string;
    username!: string;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    deletedAt: string | undefined;
    blockedAt: string | undefined;

    static get tableName() {
        return 'user';
    }

    static jsonSchema = {
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

    static relationMappings = () => ({
        role: {
            relation: Model.BelongsToOneRelation,
            modelClass: RoleEntity,
            join: {
                from: 'user.roleId',
                to: 'role.id',
            },
        },
        tasks: {
            relation: Model.HasManyRelation,
            modelClass: TaskEntity,
            join: {
                from: 'user.id',
                to: 'task.userId',
            },
        },
    });
}

export default UserEntity;
