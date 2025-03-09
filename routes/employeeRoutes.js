const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const employeeValidation = require("../validation/employee.validation")

router.get("/", employeeController.getAllEmployees);
router.post("/", employeeValidation.validateCreateEmployee, employeeController.createEmployee);
router.put("/:id", employeeValidation.validateUpdateEmployee, employeeController.updateEmployee);
router.delete("/:id", employeeValidation.validateDeleteEmployee, employeeController.deleteEmployee);

module.exports = router;
