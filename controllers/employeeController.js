const mysql = require("mysql2/promise");
require("dotenv").config();
const sequelize = require("../config/database")

exports.getAllEmployees = async (req, res) => {
  try {
    const rows = await sequelize.query("CALL GetEmployees()");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const { firstName, lastName, email, position, age, salary } = req.body;
  try {
    const employee = await sequelize.query("CALL FindEmployee(?)",
      {replacements: [email]}
    );
    if (employee && employee.length) {
      throw Error(`Employee with EmailId: ${email} already exists`);
    }

    await sequelize.query(
      "CALL InsertEmployee(:firstName, :lastName, :email, :position, :age, :salary)", 
      {
        replacements: { firstName, lastName, email, position, age, salary }
      }
    );

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateEmployee = async (req, res) => {
  const { firstName, lastName, email, position, age, salary } = req.body;
  const { id } = req.params;

  try {
    // Fetch employee by ID
    const employee = await sequelize.query("CALL FindEmployeeById(?)", {
      replacements: [id]
    });

    // Check if employee exists
    if (employee && employee.length) {
      await sequelize.query("CALL UpdateEmployee(?, ?, ?, ?, ?, ?, ?)", {
        replacements: [id, firstName, lastName, email, position, age, salary]
      });

      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ error: `Employee not found` });
    }

  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await sequelize.query("CALL FindEmployeeById(?)", {
      replacements: [id]
    });

    if (employee && employee.length) {
      await sequelize.query("CALL DeleteEmployee(?)", {
        replacements: [id]
      });
      res.json({ message: "Employee deleted successfully" });
    } else {
      throw Error(`Employee not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
