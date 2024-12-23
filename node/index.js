const express = require('express');
const mysql = require('mysql');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'me',
  password: 'secret',
  database: 'my_db',
  port: 3306
});

connection.connect();

connection.query('CREATE TABLE IF NOT EXISTS people (`name` VARCHAR(100) NOT NULL)', 
  function (error, results, fields) {
    if (error) throw error;
  }
);

app.get('/', (req, res) => {
  const person = { name: faker.person.fullName() };
  connection.query('INSERT INTO people SET ?', person, function (error, results, fields) {
    if (error) throw error;
  });

  connection.query('SELECT name FROM people', function (error, results, fields) {
    if (error) throw error;
    const peopleList = results.map(element => `<li>${element.name}</li>`).join('');
    const title = '<h1>Full Cycle Rocks!</h1>';
    res.send(`${title}<ol>${peopleList}</ol>`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});