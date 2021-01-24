import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('task', function(table) {
        table.bigIncrements('id').primary();
        table.bigInteger('user_id').unsigned().notNullable();
        table.string('title').notNullable();
        table.string('description').nullable();
        table.timestamp('completed_at').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at').nullable();
        table.foreign('user_id').references('user.id')

    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('task');
}

