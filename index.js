const inquirer = require('inquirer');
const connection = require('./db/connection');
const mysql = require('mysql');
const cTable = require('console.table');

connection.connect((err) => {
  if (!err) {
    console.log(
      `Connected to Employee Tracker on port ${connection.config.port}`
    );
    console.log(`
  ---------------------------------------------------------------------------------------                                                
 ________                          __                                         
/        |                        /  |                                        
$$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______  
$$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \ 
$$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |
$$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |
$$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/ 
$$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |
$$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/ 
                        $$ |                    /  \__$$ |                    
 __       __            $$ |                    $$    $$/                     
/  \     /  |           $$/                      $$$$$$/                      
$$  \   /$$ |  ______   _______    ______    ______    ______    ______       
$$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \      
$$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |     
$$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/      
$$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |           
$$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |           
$$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/            
                                           /  \__$$ |                         
                                           $$    $$/                          
                                            $$$$$$/                                                   
-----------------------------------------------------------------------------------------
  `);
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
//View All Employees
const viewAllEmployees = () => {
  connection.query(
    `SELECT 
      employee.id,
      employee.first_name AS 'First Name',
      employee.last_name AS 'Last Name',
      employee_role.title AS 'Title',
      employee_role.salary AS 'Salary',
      department.department_name AS 'Department',
      CONCAT(manager.first_name,
            ' ',
            manager.last_name) AS 'Manager'
    FROM
      employee
        LEFT JOIN
      employee_role ON (employee_role.id = employee.role_id)
        LEFT JOIN
      department ON (department.id = employee_role.department_id)
        LEFT JOIN
      employee manager ON manager.id = employee.manager_id
    ORDER BY employee.id;`,
    (error, query) => {
      if (error) throw error;
      console.table(query);
      start();
    }
  );
};
//Add An Employee
const addEmployee = () => {};
//View All Departments
const viewDepartments = () => {
  connection.query(
    `SELECT
      department_name AS Department
    FROM 
      department`,
    (error, query) => {
      if (error) throw error;
      console.table(query);
      start();
    }
  );
};
//Add A Department
const addDepartment = () => {};
//View All Employee Roles
const viewEmployeeRoles = () => {
  connection.query(
    `SELECT 
      title AS Title
    FROM
      employee_role`,
    (error, query) => {
      if (error) throw error;
      console.table(query);
      start();
    }
  );
};
//Add An Employee Role
const addRole = () => {};
//Update An Employee Role
const updateEmployeeRole = () => {};
