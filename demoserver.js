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

//view a table
app.get()