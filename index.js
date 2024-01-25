//packages needed for this application
const inquirer = require('inquirer');

// Import and require mysql2
const mysql = require('mysql2');

const consoleTable = require('console.table')

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Porsche@00@',
        database: 'company_db'
    },
    console.log(`Connected to the Company database.`)
);

function viewAllEmployees() {
    db.query("SELECT e.id AS 'Emp. ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Title', d.name AS 'Department', r.salary AS 'Salary', GROUP_CONCAT(m.first_name, ' ', m.last_name) AS 'Manager Name' FROM employee as e INNER JOIN role as r ON r.id = e.role_id INNER JOIN department as d ON d.id = r.department_id INNER JOIN employee as m ON e.manager_id = m.id GROUP BY e.id", function (err, results) {
        console.table(results)
        CLI()
    })
};
function getRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results)
        CLI()
    })
};

function addEmployee() {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter employee first name',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter employee last name',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is their role?',
                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            {
                type: 'input',
                name: 'manager',
                message: "Manager's Employee #"
            }
        ])
        .then((data) => {
            console.log(data)
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${data.role}, ${data.manager});`)
            console.log('Employee added!');
            CLI()
        });
};

function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'target',
            message: 'What employee do you want to update',
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter new role id',
        },

    ])
    .then((data) => {
        console.log(data)
        db.query(`UPDATE employee SET role_id = "${data.newRole}" WHERE id = ${data.target};`)
        console.log('Role added!');
        CLI()
    });
 };

function viewAllRoles() {
    db.query('SELECT role.title AS role, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
        console.table(results)
        CLI()
    })
};

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter new title',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter position salary',
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role fall under?',
                choices: [1, 2, 3, 4]
            }
        ])
        .then((data) => {
            console.log(data)
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", "${data.salary}", ${data.department});`)
            console.log('Role added!');
            CLI()
        });
};

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results)
        CLI()
    })
};

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of this department?',
            },
        ])
        .then((data) => {
            console.log(data)
            db.query(`INSERT INTO department (name) VALUES ("${data.department}");`)
            console.log('Department added!');
            CLI()
        });
};




function handleAction(data) {
    console.log(data.action)
    const actionCommand = (data.action)
    switch (actionCommand) {
        case 'View All Employees':
            return viewAllEmployees();
            break;
        case 'Add Employee':
            return addEmployee();
            break;
        case 'Update Employee Role':
            return updateEmployeeRole();
            break;
        case 'View All Roles':
            return viewAllRoles();
            break;
        case 'Add Role':
            return addRole();
            break;
        case 'View All Departments':
            return viewAllDepartments();
            break;
        case 'Add Department':
            return addDepartment();
            break;
    };
}
    //array of questions for user input
    function CLI() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What would you like to do?',
                    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
                },
            ])

            .then((data) => {
                handleAction(data)
            });
    };

    CLI();
