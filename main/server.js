const inquirer = require('inquirer');
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password1",
    database: "departments_db"
})

const questions = [
    {
        type: 'list',
        message: 'what would you like to do?',
        name: 'action',
        choices: [
            'View All Employees',
            'View All Departments',
            'View All Roles',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Quit'
        ]


    },
    
]
function init() {

    inquirer
        .prompt(questions)
        .then(answers => {
            console.log(answers);
            if (answers.action == 'View All Employees') {
                viewAllEmployees();
            }
            if (answers.action == 'View All Roles') {
                viewAllRoles();
            }
            if (answers.action == 'View All Departments') {
                viewAlldepartment();
            }
            if (answers.action == 'Add Employee') {
                addEmployee();

            }
            if (answers.action == 'Add Role') {
                addRole();
            }
            if (answers.action == 'Add Department') {
                addDepartment();
            }
            if (answers.action == 'Update Employee Role') {
                updateEmployeeRole();
            }
           
        })
}

function viewAllEmployees() {
    //  show all employees from the database
    db.query("SELECT * FROM employee;", (err, data) => {
        if (err) {
            console.log(err)
        }
        console.table(data)
        init();
    })
}

function viewAllRoles() {
    db.query("SELECT * FROM roles;", (err, data) => {
        if (err) {
            console.log(err)
        }
        console.table(data)
        init();
    })


}

function viewAlldepartment() {
    db.query("SELECT * FROM department;", (err, data) => {
        if (err) {
            console.log(err)
        }
        console.table(data)
        init();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "what is the first name ?",
            name: "first_name",

        },
        {
            type: "input",
            message: "what is the last name ?",
            name: "last_name",

        },
        {
            type: "input",
            message: "what is the role id ?",
            name: "role_id",

        },
        {
            type: "input",
            message: "what is the manager id ?",
            name: "manager_id",

        },
    ]).then(answers => {
        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) 
        VALUES ("${answers.first_name}","${answers.last_name}",${answers.role_id},${answers.manager_id});`, (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log("Employee has been added")
            init();
        })
    })

}
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "what is the Role Title ?",
            name: "role_title",

        },
        {
            type: "input",
            message: "how much is the salary ?",
            name: "salary",

        },
        {
            type: "input",
            message: "what is the Department id ?",
            name: "department_id",

        },
   
    ]).then(answers => {
        db.query(`INSERT INTO roles (title,salary,department_id)
        VALUES ("${answers.role_title}","${answers.salary}",${answers.department_id});`, (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log("Role has been aded")
            init();
        })
    })

}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "what is the Department Name ?",
            name: "department_name",

        },
       
   
    ]).then(answers => {
        db.query(`INSERT INTO department (department_name)
        VALUES ("${answers.department_name}");`, (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log("Department has been added")
            init();
        })
    })

}

function updateEmployeeRole() {
        inquirer.prompt([
            {
                type: "input",
                message: "what is the Employee id ?",
                name: "emp_id",
    
            },
            {
                type: "input",
                message: "what is the new role ?",
                name: "new_role",
    
            },
            // {
            //     type: "input",
            //     message: "what is the new salary ?",
            //     name: "new_salary",
    
            // },

            
        ]).then(answers => {
            console.log(answers)
            db.query(`UPDATE employee SET role_id = '${answers.new_role}' WHERE id = '${answers.emp_id}';'`, (err, data) => {
                if (err) {
                    console.log(err)
                }
                console.log("Employee Role has been updated")
                init();
            })
        })
    
    }

init();    