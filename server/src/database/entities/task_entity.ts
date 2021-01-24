import { Model } from "objection";
import UserEntity from "./user_entity";

class TaskEntity extends Model {
    id!: number;
    description!: string;
    userId!: number;
    createdAt!: string;
    updatedAt!: string;
    completedAt: string | undefined;

    static get tableName() {
        return 'task';
    }

    static jsonSchema = {
        type: 'object',
        required: [ 'description','userId'],
        properties: {
            id: {type: 'integer'},
            description: {type: 'string'},
            userId: {type: 'integer'},
            createdAt: {type: 'string'},
            updatedAt: {type: 'string'},
            completedAt: {type: 'string', nullable: true}
        }
    };


    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserEntity,
            join: {
                from: 'task.userId',
                to: 'user.id'
            }
        },
    })
}

export default TaskEntity;