-- see all roles
SELECT role.title AS role, role.salary AS salary, department.name AS department
FROM role
JOIN department ON role.department_id = department.id;

-- see employees
SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Title', d.name AS 'Department', r.salary AS 'Salary' FROM employee as e INNER JOIN role as r ON r.id = e.id INNER JOIN department as d ON d.id = r.department_id