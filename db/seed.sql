USE employee_tracker_db;


INSERT INTO department (name)
VALUE ('Inbound');
INSERT INTO department (name)
VALUE ('Stow');
INSERT INTO department (name)
VALUE ('Pick');
INSERT INTO department (name)
VALUE ('Pack');
INSERT INTO department (name)
VALUE ('Delivery');

INSERT INTO roles (title, salary, department_id)
VALUE ('Inbound Worker', 280000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ('Inbount Manager', 32000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ('Stow Worker', 16000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ('Pick Worker', 17000, 3);
INSERT INTO roles (title, salary, department_id)
VALUE ('Packer', 13000, 4);
INSERT INTO roles (title, salary, department_id)
VALUE ('Floor Manager', 35000, 4);
INSERT INTO roles (title, salary, department_id)
VALUE ('Delivery Driver', 25000, 5);

INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ('John', 'Freit', null, 1);
INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ('Daniel', 'Nguyen', 2, 3);
INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ('Charlie', 'Chaplin', 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ('Barrack', 'Obama', 1, 5);
INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ('Augustus', 'Caesar', 3, 4;
INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ('John', 'Taylor', null, 3);
INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ('Ryan', 'Black',1, 1);


     
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;