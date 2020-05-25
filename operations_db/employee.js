
const inquirer = require('inquirer');

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
            
            const engineering = await query(`SELECT * FROM Engineering`);
            console.table(engineering);
        }
        if (filterEmployee === 'Legal') {
            const legal = await query(`SELECT * FROM Legal`);
            console.table(legal);
        }
        if (filterEmployee === 'Marketing') {
            const marketing = await query(`SELECT * FROM Marketing`);
            console.table(marketing);
        }
        if (filterEmployee === 'Public Relations') {
            const pr = await query(`SELECT * FROM Public Relations`);
            console.table(pr);
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
    updateEmployee: updateEmployee,
    updateEmployeeRole: updateEmployeeRole,
    viewAllEmployees: viewAllEmployees
}