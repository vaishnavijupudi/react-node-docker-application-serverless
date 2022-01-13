const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: "34.68.36.102",
  user: "root",
  password: "1234",
  database: "a2prob1",
});

connection.connect((err) => {
  if (!err) {
    console.log("Database is connected ...");
  } else {
    console.log("Error connecting database ...");
  }
});

app.listen(3001, () => {
  console.log("running")
});
module.exports = connection;