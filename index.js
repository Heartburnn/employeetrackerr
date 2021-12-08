
const inquirer = require('inquirer')
const mysql = require("mysql2")


require("console.table")
var roleArray = []
var departmentArray = []
var managerArray = []



const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "augustus",
    database: "employee_tracker_db",
  },
);

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose an option?",
        name: "choices",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choices) {
        case "view all departments":
          db.query(
            "SELECT department.name AS Department, department.id AS 'Department #' FROM department;",
            function (err, res) {
              if (err) throw err;
              console.table(res);
              startPrompt()
            }
          );
          break;

        case "view all roles":
          db.query(
            "SELECT roles.id AS ID, roles.title AS Position, department.name AS Department FROM roles LEFT JOIN department on department.id = roles.department_id;",
            function (err, res) {
              if (err) throw err;
              console.table(res);
              startPrompt()
            }
          );
          break;

        case "view all employees":
          db.query(
            "SELECT employee.id AS ID, CONCAT(employee.first_name, ' ' ,employee.last_name) AS Employee, department.name AS Department, roles.title AS Position, roles.salary AS Salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN roles on roles.id = employee.roles_id INNER JOIN department on department.id = roles.department_id left join employee e on employee.manager_id = e.id;",
            //switch to arrow function
            function (err, res) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
    
        
        break;

        case "add a department":
          inquirer
            .prompt([
            {
              name: "name",
             message: "What is the name of the Department you would like to add?",
            },
          ])
         .then(function (res) {
            let query = db.query(
             "INSERT INTO department SET ?",
              {
              name: res.name,
              },
            (err) => {
             if (err) throw err;
             console.log(`Added the ${res.name} Department!`);
             startPrompt();
            }
          );
        });
        break;

        case "add a role":
          db.query(
            "SELECT roles.title AS Title, roles.salary AS Salary FROM roles",
            (err, res) => {
              inquirer
                .prompt([
                  {
                    name: "title",
                    message: "What is the title of the role?",
                  },
                  {
                    name: "salary",
                    message: `What is the salary for this position?`,
                  },
                  {
                    name: "department",
                    type: "choice",
                    message:
                      "What is the ID of the department that the role belongs to?",
                    choices: selectDepartment(),
                  },
                ])
                .then((res) => {
                  db.query(
                    "INSERT INTO roles SET ?",
                    {
                      title: res.title,
                      salary: res.salary,
                      department_id: res.department,
                    },
                    (err) => {
                      if (err) throw err;
                      console.table(res);
                      startPrompt();
                    }
                  );
                });
            }
          );
        break;

        case "add an employee":
          inquirer
            .prompt([
            {
              name: "firstname",
              message: "What is the employee's first name?",
            },
           {
             name: "lastname",
             message: "What is the employee's last name?",
           },
           {
              name: "role",
              type: "list",
             message: "What is the employee's position?",
              choices: selectRole(),
           },
           {
              name: "manager",
              type: "rawlist",
              message: "Who is the employee's manager?",
              choices: selectManager(),
           },
          ])
           .then((val) => {
            let roleid = selectRole().indexOf(val.role) + 1;
            let managerid = selectManager().indexOf(val.manager) + 1;
            console.log(val.role);
            console.log(val.manager);
           db.query(
             "INSERT INTO employee SET ?",
              {
              first_name: val.firstname,
              last_name: val.lastname,
             manager_id: managerid,
              roles_id: roleid,
             },
             (err) => {
                if (err) throw err;
                console.table(val);
               runPrompt();
             }
            );
          });
          break;

          case "update an employee role":
          db.query(
            "SELECT employee.last_name, roles.title, FROM employee JOIN roles ON employee.roles_id = roles.id;",
            function (err, res) {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    name: "lastName",
                    type: "rawlist",
                    choices: function () {
                      var lastName = [];
                      for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                      }
                      return lastName;
                    },
                    message: "What is the Employee's last name? ",
                  },
                  {
                    name: "role",
                    type: "rawlist",
                    message: "What is the Employees new title? ",
                    choices: selectRole(),
                  },
                ])
                .then(function (val) {
                  console.log(val.role);
                  console.log(val.lastName);
                  var roleId = selectRole().indexOf(val.role) + 1;
                  db.query("UPDATE employee SET roles_id =? WHERE last_name =?", [
                    roleId,
                    val.lastName,
                  ]),
                    function (err) {
                      if (err) throw err;
                      console.table(val);
                    };
                    startPrompt()
                });
            }
            );
          break;

           case "exit":
              console.log("you have exited");
             process.exit();
            break;
         }
       });
}

function selectDepartment() {
  db.query("SELECT id FROM department", (err, res) => {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      departmentArray.push(res[i].name);
    }
  });
}

function selectRole() {
  db.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  });
  return roleArray;
}

function selectManager() {
  db.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    (err, res) => {
      if (err) throw err;
        managerArray.push(res[i].first_name);
    }
  );
  return managerArray;
}

startPrompt()
