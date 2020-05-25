
const inquirer = require('inquirer');

async function addNewEmployee(){
    const answer = await inquirer.prompt([
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
    ]);

    await query (`INSERT INTO employees(first_name, last_name) VALUES (?, ?)`, [answer.employeeFirstName, answer.employeeLastName, ]);
    console.log("new W.E employee added. Cross-checking against Gotham P.D database initiated");

}

async function viewAllEmployees(){
    const { filterEmployee } = await inquirer.prompt(
        {
            name: 'filterEmployee',
            type: 'list',
            default: 'Department',
            message: 'How would you like me to filter W.E employees?',
            choices: ['Engineering', 'Legal', 'Marketing', 'Public Relations']
        }
    );
        if (filterEmployee === 'Engineering') {
            
            const engineering = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterEmployee]);
            console.table(engineering);
            console.log("You are now viewing all W.E employees within the Engineering department");
        }
        if (filterEmployee === 'Legal') {
            const legal = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterEmployee]);
            console.table(legal);
            console.log("You are now viewing all W.E employees within the Legal department");
        }
        if (filterEmployee === 'Marketing') {
            const marketing = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterEmployee]);
            console.table(marketing);
            console.log("You are now viewing all W.E employees within the Marketing department");
        }
        if (filterEmployee === 'Public Relations') {
            const pr = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterEmployee]);
            console.table(pr);
            console.log("You are now viewing all W.E employees within the P.R department");
        }
}

async function updateEmployee() {

    const answer = await inquirer.prompt([
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
}

async function updateEmployeeRole() {
    const answer = await inquirer.prompt([
        {
            name: 'id',
            type: 'list',
            message: 'Please specify which W.E Role you would like to update?',
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
}



module.exports = {
    addNewEmployee: addNewEmployee,
    updateEmployee: updateEmployee,
    updateEmployeeRole: updateEmployeeRole,
    viewAllEmployees: viewAllEmployees
}