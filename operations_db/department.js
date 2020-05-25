
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
            ])}
}

async function updateEmployee() {
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
}

async function updateEmployeeRole() {
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
}



module.exports = {
    updateEmployee: updateEmployee,
    updateEmployeeRole: updateEmployeeRole,
    viewAllEmployees: viewAllEmployees
}