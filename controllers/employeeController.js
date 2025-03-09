const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("CALL GetEmployees()");
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const { firstName, lastName, email, position, age, salary } = req.body;
  try {
    const [employee] = await pool.query("CALL FindEmployee(?)", [email]);
    if (employee && employee[0].length) {
      throw Error(`Employee with EmailId: ${email} already exists`);
    }
    await pool.query("CALL InsertEmployee(?, ?, ?, ?, ?, ?)", [firstName, lastName, email, position, age, salary]);
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateEmployee = async (req, res) => {
  const { firstName, lastName, email, position, age, salary } = req.body;
  const { id } = req.params;
  try {
    const [employee] = await pool.query("CALL FindEmployeeById(?)", [id]);
    if(employee && employee[0].length) {
      await pool.query("CALL UpdateEmployee(?, ?, ?, ?, ?, ?, ?)", [id, firstName, lastName, email, position, age, salary]);
      res.json({ message: "Employee updated successfully" });
    } else {
      throw Error(`Employee not found`);
    }    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [employee] = await pool.query("CALL FindEmployeeById(?)", [id]);
    if(employee && employee[0].length) {
      await pool.query("CALL DeleteEmployee(?)", [id]);
      res.json({ message: "Employee deleted successfully" });
    } else {
      throw Error(`Employee not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
