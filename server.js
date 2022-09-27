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
          "view all managers",
          "view employees by department",
          new inquirer.Separator(),
          "add a department",
          "add a role",
          "add an employee",
          new inquirer.Separator(),
          "update an employee role",
          "update an employee manager",
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

        case (rootQ = "view all managers"):
            viewAllManagers();
            break;

            // case (rootQ = "view employees by department"):
            // viewAllEmpByDept();
            // break;

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

        //update an employee role
        case (rootQ = "update an employee role"):
          updateEmpRole();
          break;
          case (rootQ = "update an employee manager"):
          updateEmpManager();
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

function viewAllManagers() {
    db.query(`SELECT * FROM employees WHERE manager_id IS NULL`, function (err, results) {
        console.log("\n");
        console.table("All Managers", results);
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
            : console.log(err)
      );
      console.log("\n New department added successfully. \n");
      init();
    });
}

function addRole() {
    //so user can see the departments/ids
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log("\n");
        console.table("Available Departments for New Role", results);
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
            : console.log(err)
      );
      console.log("\n New role added successfully. \n")
      init();
    });
}

function addEmployee() {
    //view roles for reference
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log("\n");
        console.table("Available Roles for the New Employee", results);
      });
      //view managers for reference
      db.query(`SELECT * FROM employees WHERE manager_id IS NULL`, function (err, results) {
        console.log("\n");
        console.table("Available Managers for the New Employee", results);
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
        message: "What is their role_id?",
        name: "roleId",
      },
      {
        type: "number",
        message: "What is their manager's employee_id?",
        name: "managerId",
      },
    ])
    .then((answer) => {

      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managerId}')`,
        (err, data) =>
          err
            ? err
            : console.log(err)
      );
      console.log("\n New employee added successfully. \n")
      init();
    });
}

//update function
function updateEmpRole() {
    //view roles for reference
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log("\n");
        console.table("Available Roles for the New Employee", results);
      });
      //view employees for reference
      db.query(`SELECT * FROM employees`, function (err, results) {
        console.log("\n");
        console.table("All Employees", results);
      });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "number",
        message: "What is their new role id?",
        name: "roleId",
      },
    ])
    .then((answer) => {

      db.query(
        `UPDATE employees SET role_id = (?) WHERE last_name = '${answer.lastName}'`, answer.roleId,
        (err, data) =>
          err
            ? err
            : console.log(err)
      );
      console.log("\n Employee role updated successfully. \n")
      init();
    });
}

function updateEmpManager() {
   //view managers for reference
   db.query(`SELECT * FROM employees WHERE manager_id IS NULL`, function (err, results) {
    console.log("\n");
    console.table("All Managers", results);
  });
      //view employees (minus the managers) for reference
      db.query(`SELECT * FROM employees WHERE manager_id IS NOT NULL`, function (err, results) {
        console.log("\n");
        console.table("All Employees", results);
      });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "number",
        message: "What is their new manager's employee_id?",
        name: "managerId",
      },
    ])
    .then((answer) => {

      db.query(
        `UPDATE employees SET manager_id = (?) WHERE last_name = '${answer.lastName}'`, answer.managerId,
        (err, data) =>
          err
            ? err
            : console.log(err)
      );
      console.log("\n Employee manager updated successfully. \n")
      init();
    });
}

//delete functions
function deleteDepartment() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log("\n");
        console.table("All Departments", results);
      });
    inquirer
    .prompt([
      {
        type: "number",
        message: "What department are you deleting? Please type the id number.",
        name: "Dept",
      },
    ])
    .then((answer) => {
        db.query(`DELETE FROM department WHERE department_id = ?`, answer.Dept, 
        (err, data) =>
          err
            ? err
            : console.log(err)
            );
            console.log("\n Department deleted successfully. \n")
            init();
          });
      }


function deleteRole() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log("\n");
        console.table("All Roles", results);
      });
    inquirer
    .prompt([
      {
        type: "number",
        message: "What role are you deleting? Please type the id number.",
        name: "roleId",
      },
    ])
    .then((answer) => {
        db.query(`DELETE FROM role WHERE role_id = ?`, answer.roleId, 
        (err, data) =>
          err
            ? err
            : console.log(err)
            );
            console.log("\n Role deleted successfully. \n")
            init();
          });
}

function deleteEmployee() {
    db.query(`SELECT * FROM employees`, function (err, results) {
        console.log("\n");
        console.table("All Employees", results);
      });
    inquirer
    .prompt([
      {
        type: "number",
        message: "What employee are you removing? Please type the id number.",
        name: "empId",
      },
    ])
    .then((answer) => {
        db.query(`DELETE FROM role WHERE employee_id = ?`, answer.empId, 
        (err, data) =>
          err
            ? err
            : console.log(err)
            );
            console.log("\n Employee records deleted successfully. \n")
            init();
          });
}

//leave library
function leaveLibrary() {
  console.log(
    "\n \n Thanks for visiting the Employee Library! Run `npm start` to visit again. \n \n"
  );
  process.exit();
}

init();


