import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
        { id: 1, username: "adminstrator", email: "admin@test.com", password:"$2y$12$e05t6F096a19cYWpCHQt5O/GFJ/OXHflxjClSR1BelGYfwUQH4nqy", "roleId": 1},
        { id: 2, username: "customer", email: "customer@test.com", password:"$2y$12$e05t6F096a19cYWpCHQt5O/GFJ/OXHflxjClSR1BelGYfwUQH4nqy", "roleId": 2},
    ]);
};
