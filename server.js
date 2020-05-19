// My Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const utils = require('util');
const figlet = require("figlet");
const clear = require("clear");
const chalk = require("chalk");

// Databse connection

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zxcv1234',
    database: 'wayneEnterprise_DB',
});

// code snippet taken from Wk 12 activity 10:

// Wrap connection.connect() in a promise!
async function connect() {
    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) reject(err); 
            else resolve(); 
        })
    })
}

// Wrap connection.query() in a promise!
async function query(command, values) {
    return new Promise((resolve, reject) => {
        connection.query(command, values, (error, results) => {
            if (error) reject(error); 
            else resolve(results);
        })
    })
}
// Intro to program: Header Text

// code snippet from: sitepoint.com/javascript-command-line-interface-cli-node-js/
clear();

console.log(
  chalk.bgGreenBright(
    figlet.textSync("WAYNE Enterprises", { horizonatalLayout: "full" })
  )
);



