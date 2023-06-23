SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT * FROM roles JOIN departments ON roles.department_id = departments.id;
SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;


SELECT * FROM employees 
JOIN roles ON employees.role_id = roles.id 
JOIN departments ON roles.department_id = departments.id;

SELECT first_name, last_name FROM employees WHERE manager_id IS NULL;