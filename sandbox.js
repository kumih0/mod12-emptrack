//for fucking about
const getRoles = () => {
    const roles = db.query('SELECT id, title FROM roles', function (err, results) {
        if (err) throw err;
        results.map((role) => ({ value: role.id, name: role.title }));
    })
    return [
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
            choices: roles,
        },
    ]
};


const getManagers = () => {
    const managerList = db.query('SELECT id, first_name, last_name FROM employees WHERE manager_id IS NULL', function (err, results) {
        if (err) throw err;
        results.map((employee) => ({ value: employee.id, name: employee.first_name + ' ' + employee.last_name }));
    })
    return [
        {
            type: 'list',
            name: 'manager_name',
            message: 'Who is the manager of the employee?',
            choices: managerList,
        }
    ]
}

const addEmployee = async () => {
    const { first_name, last_name, role_id } = await inquirer.prompt(getRoles());
    const { manager_id } = await inquirer.prompt(getManagers());

    if (first_name && last_name && role_id && manager_id) {
        db.query(`INSERT INTO employees SET ?`, { first_name, last_name, role_id, manager_id }, function (err, results) {
            console.log(results);
            if (err) throw err;
            console.log(`Added ${first_name} ${last_name} to employees`);
            selector();
        });
    } else {
        console.log('Please enter all information');
        selector();
    }
};