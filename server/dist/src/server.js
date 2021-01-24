"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var objection_1 = require("objection");
var cors_1 = __importDefault(require("cors"));
var Model = require('objection').Model;
var Knex = require('knex');
var app = express_1.default();
var port = 8082;
// Set up BodyParser.
app.use(body_parser_1.default.json());
// Enable All CORS Requests
app.use(cors_1.default());
// Setting up a database for storing data.
var knex = Knex(__assign({ client: 'sqlite3', useNullAsDefault: true, connection: {
        filename: 'tasks.db',
    } }, objection_1.knexSnakeCaseMappers()));
// Give the knex instance to objection.
Model.knex(knex);
app.get('/', function (req, res) {
    res.send('The sedulous hyena ate the antelope!');
});
// Import Routes
require('./services/router')(app);
// Set app to listen on port 3000
app.listen(port, function () {
    console.log("Server is running on port: " + port);
});
//# sourceMappingURL=server.js.map