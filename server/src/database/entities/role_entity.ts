import { Model } from "objection";

class RoleEntity extends Model {
    id!: number;
    name!: string;
    description!: string;
    createdAt: string | undefined;
    updatedAt: string | undefined;

    static get tableName() {
        return 'role';
    }

    static jsonSchema = {
        type: 'object',
        required: ['name', 'description'],
        properties: {
            id: {type: 'integer'},
            name: {type: 'string'},
            description: {type: 'string'},
            createdAt: {type: 'string'},
            updatedAt: {type: 'string'},
            deletedAt: {type: 'string', nullable: true},
            blockedAt: {type: 'string', nullable: true}
        }
    };
}

export default RoleEntity;