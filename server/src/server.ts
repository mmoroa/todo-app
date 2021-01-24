import express from 'express';
import bodyParser from 'body-parser';
import { knexSnakeCaseMappers } from 'objection';
import cors from 'cors';

const { Model } = require('objection');
const Knex = require('knex');

const app = express();
const port = 8082;

// Set up BodyParser.
app.use(bodyParser.json());

// Enable All CORS Requests
app.use(cors());

// Setting up a database for storing data.
const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'tasks.db',
    },
    ...knexSnakeCaseMappers(),
});

// Give the knex instance to objection.
Model.knex(knex);

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

// Import Routes
require('./services/router')(app);

// Set app to listen on port 3000
app.listen(port, function () {
    console.log(`Server is running on port: ${port}`);
});
