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
VALUES ('John', 'Doe', 2, 2),
       ('Ben', 'Dover', 1, NULL),
       ('Hugh', 'Jazz', 2, 2),
       ('Jenna', 'Taylia', 3, 2),
       ('Mike', 'Hunt', 4, 10),
       ('Jack', 'Mehoff', 5, 10),
       ('Mike', 'Hawk', 7, 12),
       ('Harry', 'Wiener', 8, 12),
       ('Anita', 'Knapp', 3, 2),
       ('Ty', 'Needich', 1, NULL),
       ('Anna', 'Borshin', 6, 12),
       ('Seymour', 'Butts', 1, NULL),
       ('Omai', 'Lourd', 2, 10),
       ('Dee', 'Rayjne', 3, 10);