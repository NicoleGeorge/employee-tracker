
const inquirer = require('inquirer');

async function addNewDepartment(){
    const answer = await inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'What is the name of the new W.E department?',
        },
    ]);

    await query (`INSERT INTO department(name) VALUES (?)`, [answer.departmentName]);
    console.log("new W.E department added. Scanning internal employee database for a suitable department head");

}

async function viewDepartments(){
    const { viewDepartment } = await inquirer.prompt(
        {
            name: 'filterDepartments',
            type: 'list',
            default: 'Engineering',
            message: 'Which department would you like to view?',
            choices: ['Engineering', 'Legal', 'Marketing', 'Public Relations']
        }
    );
    if (viewDepartment === 'Engineering') {
            
        const engineering = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.viewDepartment]);
        console.table(engineering);
        console.log("You are now viewing all W.E employees within the Engineering department");
    }
    if (viewDepartment === 'Legal') {
        const legal = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.viewDepartment]);
        console.table(legal);
        console.log("You are now viewing all W.E employees within the Legal department");
    }
    if (viewDepartment === 'Marketing') {
        const marketing = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.viewDepartment]);
        console.table(marketing);
        console.log("You are now viewing all W.E employees within the Marketing department");
    }
    if (viewDepartment === 'Public Relations') {
        const pr = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.viewDepartment]);
        console.table(pr);
        console.log("You are now viewing all W.E employees within the P.R department");
    }
}

async function updateDepartment() {
 // Describe the item.
    const answers = await inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: '',
        },
        {
            name: 'name',
            type: 'input',
            message: '',
        },
        {
            name: 'name',
            type: 'input',
            message: '',
        }
    ]);
}




module.exports = {
    viewDepartments: viewDepartments,
    addNewDepartment: addNewDepartment,
    updateDepartment: updateDepartment
}