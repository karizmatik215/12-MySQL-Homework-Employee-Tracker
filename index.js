const inquirer = require('inquirer');
const connection = require('./db/connection');

connection.connect((err) => {
  if (!err) {
    console.log(
      `Connected to Employee Tracker on port ${connection.config.port}`
    );
  } else throw console.error('Error Connecting');
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: 'choices',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'View Departments',
        'Add Department',
        'View Employee Roles',
        'Add Role',
        'Update Employee Role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.choices) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'View Departments':
          viewDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'View Employee Roles':
          viewEmployeeRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Employee Tracker Closed');
      }
    });
};

function viewAllEmployees() {}
function addEmployee() {}
function viewDepartments() {}
function addDepartment() {}
function viewEmployeeRoles() {}
function addRole() {}
function updateEmployeeRole() {}
