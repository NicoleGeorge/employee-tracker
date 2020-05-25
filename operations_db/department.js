
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
    const { filterDepartment } = await inquirer.prompt(
        {
            name: 'filterDepartments',
            type: 'list',
            default: 'Engineering',
            message: 'Which department would you like to view?',
            choices: ['Engineering', 'Legal', 'Marketing', 'Public Relations']
        }
    );
    if (filterDepartment === 'Engineering') {
            
        const engineering = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterDepartment]);
        console.table(engineering);
        console.log("You are now viewing all W.E employees within the Engineering department");
    }
    if (filterDepartment === 'Legal') {
        const legal = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterDepartment]);
        console.table(legal);
        console.log("You are now viewing all W.E employees within the Legal department");
    }
    if (filterDepartment === 'Marketing') {
        const marketing = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterDepartment]);
        console.table(marketing);
        console.log("You are now viewing all W.E employees within the Marketing department");
    }
    if (filterDepartment === 'Public Relations') {
        const pr = await query(`SELECT * FROM department(name) VALUES(?)`, [answer.filterDepartment]);
        console.table(pr);
        console.log("You are now viewing all W.E employees within the P.R department");
    }
}

async function updateDepartment() {
 // TODO - pull reference points from data table and update details
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