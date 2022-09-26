-- create database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- use database
USE employee_db;

-- create tables
CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(department_id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
   FOREIGN KEY (role_id)
  REFERENCES role(role_id)
  ON DELETE SET NULL,
  manager_id INT
);

-- alters the table to include manager key
ALTER TABLE employees
   ADD CONSTRAINT sr_fk_emp_man 
   FOREIGN KEY (manager_id)
   REFERENCES employee(employee_id)
;
