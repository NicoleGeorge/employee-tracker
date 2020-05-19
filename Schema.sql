BEGIN;

DROP DATABASE IF EXISTS wayneEnterprises_DB;
CREATE DATABASE wayneEnterprises_DB;

USE wayneEnterprises_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (department_id)
  REFERECNCES department(id)
);

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id),
  FOREIGN KEY (manager_id),
  REFERECNCE department(id)
);

COMMIT;




