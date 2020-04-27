require('dotenv').config();
const { Client } = require('pg');

const {
  DEV_DB_USERNAME,
  POSTGRES_PASSWORD,
  DEV_DB_NAME,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

const pgClient = new Client({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  user: DEV_DB_USERNAME,
  password: POSTGRES_PASSWORD,
  database: DEV_DB_NAME,
});

try { pgClient.connect(); } catch (err) { console.log(err); }

const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))';
const text = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *';
const values = ['Mona the', 'Octocat', 9, '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States', 'octocat@github.com'];

pgClient.query(table, (err, res) => {
  if (err) throw err;
});

pgClient.query(text, values, (err, res) => {
  if (err) throw err;
});

pgClient.query('SELECT * FROM student', (err, res) => {
  if (err) throw err;
  console.log(err, res.rows); // Print the data in student table
  pgClient.end();
});
