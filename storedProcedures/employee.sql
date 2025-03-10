DELIMITER ;

-- start from here

 
DELIMITER $$

-- Insert Employee
CREATE PROCEDURE InsertEmployee(IN empFirstName VARCHAR(100), IN empLastName VARCHAR(100), IN empEmail VARCHAR(100), IN empPosition VARCHAR(100), IN empAge INTEGER, IN empSalary DECIMAL(10,2))
BEGIN
    INSERT INTO employees (firstName, lastName, email, position, age, salary) VALUES (empFirstName, empLastName, empEmail, empPosition, empAge, empSalary);
END $$

-- Get All Employees
CREATE PROCEDURE GetEmployees()
BEGIN
    SELECT * FROM employees;
END $$

-- Update Employee
CREATE PROCEDURE UpdateEmployee(IN empId INT, IN empFirstName VARCHAR(100), IN empLastName VARCHAR(100), IN empEmail VARCHAR(100), IN empPosition VARCHAR(100), IN empAge INTEGER, IN empSalary DECIMAL(10,2))
BEGIN
    UPDATE employees 
    SET firstName = empFirstName, lastName = empLastName, email = empEmail, position = empPosition, age = empAge, salary = empSalary
    WHERE id = empId;
END $$

-- Delete Employee
CREATE PROCEDURE DeleteEmployee(IN empId INT)
BEGIN
    DELETE FROM employees WHERE id = empId;
END $$

-- Find Employee
CREATE PROCEDURE FindEmployee(IN empEmail VARCHAR(100))
BEGIN
    SELECT * FROM employees WHERE email = empEmail;
END $$

DELIMITER ;
