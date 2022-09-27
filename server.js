//dependencies
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
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

//initializing function

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userSelect",
        message: "This is the employee library. What would you like to do?",
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
          "delete an employee",
          new inquirer.Separator(),
          "I'm finished at the library",
          new inquirer.Separator(),
        ],
      },
    ])
    .then((answers) => {

      let rootQ = answers.userSelect;
      switch (rootQ) {
        //viewing records
        case (rootQ = "view all departments"):
          viewAllDepartments();
          break;

        case (rootQ = "view all roles"):
          viewAllRoles();
          break;

        case (rootQ = "view all employees"):
          viewAllEmployees();
          break;

        //adding records
        case (rootQ = "add a department"):
          addDepartment();
          break;

        case (rootQ = "add a role"):
          addRole();
          break;

        case (rootQ = "add an employee"):
          addEmployee();
          break;

        //deleting records
        case (rootQ = "delete a department"):
          deleteDepartment();
          break;

        case (rootQ = "delete a role"):
          deleteRole();
          break;

        case (rootQ = "delete an employee"):
          deleteEmployee();
          break;

        //closing case
        case (rootQ = "I'm finished at the library"):
          leaveLibrary();
          break;
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
      } else {
      }
    });
}

//VIEW Functions
function viewAllDepartments() {
  db.query(`SELECT * FROM department`, function (err, results) {
    console.log("\n");
    console.table("All Departments", results);
    console.log("\n");
    init();
  });
}

function viewAllRoles() {
  db.query(`SELECT * FROM role`, function (err, results) {
    console.log("\n");
    console.table("Employee Roles", results);
    console.log("\n");
    init();
  });
}

function viewAllEmployees() {
  db.query(`SELECT * FROM employees`, function (err, results) {
    console.log("\n");
    console.table("Employee List", results);
    console.log("\n");
    init();
  });
}

//ADD functions
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department are you adding?",
        name: "newDept",
      },
    ])
    .then((answer) => {

      db.query(
        `INSERT INTO department (name) VALUES ('${answer.newDept}')`,
        (err, data) =>
          err
            ? err
            : console.log(
                "\n Sorry, there ware a problem with your request. \n"
              )
      );
      console.log("\n New department added successfully. \n");
      init();
    });
}

function addRole() {
    //so user can see the departments/ids
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log("\n");
        console.table("Track department ID for New Role", results);
        console.log("\n");
      });

  inquirer
    .prompt([
      {
        type: "input",
        message: "What role are you adding?",
        name: "newRole",
      },
      {
        type: "number",
        message: "What is the salary for the new role?",
        name: "salary",
      },
      {
        type: "number",
        message: "What is the deptarment id you are adding to?",
        name: "dept",
      },
    ])
    .then((answer) => {

      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${answer.newRole}', ${answer.salary}, '${answer.dept}')`,
        (err, data) =>
          err
            ? err
            : console.log("\n New role added successfully. \n")
      );
      init();
    });
}

function addEmployee() {
    //view roles for reference
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log("\n");
        console.table("Track Role ID for new Employee", results);
        console.log("\n");
      });
      //view managers for reference
      db.query(`SELECT * FROM employees WHERE manager_id IS NULL`, function (err, results) {
        console.log("\n");
        console.table("Manager List", results);
        console.log("\n");
      });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is their last name?",
        name: "lastName",
      },
      {
        type: "number",
        message: "What is their role id?",
        //how to create an index of the current departments?
        name: "roleId",
      },
      {
        type: "number",
        message: "What is their manager's id?",
        //how to create an index of the managers?
        name: "managerId",
      },
    ])
    .then((answer) => {

      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managerId}')`,
        (err, data) =>
          err
            ? err
            : console.log("\n New employee added successfully. \n")
      );
      init();
    });
}
//delete functions
function deleteDepartment() {
  db.query();
}

function deleteRole() {
  db.query();
}

function deleteEmployee() {
  db.query();
}

//leave library
function leaveLibrary() {
  console.log(
    "\n \n Thanks for visiting the Employee Library! Run `npm start` to visit again. \n \n"
  );
  process.exit();
}

init();

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

//testing data returned
// let getRoleTitle = function () {
//   db.query(`SELECT title FROM role`, (err, data) => {
//     err
//       ? err
//       : console.log(data);
//   });

// };
// getRoleTitle ();
//inquirer questions -- will need a switch statement for each to do the queries and the CREATES/DELETES.

//delete route
// db.query(`DELETE FROM employees WHERE id = ?`, 3, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });