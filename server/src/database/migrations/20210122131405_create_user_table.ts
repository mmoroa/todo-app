import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('user', function(table) {
        table.bigIncrements('id').primary()
        table.string('email').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.integer('role_id').unsigned().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at').nullable();
        table.timestamp('blocked_at').nullable();
        table.foreign('role_id').references('role.id')

    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('user');
}

