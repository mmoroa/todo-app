import { knexSnakeCaseMappers } from "objection";


module.exports = {
    // development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'tasks.db'
    },
    ...knexSnakeCaseMappers(),
    migrations: {
        tableName: "migrations",
        directory:  "./src/database/migrations",
        extension: "ts",
    },
    seeds: {
        directory:  "./src/database/seeds",
        extension: "ts",
    },
}