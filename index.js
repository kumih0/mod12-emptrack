//inquirer bullshit in here then export to server or w/e
import inquirer from "inquirer";
const express = require('express');
const questions = [
    {
        type: 'input',
        name: 'name',

    }
];
inquirer.prompt(questions).then((answers) => { console.log(answers) });

