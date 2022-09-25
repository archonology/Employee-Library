//dependencies
const express = require("express");
const mysql = require("mysql2");
const inquirer = require('inquirer');
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to mySQL database
const db = mysql.createConnection(
  {
    host: "localhost",
    //utilize the .env for password secrecy
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_db database.`)
);

//error catching for middleware
app.use((req, res) => {
  res.status(404).end();
});

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

//inquirer questions -- will need a switch statement for each to do the queries and the CREATES/DELETES. 
function init () {
inquirer
  .prompt([
    {
        type: "list",
        name: "rootList",
        message: "Welcome to the Employee library. What would you like to do today?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          new inquirer.Separator(),
          "add a department",
          "add a role",
          "add an employee",
          new inquirer.Separator(),
          "delete a department",
          "delete a role",
          "delete an employee"
        ],
      },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

//routes -- how do I have the tables returned? (instead of list of objects)
db.query("SELECT * FROM department", function (err, results) {
  console.log(results);
});

db.query("SELECT * FROM role", function (err, results) {
  console.log(results);
});

db.query("SELECT * FROM employees", function (err, results) {
  console.log(results);
});
//see how many employees there are
db.query('SELECT COUNT(employee_id) AS total_count FROM employees GROUP BY last_name', function (err, results) {
    console.log(results);
  });

init ();
//delete route
// db.query(`DELETE FROM employees WHERE id = ?`, 3, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

//listening port for testing
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
