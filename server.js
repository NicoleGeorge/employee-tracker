// My Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const utils = require('util');
const figlet = require("figlet");
const clear = require("clear");
const chalk = require("chalk");
const {addNewEmployee, viewAllEmployees, updateEmployee, updateEmployeeRole} = require('./operations_db/employee');
// const {viewAllEmployees, updateEmployee, updateEmployeeRole} = require('./operations_db/departmet');
// const {viewAllEmployees, updateEmployee, updateEmployeeRole} = require('./operations_db/roles');

// Databse connection

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ferris88',
    database: 'wayneEnterprises_DB',
});

// code snippet taken from Wk 12 activity 10:

async function connect() {
    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) reject(err); 
            else resolve(); 
        })
    })
}
connection.queryPromise = function(command, values){

}

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
  chalk.greenBright(
    figlet.textSync("WAYNE Enterprises", { horizonatalLayout: "full" })
  )
);

// START: Main program details
async function main() {
    
    await connect();
    console.log("Houston..we have lift off!", connection.threadId);
    while (true) {
        
        const { employee_tracker } = await inquirer.prompt({
            name: 'employee_tracker',
            type: 'list',
            message: 'Hello Master Wayne. What would you like the Batcomputer to process?',
            choices: ['Add new W.E. employee',
            'View all W.E. employees', 
            'Update a W.E. employee role',
            'Remove a W.E. employee',
            // exit the program command below
            'Gotta go Batcomputer, Commissioner Gordon just activated the Bat Signal'
            ]
        });
        
        // Generate new user prompt
        if (employee_tracker === 'Add new W.E. employee') {
            await addNewEmployee()
        }       

        if (employee_tracker === 'View all W.E. employees') {
            await viewAllEmployees();
        }

        if (employee_tracker === 'Update a W.E. employee role') {
            await updateEmployee();
        }
        if (employee_tracker === 'Update a W.E. employee role') {
            await updateEmployeeRole();
        }

        // Bid on an item.
        else if (employee_tracker === 'BID') {
            
            // This a bit cheeky, I've renamed id -> value because inquirer can use
            // a name/value pair in its 'choices' field.
            const items = await query(`SELECT id AS value, name FROM items`);
            
            // What if there's nothing to bid on?
            if (items.length === 0) {
                console.log("There's nothing to bid on, how about POSTing an item?\n");
                
                // For those perplexed, this will shortcut to the top of the loop.
                continue;
            }
            
            
            // Let's update the item, but only if the new bid is _greater_ than
            // the existing price.
            const result = await query(`UPDATE items SET price = ? WHERE id = ? AND ? > price`, [answers.bid, answers.item, answers.bid]);
            
            // Remember that INSERT/UPDATE/DELETE doesn't return a table of rows.
            // Instead they return an 'OK' status.
            
            if (result.changedRows === 1) {
                // It updated, so therefore we have a bigger bid!
                console.log("Congrats! You are now the highest bidder.\n");
            }
            else {
                // In this case because we haven't updated anything we can assert that
                // the new bid was not bigger than the existing price.
                console.log(`Sorry, the current bid is bigger than ${answers.bid}.\n`);
            }
        }
        
        // If it's not POST or BID, then it _must_ be EXIT.
        else {
            console.log("Thanks, see you later!\n");
            break;
        }
    }
    
    // Tidy up.
    connection.end();
}


// Start the app.
main().catch(err => console.log(err));
        