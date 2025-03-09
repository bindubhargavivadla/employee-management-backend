const { body, param, validationResult } = require("express-validator");

// 🟢 Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 🟢 Validation for creating an employee
const validateCreateEmployee = [
  body("firstName").isString().trim().notEmpty().withMessage("First name is required"),
  body("lastName").isString().trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("position").isString().trim().notEmpty().withMessage("Position is required"),
  body("age").isInt({ min: 18, max: 65 }).withMessage("Age must be between 18 and 65"),
  body("salary").isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
  handleValidationErrors,
];

// 🟢 Validation for updating an employee
const validateUpdateEmployee = [
  param("id").isInt().withMessage("Invalid employee ID"),
  body("firstName").optional().isString().trim().notEmpty().withMessage("First name must be a string"),
  body("lastName").optional().isString().trim().notEmpty().withMessage("Last name must be a string"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("position").optional().isString().trim().notEmpty().withMessage("Position must be a string"),
  body("age").optional().isInt({ min: 18, max: 65 }).withMessage("Age must be between 18 and 65"),
  body("salary").optional().isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
  handleValidationErrors,
];

// 🟢 Validation for deleting an employee
const validateDeleteEmployee = [
  param("id").isInt().withMessage("Invalid employee ID"),
  handleValidationErrors,
];

module.exports = {
  validateCreateEmployee,
  validateUpdateEmployee,
  validateDeleteEmployee,
};
