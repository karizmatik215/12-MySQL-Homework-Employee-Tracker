const inquirer = require('inquirer');
const connection = require('./db/connection');
const mysql = require('mysql');
const cTable = require('console.table');

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

const viewAllEmployees = () => {
  connection.query(
    `SELECT employee.id,
      employee.first_name AS "First Name",
      employee.last_name AS "Last Name",
      employee_role.title AS "Role",
      employee_role.salary AS "Salary",
      department.department_name AS "Department"
    FROM employee
      INNER JOIN employee_role ON (employee_role.id = employee.role_id)
      INNER JOIN department ON (department.id = employee_role.department_id)
    ORDER BY employee.id;`,
    (error, query) => {
      if (error) throw error;
      console.table(query);
      start();
    }
  );
};

const addEmployee = () => {};
const viewDepartments = () => {};
const addDepartment = () => {};
const viewEmployeeRoles = () => {};
const addRole = () => {};
const updateEmployeeRole = () => {};
