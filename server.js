const express = require('express');
//importing mysql2
const mysql = require('mysql2');
//server port
const PORT = process.env.PORT || 3000;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'emp_db'
    },
    console.log(`Connected to the emp_db database.`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});