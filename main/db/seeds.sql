INSERT INTO department (department_name)
VALUES ("supply chain"),
       ("HR"),
       ("safety"),
       ("accounting");
      
INSERT INTO roles (title, salary, department_id)
VALUES ("supply chain director", 75000, 1),
       ("HR director", 84000, 2),
       ("safety Manager", 82000, 3),
       ("accounting Manager", 77000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "cliff", 1, NULL),
       ("Micheal", "D", 2, NULL),
       ("Christina", "bailey", 3, NULL),
       ("Dalida", "Quinn", 4, NULL);

       
       
