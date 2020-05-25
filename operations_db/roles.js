
const inquirer = require('inquirer');

async function addNewRole(){
    const answer = await inquirer.prompt([
        {
            name: 'newRoleTitle',
            type: 'input',
            message: 'What is the title of this new role?',
        },
        {
            name: 'newRoleSalary',
            type: 'input',
            message: 'What is the salary of this new role?',
        },
        {
            name: 'newRoleDepartment',
            type: 'list',
            message: 'Which department does this new role belong to?',
            choices: ['Engineering', 'Legal', 'Marketing', 'Public Relations']
        },
    ]);

    await query (`INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`, [answer.newRole, answer.newRoleSalary, answer.newRoleDepartment]);
    console.log("A new W.E role has been added. Cross-checking against W.E databse to check for similar positions that can be merged");

}

async function viewAllRoles(){
    const { filterRoles } = await inquirer.prompt(
        {
            name: 'filterEmployee',
            type: 'list',
            default: 'Department',
            message: 'How would you like me to filter W.E employees?',
            choices: ['Engineering', 'Legal', 'Marketing', 'Public Relations']
        }
    );
        if (filterRoles === 'Engineering') {
            
            const engineering = await query(`SELECT * FROM roles(title) VALUES(?)`, [answer.filterRoles]);
            console.table(engineering);
            console.log("You are now viewing all W.E employee roles within the Engineering department");
        }
        if (filterRoles === 'Legal') {
            const legal = await query(`SELECT * FROM roles(title) VALUES(?)`, [answer.filterRoles]);
            console.table(legal);
            console.log("You are now viewing all W.E employee roels within the Legal department");
        }
        if (filterRoles === 'Marketing') {
            const marketing = await query(`SELECT * FROM roles(title) VALUES(?)`, [answer.filterRoles]);
            console.table(marketing);
            console.log("You are now viewing all W.E employee roles within the Marketing department");
        }
        if (filterRoles === 'Public Relations') {
            const pr = await query(`SELECT * FROM roles(title) VALUES(?)`, [answer.filterRoles]);
            console.table(pr);
            console.log("You are now viewing all W.E employee roleswithin the P.R department");
        }
}

async function updateRole() {
    const answer = await inquirer.prompt([
        {
            name: 'selectRole',
            type: 'list',
            message: 'Which role would you like to update?',
            // TODO select the role.title from the darabase
            choices: ['roles.title']
        },
        {
            name: 'updatedRoleTitle',
            type: 'input',
            message: 'What is the title of this new role?',
        },
        {
            name: 'updatedRoleSalary',
            type: 'input',
            message: 'What is the salary of this new role?',
        },
        {
            name: 'updatedRoleDepartment',
            type: 'list',
            message: 'Which department does this new role belong to?',
            choices: ['Engineering', 'Legal', 'Marketing', 'Public Relations']
        },
    ]);

    await query (`INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`, [answer.selectRole, answer.updatedRoleTitle, answer.updatedRoleSalary, answer.updatedRoleDepartment]);
    console.log("Your selected W.E role has now been updated. Automating company email ");
}


module.exports = {
    addNewRole: addNewRole,
    viewAllRoles: viewAllRoles,
    updateRole: updateRole
}