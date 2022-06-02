const PgPromise = require("pg-promise")
const express = require('express');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const API = require('./api');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);
// const db = pgp({connectionString: DATABASE_URL, 
// 			max:30,
// 		ssl: {rejectUnauthorized : false}
// });

const PORT = process.env.PORT || 3000;

API(app, db);

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});