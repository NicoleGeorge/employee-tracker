// My Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const utils = require('util');
const figlet = require("figlet");
const clear = require("clear");
const chalk = require("chalk");
const consoleTable = requre('console.table');

// Databse connection

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zxcv1234',
    database: 'wayneEnterprises_DB',
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

// START: Main program details
async function main() {
    
    await connect();
    console.log("Houston..we have lift off!", connection.threadId);
    while (true) {
        
        // What to do?
        // Note we're using object-destructuring here ;)
        const { employee_tracker } = await inquirer.prompt({
            name: 'employee_tracker',
            type: 'list',
            message: 'Would you like the Batcomputer to do?',
            choices: ['View all W.E. employees', 
            'Add new W.E. employee',
            'Remove a W.E. employee',
            'Update a W.E. employee role',
            'Nice talking Batcomputer, but Bruce just paged me'
            ]
        });
        
        // Generate new user prompt
        if (employee_tracker === 'Add new W.E. employee') {
                            
            const { addNewEmployee } = await inquirer.prompt([
                {
                    name: 'employeeFirstName',
                    type: 'input',
                    message: 'What is the first name of the new W.E employee?',
                },
                {
                    name: 'employeeLastName',
                    type: 'input',
                    message: 'What is the last name of the new W.E employee?',
                },
                {
                    name: 'employeeDepartment',
                    type: 'list',
                    message: 'Which department do they work in?',
                    choices: ['Engineering', 'Legal', 'Marketing', 'Public Relations']
                },
                {
                    name: 'employeeTitle',
                    type: 'input',
                    message: 'What is the title of their new role?',
                },
                {
                    name: '',
                    type: 'input',
                    message: 'What is the title of their new role?',
                },
                {
                    name: 'employeeTitle',
                    type: 'input',
                    message: 'What is the title of their new role?',
                }
            ]);

            await query (`INSERT INTO employees(first_namee, last_name) VALUES (?, ?)`, [answer.employeeFirstName, answer.employeeLastName, ]);

            if (employee_tracker === 'View all W.E. employees') {

                const { filterEmployee } = await inquirer.prompt(
                    {
                        name: 'filterEmployee',
                        type: 'list',
                        default: 'Department',
                        message: 'How would you like me to filter W.E employees?',
                        choices: ['Engineering', 'Legal', 'Markeeting', 'Public Relations']
                    }
                );
                    if (filterEmployee === 'Engineering') {
                        
                        const answer = await inquirer.prompt([
                            {
                                name: 'name',
                                type: 'input',
                                message: 'Which department would you like',
                            },
                            {
                                name: 'price',
                                type: 'number',
                                message: 'Starting bid?',
                            },
                            {
                                name: 'quantity',
                                type: 'number',
                                message: 'How many?',
                            }
                        ]);
                else if (employee_tracker === 'Update a W.E. employee role') {
                            
                            // Describe the item.
                            const answers = await inquirer.prompt([
                                {
                                    name: 'name',
                                    type: 'input',
                                    message: 'Item name?',
                                },
                                {
                                    name: 'price',
                                    type: 'number',
                                    message: 'Starting bid?',
                                },
                                {
                                    name: 'quantity',
                                    type: 'number',
                                    message: 'How many?',
                                }
                            ]);

                    // Make a new auction item.
                        if (employee_tracker === 'Update a W.E. employee role') {
                            
                            // Describe the item.
                            const answers = await inquirer.prompt([
                                {
                                    name: 'name',
                                    type: 'input',
                                    message: 'Item name?',
                                },
                                {
                                    name: 'price',
                                    type: 'number',
                                    message: 'Starting bid?',
                                },
                                {
                                    name: 'quantity',
                                    type: 'number',
                                    message: 'How many?',
                                }
                            ]);
                    
            // Okay, let's create it in the database.
            await query(`
                INSERT INTO items (name, price, quantity) VALUES (?, ?, ?)`,
                [answers.name, answers.price, answers.quantity]
            );
            
            // TODO We should really check first whether the query worked or not.
            console.log("Great, it's now on auction.\n");
        }
        
        // Bid on an item.
        else if (employee_tracker === 'BID') {
            
            // This a bit cheeky, I've renamed id -> value because inquirer can use
            // a name/value pair in its 'choices' field.
            const items = await query(`
                SELECT
                    id AS value,
                    name
                FROM items
            `);
            
            // What if there's nothing to bid on?
            if (items.length === 0) {
                console.log("There's nothing to bid on, how about POSTing an item?\n");
                
                // For those perplexed, this will shortcut to the top of the loop.
                continue;
            }
            
            // Ask away.
            const answers = await inquirer.prompt([
                {
                    name: 'item',
                    type: 'list',
                    message: 'What do you want to bid on?',
                    choices: items,
                },
                {
                    name: 'bid',
                    type: 'number',
                    message: 'How much is your bid?',
                }
            ]);
            
            // Let's update the item, but only if the new bid is _greater_ than
            // the existing price.
            const result = await query(`
                UPDATE items
                    SET price = ?
                WHERE id = ?
                    AND ? > price
            `, [answers.bid, answers.item, answers.bid]);
            
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



