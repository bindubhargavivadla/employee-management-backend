const request = require("supertest");
const app = require("../index");
const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

beforeAll(async () => {
  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // Use a separate test database
  });
});

afterAll(async () => {
  await pool.end();
});

describe("Employee API Tests", () => {
  
  // Test GET all employees
  it("should return all employees", async () => {
    const response = await request(app).get("/api/employees");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test POST (Create Employee)
  it("should create a new employee", async () => {
    const newEmployee = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      position: "Software Engineer",
      age: 30,
      salary: 50000,
    };

    const response = await request(app).post("/api/employees").send(newEmployee);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Employee added successfully");
  });

  // Test POST (Create Employee with Duplicate Email)
  it("should not allow duplicate emails", async () => {
    const duplicateEmployee = {
      firstName: "Jane",
      lastName: "Doe",
      email: "john.doe@example.com",
      position: "Manager",
      age: 35,
      salary: 60000,
    };

    const response = await request(app).post("/api/employees").send(duplicateEmployee);
    expect(response.status).toBe(500);
    expect(response.body.error).toMatch(/Employee with EmailId: john.doe@example.com already exists/);
  });

  // Test PUT (Update Employee)
  it("should update an employee", async () => {
    const updateData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      position: "Senior Developer",
      age: 32,
      salary: 70000,
    };

    const response = await request(app).put("/api/employees/1").send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee updated successfully");
  });

  // Test DELETE Employee
  it("should delete an employee", async () => {
    const response = await request(app).delete("/api/employees/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee deleted successfully");
  });

  // Test DELETE Employee (Non-existent ID)
  it("should return error for deleting a non-existent employee", async () => {
    const response = await request(app).delete("/api/employees/9999");
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Employee not found");
  });

});
