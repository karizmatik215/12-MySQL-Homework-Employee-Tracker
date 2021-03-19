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
        'Add Department',
        'Add Role',
        'Add Employee',
        'View Department',
        'View Role',
        'View Employee',
        'Update Employee Role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.choices) {
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'View Department':
          viewDepartment();
          break;
        case 'View Role':
          viewRole();
          break;
        case 'View Employee':
          viewEmployee();
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
