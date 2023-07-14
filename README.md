# mod12-emptrack
Module 12 Challenge Employee Tracker SQL

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, 
view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, 
first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Description

    - Created database in SQL and schema to describe how each data table is configured and their relationship to other tables via foreign keys
    - Created seed data in sql file to populate database following columns laid out in schema
    - Inside server file, broke down main menu selection as main prompt, then series of switch cases to call diff functions
    - After making switch case/menu list, created the repsective functions with inuquirer to prompt any follow up questions or validations for user input
    - After returning back to the work from learning more on back end, challenged myself to convert add/remove/update functions as async/await to improve readability and organize to match my thought process
> *Worked within a sandbox file (since removed) to maintain old code and break apart each piece of the function and test it to see where things can be moved or where it was breaking.
> * referenced following code for better understanding of async/await in sql:
> * [Async/Await in SQL gist](https://gist.github.com/midnightcodr/bd8f9cd4414f5571774c141d1e0865d8)

## Installation

To install dependencies, run the following:

```
npm i
```

Then use mysql shell to run schema and seed files to populate database

```sql
source db/schema.sql
source db/seeds.sql
```

And finally, run the following command to start the application

```
node server.js
```

## Video Demo Link

https://drive.google.com/file/d/1fJMWS2pELD3fBOKYPtBS6QLSTE5Q4nUB/view 

## Github Link

GitHub: https://github.com/kumih0/mod12-emptrack

### pseudo code for da homies
i'm an idiot

-schema layout tables n their cols/rows blahblah
    -employee table big boi
        -fistname, lastname, role id, manager
        -role table connect role id
            id from role id (super/sub class? prob only cuz i understand the other one), title, $alary, dept id
            -dept-table link thru dept-id
                -name department name

-seed everyone is using chatgpt ._.

server.js
-import npm packge inquirer, mysql
-set server, port
-connect to db sql
-inquirer, run prompt> list=main menu selection
    -view all: dept, role, emp
        -show table
    -add: dept, role, emp
        -dept name 
        -role name, $al, dept name  
        -emp fname lname, role name, manager
    -remove: dept, emp
    -update: emp role
        -select empname list
        -select role list