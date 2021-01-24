import UserEntity from './entities/user_entity';
import { RepositoryUtil } from '../util/repository_util';
import TaskEntity from './entities/task_entity';
import RoleEntity from './entities/role_entity';
import { HttpException } from '../util/http_util';

export const UserRepository = {
    ...RepositoryUtil(UserEntity),
    findById: async (id: string | number) => {
        return UserEntity.query().findById(id).withGraphFetched('role');
    },
    findByIdWithTask: async (id: string | number) => {
        return UserEntity.query()
            .findById(id)
            .withGraphFetched('[role,tasks]')
            .select('id', 'username', 'email', 'createdAt')
            .withGraphFetched('role')
            .modifyGraph('role', (builder) => {
                builder.select('name');
            })
            .modifyGraph('tasks', (builder) => {
                builder.select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt');
            });
    },
    findAll: async (page: number, limit: number) => {
        const sortColumn = 'createdAt';
        const sortDirection = 'desc';

        const message = 'We are unable to process your request at this time. Please try again in a few minutes.';
        // validate inputs
        if (page && !(page >= 1 && page <= 100)) {
            HttpException.BAD_REQUEST({ message, path: { page: 'You can query maximum 100 records!' } });
        }

        if (limit && limit < 1) {
            HttpException.BAD_REQUEST({ message, path: { size: 'Size must be a positive integer!' } });
        }

        const total = await UserEntity.query().count();

        const directory = await UserEntity.query()
            .select('id', 'username', 'email', 'createdAt', 'updatedAt')
            .withGraphFetched('role')
            .modifyGraph('role', (builder) => {
                builder.select('name');
            })
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy(sortColumn, sortDirection);

        if (directory.length > 0) {
            const remaining = Math.ceil(total[0]['count(*)'] / limit);
            const hasNext = page < remaining;
            const hasPrevious = page > 1;

            return {
                directory,
                pageInfo: {
                    total: total[0]['count(*)'],
                    remaining,
                    hasNext,
                    hasPrevious,
                },
            };
        }

        return null;
    },
};

export const TaskRepository = {
    ...RepositoryUtil(TaskEntity),
    findAll: async (page: number, limit: number) => {
        const sortColumn = 'createdAt';
        const sortDirection = 'desc';

        const message = 'We are unable to process your request at this time. Please try again in a few minutes.';
        // validate inputs
        if (page && !(page >= 1 && page <= 100)) {
            HttpException.BAD_REQUEST({ message, path: { page: 'You can query maximum 100 records!' } });
        }

        if (limit && limit < 1) {
            HttpException.BAD_REQUEST({ message, path: { size: 'Size must be a positive integer!' } });
        }

        const total = await TaskEntity.query().count();

        const directory = await TaskEntity.query()
            .select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt')
            .withGraphFetched('user.[role]')
            .modifyGraph('user', (builder) => {
                builder.select('id', 'email', 'username', 'createdAt');
            })
            .modifyGraph('user.[role]', (builder) => {
                builder.select('name');
            })
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy(sortColumn, sortDirection);

        if (directory.length > 0) {
            const remaining = Math.ceil(total[0]['count(*)'] / limit);
            const hasNext = page < remaining;
            const hasPrevious = page > 1;

            return {
                directory,
                pageInfo: {
                    total: total[0]['count(*)'],
                    remaining,
                    hasNext,
                    hasPrevious,
                },
            };
        }

        return null;
    },

    findById: async (id: string | number) => {
        return TaskEntity.query()
            .findById(id)
            .select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt')
            .withGraphFetched('user.[role]')
            .modifyGraph('user', (builder) => {
                builder.select('id', 'email', 'username', 'createdAt');
            })
            .modifyGraph('user.[role]', (builder) => {
                builder.select('name');
            });
    },

    findUserTasks: async (userId: number) => {
        const data = await TaskEntity.query()
            .select('id', 'title', 'description', 'createdAt', 'updatedAt', 'completedAt')
            .where('userId', userId)
            .withGraphFetched('user.[role]')
            .modifyGraph('user', (builder) => {
                builder.select('id', 'email', 'username', 'createdAt');
            })
            .modifyGraph('user.[role]', (builder) => {
                builder.select('name');
            });
        if (data.length > 0) {
            return {
                directory: data,
                pageInfo: {
                    total: data.length,
                },
            };
        }
        return null;
    },
};

export const RoleRepository = {
    ...RepositoryUtil(RoleEntity),
};
