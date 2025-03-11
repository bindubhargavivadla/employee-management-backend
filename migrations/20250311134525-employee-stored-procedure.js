"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE InsertEmployee(
          IN empFirstName VARCHAR(100), 
          IN empLastName VARCHAR(100), 
          IN empEmail VARCHAR(100), 
          IN empPosition VARCHAR(100), 
          IN empAge INTEGER, 
          IN empSalary DECIMAL(10,2)
      )
      BEGIN
          INSERT INTO Employees (firstName, lastName, email, position, age, salary) 
          VALUES (empFirstName, empLastName, empEmail, empPosition, empAge, empSalary);
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE GetEmployees()
      BEGIN
          SELECT * FROM Employees;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE UpdateEmployee(
          IN empId INT, 
          IN empFirstName VARCHAR(100), 
          IN empLastName VARCHAR(100), 
          IN empEmail VARCHAR(100), 
          IN empPosition VARCHAR(100), 
          IN empAge INTEGER, 
          IN empSalary DECIMAL(10,2)
      )
      BEGIN
          UPDATE Employees 
          SET firstName = empFirstName, 
              lastName = empLastName, 
              email = empEmail, 
              position = empPosition, 
              age = empAge, 
              salary = empSalary
          WHERE id = empId;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE DeleteEmployee(IN empId INT)
      BEGIN
          DELETE FROM Employees WHERE id = empId;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE FindEmployee(IN empEmail VARCHAR(100))
      BEGIN
          SELECT * FROM Employees WHERE email = empEmail;
      END;
    `);

     await queryInterface.sequelize.query(`
      CREATE PROCEDURE FindEmployeeById(IN empId INT)
      BEGIN
          SELECT * FROM Employees WHERE id = empId;
      END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS InsertEmployee;`);
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS GetEmployees;`);
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS UpdateEmployee;`);
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS DeleteEmployee;`);
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS FindEmployee;`);
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS FindEmployeeById;`);
  },
};
