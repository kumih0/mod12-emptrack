INSERT INTO departments (name) 
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, department_id) 
VALUES ('Manager', 100000.00, 1),
       ('Sales Lead', 75000.00, 1),
       ('Salesperson', 50000.00, 1),
       ('Software Engineer', 100000.00, 2),
       ('Lead Engineer', 150000.00, 2),
       ('Accountant', 75000.00, 3),
       ('Legal Team Lead', 250000.00, 4),
       ('Lawyer', 190000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, NULL),
       ('Ben', 'Dover', 1, NULL),
       ('Hugh', 'Jazz', 2, 2),
       ('Jenna', 'Taylia', 3, 2),
       ('Mike', 'Hunt', 4, 1),
       ('Jack', 'Mehoff', 5, 1),
       ('Mike', 'Hawk', 7, 2),
       ('Harry', 'Wiener', 8, 2),
       ('Anita', 'Knapp', 3, 2),
       ('Ty', 'Needich', 6, 1),
       ('Anna', 'Borshin', 6, 1),
       ('Seymour', 'Butts', 1, NULL),
       ('Omai', 'Lourd', 2, 12),
       ('Dee', 'Rayjne', 3, 12);