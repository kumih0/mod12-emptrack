// const express = require('express');
//importing mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');


//server port
const PORT = process.env.PORT || 3000;
// const app = express();

//express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'rootroot',
        database: 'emp_db'
    },
    console.log(`Connected to the emp_db database.`)
);

const mainSelection = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            'View All Employees', 'View All Departments', 'View All Roles', 
            'Add Employee', 'Add Department', 'Add Role',
            'Remove Employee', 'Remove Department', 'Remove Role',
            'Update Employee Role', 'Exit'],
    }
];
const selector = () => {
inquirer.prompt(mainSelection).then((answers) => { 
    switch (answers.options) {
        case 'View All Employees':
            return viewAllEmployees();
        case 'View All Departments':
            return viewAllDepartments();
        case 'View All Roles':
            return viewAllRoles();
        case 'Add Employee':
            return addEmployee();
        case 'Add Department':
            return addDepartment();
        case 'Add Role':
            return addRole();
        case 'Remove Employee':
            return removeEmployee();
        case 'Remove Department':
            return removeDepartment();
        case 'Remove Role':
            return removeRole();
        case 'Update Employee Role':
            return updateEmployeeRole();
        default: 
            return exit();
    }
 });
};
const exit= () => { 
    console.log('Goodbye!') 
    process.exit();
};

//get all departments first
const viewAllDepartments = () => {
    db.query('SELECT name AS Department FROM departments', function (err, results) {
        if (err) throw err;
        console.table(results, ['Department']);
        selector();
    });
};

//add department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?',
        }
    ]).then((answers) => {
        console.log(answers);
        if (answers) {
            db.query(`INSERT INTO departments SET ?`, answers, function (err, results) {
                if (err) throw err;
                console.log(`Added ${answers} to departments`);
                selector();
            });
        }
});
}

//remove dept
const removeDepartment = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        let departments = [];
        console.log(results);
        if (err) throw err;
        departments = results.map((department) => ({value: department.id, name: department.name}));
        console.log(departments);
        inquirer.prompt([{
            type: 'list',
            name: 'id',
            message: 'Which department would you like to remove?',
            choices: departments
        }])
        .then((answers) => {
            console.log(answers);
            db.query('DELETE FROM departments WHERE id = ?', answers.id, function (err, results) {
                if (err) throw err;
                console.log(`Removed ${answers} from departments`);
                selector();
            });
        });
    });
};

selector();

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });