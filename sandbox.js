//for fucking about

const employeeQs = [
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
];

const empManagerQ = [
    {
        type: 'list',
        name: 'manager_id',
        message: 'Who is the manager of the employee?',
        choices: managerList,
    }
];

const addEmployee = () => {
    db.query('SELECT id, title FROM roles', function (err, results) {
        console.log(results);
        let roles = [];
        if (err) throw err;
        roles = results.map((role) => (
            {
                value: role.id,
                name: role.title,
            })
        );
        console.log(roles);
        inquirer.prompt([
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
        ])
            .then((answers) => {
                console.log(answers);
                const { first_name, last_name, role_id } = answers;
                // if (answers) { //if answers are true
                //     db.query('INSERT INTO employees SET ?', answers, function (err, results) { if (err) throw err; console.log(`Added ${answers} to employees`);});
                db.query('SELECT id, first_name, last_name FROM employees WHERE manager_id IS NULL', function (err, results) {
                    console.log(results);
                    let managerList = [];
                    if (err) throw err;
                    managerList = results.map((employee) => (
                        {
                            value: employee.id,
                            name: employee.first_name + ' ' + employee.last_name,
                        })
                    );
                    console.log(managerList);
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: 'Who is the manager of the employee?',
                            choices: managerList,
                        }
                    ])
                        .then((answers) => {
                            console.log(answers);
                            if (answers) {
                                db.query(`INSERT INTO employees SET ?`, answers, function (err, results) {
                                    console.log(results);
                                    if (err) throw err;
                                    console.log(`Added ${answers} to employees`);
                                    selector();
                                });
                            };
                        });
                });
   
            });
    });
};