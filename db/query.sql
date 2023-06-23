SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT * FROM roles JOIN departments ON roles.department_id = departments.name;
SELECT * FROM employees JOIN roles ON employees.role_id = roles.title;

SELECT 