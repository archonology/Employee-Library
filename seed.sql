INSERT INTO department (name)
VALUES ("Development"),
       ("IT"),
       ("Art Department"),
       ("Marketing"),
       ("Management"),
       ("Maintenance"),
       ("Sales Floor");

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 90000, 1),
       ("Technician", 70000, 2),
       ("Lead Artist", 120000, 5),
       ("Public Relations Manager", 130000, 5),
       ("Gardener", 35000, 6),
       ("Sales Rep", 35000, 7),
       ("Social Media Specialist", 45000, 4),
       ("Graphic Designer", 50000, 3);

INSERT INTO employee (employee_id, first_name, last_name, role_id)
VALUES (001, "Anika", "Kelijk", 1),
       (002, "Mia", "Collins", 2),
       (003, "Hannah", "Gestalt", 5),
       (004, "Gordon", "Speakswell", 4),
       (005, "Caleb", "Greenthumb", 5),
       (006, "Sheena", "Countill", 6),
       (007, "Billy", "Insta", 7),
       (008, "Gillian", "Vector", 8);

UPDATE employee SET manager_id = 004 WHERE last_name = 'Insta';

UPDATE employee SET manager_id = 004 WHERE last_name = 'Countill';

UPDATE employee SET manager_id = 004 WHERE last_name = 'Greenthumb';

UPDATE employee SET manager_id = 001 WHERE last_name = 'Collins';

UPDATE employee SET manager_id = 003 WHERE last_name = 'Vector';