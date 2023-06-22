const express = require('express');
//importing mysql2
const mysql = require('mysql2');
//server port
const PORT = process.env.PORT || 3000;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

