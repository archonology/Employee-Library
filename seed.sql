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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anika", "Kelijk", 1, 4),
       ("Mia", "Collins", 2, 4),
       ("Hannah", "Gestalt", 3, 4),
       ("Gordon", "Speakswell", 4, 4),
       ("Caleb", "Greenthumb", 5, 3),
       ("Sheena", "Countill", 6, 3),
       ("Billy", "Insta", 7, 3),
       ("Gillian", "Vector", 8, 3);