
const addEmployee = async () => {
    const roles = await db.query('SELECT id, title FROM roles');
    const managerList = await db.query('SELECT id, first_name, last_name FROM employees WHERE manager_id IS NULL');

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
            choices: roles.map((role) => ({ value: role.id, name: role.title })),
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager of the employee?',
            choices: managerList.map((employee) => ({ value: employee.id, name: employee.first_name + ' ' + employee.last_name })),
        }
    ]);
    if (newEmployee) {
        db.query(`INSERT INTO employees SET ?`, newEmployee, function (err, results) {
            console.log(results);
            if (err) throw err;
            console.log(`Added ${newEmployee} to employees`);
            selector();
        });
    } else {
        console.log('Please enter all information');
        selector();
    }
};