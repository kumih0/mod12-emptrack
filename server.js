//importing mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

//server port
const PORT = process.env.PORT || 3000;

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

const mainMenu = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            'View All Departments', 'View All Roles', 'View All Employees',
            'Add Department', 'Add Role', 'Add Employee',
            'Remove Department', 'Remove Role', 'Remove Employee',
            'Update Employee', 'Exit'],
    }
];

const selector = () => {
    inquirer.prompt(mainMenu).then((answers) => {
        switch (answers.options) {
            case 'View All Departments':
                return viewAllDepartments();
            case 'View All Roles':
                return viewAllRoles();
            case 'View All Employees':
                return viewAllEmployees();
            case 'Add Department':
                return addDepartment();
            case 'Add Role':
                return addRole();
            case 'Remove Employee':
                return removeEmployee();
            case 'Add Employee':
                return addEmployee();
            case 'Remove Department':
                return removeDepartment();
            case 'Remove Role':
                return removeRole();
            case 'Remove Employee':
                return removeEmployee();
            case 'Update Employee':
                return updateEmployee();
            default:
                return exit();
        }
    });
};
const exit = () => {
    console.log('ok see ya!')
    process.exit();
};

//view all departments first
const viewAllDepartments = () => {
    db.query('SELECT name AS Department FROM departments', function (err, results) {
        if (err) throw err;
        console.table(results, ['Department']);
        selector();
    });
};

//view all roles
const viewAllRoles = () => {
    db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
        if (err) throw err;
        console.table(results, ['title', 'salary', 'name']);
        selector();
    });
};

//view all employees
const viewAllEmployees = () => {
    db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', (err, results) => {
        if (err) throw err;
        console.table(results, ['first_name', 'last_name', 'title', 'salary', 'name', 'manager_id']);
        selector();
    });
};


//add department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        }
    ])
        .then((answers) => {
            if (answers) {
                db.query(`INSERT INTO departments SET ?`, answers, function (err, results) {
                    if (err) throw err;
                    console.log(`Added ${answers.name} to departments`);
                    selector();
                });
            };
        });
};

//add role
const addRole = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        let departments = [];
        if (err) throw err;
        departments = results.map((department) => ({ value: department.id, name: department.name }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What is the name of the department this role belongs to?',
                choices: departments,
            }
        ])
            .then((answers) => {
                if (answers) {
                    db.query(`INSERT INTO roles SET ?`, answers, function (err, results) {
                        if (err) throw err;
                        console.log(`Added ${answers.title} to roles`);
                        selector();
                    });
                };
            });
    });
};
//helper functions since they are reused in multiple functions
const getRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, title FROM roles', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};
const getManagers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employees WHERE manager_id IS NULL', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};
const getEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employees', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

//add employee
const addEmployee = async () => {
    
    const roles = await getRoles();
    const managers = await getManagers();
    const rolesList = roles.map((role) => ({ value: role.id, name: role.title }));
    const managerList = managers.map((employee) => ({ value: employee.id, name: employee.first_name + ' ' + employee.last_name }));
    const newEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the role of the employee?',
            choices: rolesList,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager of the employee?',
            choices: managerList,
        }
    ]);
    if (newEmployee.first_name === '' || newEmployee.last_name === '') {
        console.log('Please enter all information');
        selector();
    } else {
        db.query(`INSERT INTO employees SET ?`, newEmployee, function (err, results) {
            if (err) throw err;
            console.log(`Added ${newEmployee.first_name} ${newEmployee.last_name} to employees`);
            selector();
        });
    }
};

//remove dept
const removeDepartment = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        let departments = [];
        if (err) throw err;
        departments = results.map((department) => ({ value: department.id, name: department.name }));
        inquirer.prompt([{
            type: 'list',
            name: 'id',
            message: 'Which department would you like to remove?',
            choices: departments
        }])
            .then((answers) => {
                //i want the console to print out the name of the department that was removed but when using ${department[answers.id-1].name} it returns undefined
                //i think it's because despite saving the answers.id-1 as a variable 
                const selected = departments.filter((department) => department.id === answers.id);
                console.log(selected);
                db.query('DELETE FROM departments WHERE id = ?', answers.id, function (err, results) {
                    if (err) throw err;
                    console.log(`Removed department ${selected[0].name} successfully`);
                    selector();
                });
            });
    });
};

//remove role
const removeRole = async () => {
    const roles = await getRoles();
    const rolesList = roles.map((role) => ({ value: role.id, name: role.title }));
    const selectedRole = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Which role would you like to remove?',
        choices: rolesList
    }])
    const selected = roles.filter((role) => role.id === selectedRole.id);
    const confirmRemove = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to remove ${selected[0].title}?`
    }])
    if (confirmRemove.confirm) {
        db.query('DELETE FROM roles WHERE id = ?', selectedRole.id);
        console.log(`Removed ${selected[0].title} from roles`);
    } else {
        console.log('Cancelled');
    }
    selector();
}

//remove employee
const removeEmployee = async () => {
    const employees = await getEmployees();
    const employeesList = employees.map((employee) => ({ value: employee.id, name: employee.first_name + ' ' + employee.last_name }));
 
    const selectedEmployee = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Which employee would you like to remove?',
        choices: employeesList
    }])
    const selected = employees.filter((employee) => employee.id === selectedEmployee.id);

    const confirmRemove = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to remove ${selected[0].first_name} ${selected[0].last_name}?`
    }])
    if (confirmRemove.confirm) {
        db.query('DELETE FROM employees WHERE id = ?', selectedEmployee.id);
        console.log(`Removed ${selected[0].first_name} ${selected[0].last_name} from employees`);
    } else {
        console.log('Cancelled');
    }
    selector();
}

//update employee
const updateEmployee = async () => {
    //althought this is a bit redundant, it's the only way I could get the prompt to work
    //i think that since the answer data isn't known, it's having trouble traversing the array of objects
    const employees = await getEmployees();
    const employeesList = employees.map((employee) => ({ value: employee.id, name: employee.first_name + ' ' + employee.last_name }));
    const roles =  await getRoles();
    const rolesList = roles.map((role) => ({ value: role.id, name: role.title }));
    const managers = await getManagers();
    const managerList = managers.map((employee) => ({ value: employee.id, name: employee.first_name + ' ' + employee.last_name }));

    const selectedEmployee = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Which employee would you like to update?',
        choices: employeesList
    }])

    const who = employees.filter((employee) => employee.id === selectedEmployee.id);
    console.log(who);

    const whatUpdate = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'What would you like to update?',
        choices: ['Role', 'Manager', 'Both']
    }])


    if (whatUpdate.id === 'Role' || whatUpdate.id === 'Both') {
        const updateRole = await inquirer.prompt([{
            type: 'list',
            name: 'id',
            message: 'Which role would you like to update?',
            choices: rolesList
        }])

        const wtfRole = roles.filter((role) => role.id === updateRole.id);
        
        if (updateRole.id === who[0].role_id) {
            console.log('Employee already has this role');
            selector();
        } else {
            const confirmUpdateRole = await inquirer.prompt([{
                type: 'confirm',
                name: 'confirm',
                message: `Are you sure you want to update ${who[0].first_name} ${who[0].last_name}'s role to ${wtfRole[0].title}?`
            }])

            if (confirmUpdateRole.confirm) { //pls no boolie this is so redundant and i hate it
                db.query('UPDATE employees SET role_id = ? WHERE id = ?', [updateRole.id, selectedEmployee.id]);
                console.log(`Updated ${who[0].first_name} ${who[0].last_name}'s role to ${wtfRole[0].title}`);
            } else {
                console.log('Cancelled');
            }
        }
    } else if (whatUpdate.id === 'Manager' || whatUpdate.id === 'Both') {
        const updateManager = await inquirer.prompt([{
            type: 'list',
            name: 'id',
            message: 'Which manager would you like to update?',
            choices: managerList
        }])

        const wutManager = managers.filter((employee) => employee.id === updateManager.id);

        const confirmUpdateManager = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: `Are you sure you want to update ${who[0].first_name} ${who[0].last_name}'s manager to ${wutManager[0].first_name} ${wutManager[0].last_name}?`
        }])

        if (confirmUpdateManager.confirm) {
            db.query('UPDATE employees SET manager_id = ? WHERE id = ?', [updateManager.id, selectedEmployee.id]);
            console.log(`Updated ${who[0].first_name} ${who[0].last_name}'s manager to ${wutManager[0].first_name} ${wutManager[0].last_name}`);
        } else {
            console.log('Cancelled');
        }
    }
    selector();
}

selector();