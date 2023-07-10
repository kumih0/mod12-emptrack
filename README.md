# mod12-emptrack
Module 12 Challenge Employee Tracker SQL

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




