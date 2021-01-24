import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("role").del();

    // Inserts seed entries
    await knex("role").insert([
        { id: 1, name: "Administrator", description: 'a person who is responsible for the upkeep, configuration, and reliable operation of the system' },
        { id: 2, name: "Customer", description: 'Platform user' },
    ]);
};
