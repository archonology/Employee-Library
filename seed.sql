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

INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Anika", "Kelijk", 1, NULL),
       (2, "Mia", "Collins", 2, 1),
       (3, "Hannah", "Gestalt", 5, NULL),
       (4, "Gordon", "Speakswell", 4, NULL),
       (5, "Caleb", "Greenthumb", 5, 3),
       (6, "Sheena", "Countill", 6, 4),
       (7, "Billy", "Insta", 7, 1),
       (8, "Gillian", "Vector", 8, 3);
