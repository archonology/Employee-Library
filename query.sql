-- select queries
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;
--subsets
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE manager_id IS NOT NULL;

-- update queries
UPDATE employees SET role_id (?) WHERE employee_id = ?;
UPDATE employees SET manager_id (?) WHERE employee_id  = ?;

-- delete queries
DELETE FROM department WHERE department_id = ?
DELETE FROM role WHERE role_id = ?
DELETE FROM employees WHERE employee_id = ?