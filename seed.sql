use wayneEnterprises_DB;

-- pre-polulating data in the wayneEnterprise_DB

INSERT INTO department(name) VALUES ('Engineering');
INSERT INTO department(name) VALUES ('Legal');
INSERT INTO department(name) VALUES ('Marketing');
INSERT INTO department(name) VALUES ('Public Relations');

INSERT INTO roles(title, salary, department_id) VALUES ('Lead Engineer', 500000, 1);
INSERT INTO roles(title, salary, department_id) VALUES ('Head of Legal', 400500, 2);
INSERT INTO roles(title, salary, department_id) VALUES ('Head of Marketing', 300500, 3);
INSERT INTO roles(title, salary, department_id) VALUES ('PR intern', 25000, 4);

INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES ('Lucius', 'Fox', 1, NULL);
INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES ('Harvey', 'Dent', 2, NULL);
INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES ('Selina', 'Kyle', 3, 3);
INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES ('Harley', 'Quinn', 4, 3);

SELECT * FROM employees;
