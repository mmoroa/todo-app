import { HttpException } from './http_util';

export const RepositoryUtil = (model: any) => {
    return {
        /*
      |--------------------------------------------------------------------------
      | COUNT NUMBER OF RESOURCE
      |--------------------------------------------------------------------------
      | Performs a count on the specified column or array of columns
      |
      */
        count: async () => {
            return model.query().count();
        },
        /*
    |--------------------------------------------------------------------------
    | CREATE RESOURCE
    |--------------------------------------------------------------------------
    | create a new resource
    |
    */
        create: async (values: object) => {
            return model.query().insert(values);
        },
        /*
    |--------------------------------------------------------------------------
    | GET RESOURCE DETAILS
    |--------------------------------------------------------------------------
    | lookup resource
    |
    */
        findById: async (id: string | number) => {
            return model.query().findById(id);
        },
        findOneBy: async (condition: string, value: string | number) => {
            return model.query().where(condition, value);
        },
        /*
    |--------------------------------------------------------------------------
    | UPDATE resources
    |--------------------------------------------------------------------------
    | modify resources details
    |
    */
        update: async (id: string | number, values: object) => {
            return model
                .query()
                .findById(id)
                .patch({ ...values });
        },
        /*
    |--------------------------------------------------------------------------
    | DELETE RESOURCE
    |--------------------------------------------------------------------------
    | remove resource
    |
    */
        delete: async (id: any) => {
            return model.query().deleteById(id);
        },
        /*
    |--------------------------------------------------------------------------
    | LIST ALL RESOURCE
    |--------------------------------------------------------------------------
    | list a collection of resource
    |
    */
        // findAll: async (page: number = 1, limit: number = 20, sort: { column: string , direction: string} | undefined ) => {
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

            const total = await model.query().count();

            const directory = await model
                .query()
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
};
