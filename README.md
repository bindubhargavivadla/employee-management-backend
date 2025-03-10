# Employee Management System

## Project Overview
This project is a simple Employee Management System with a **Node.js backend** and **React.js frontend**.  
It allows users to **add, update, delete, and view employees** using MySQL stored procedures.

## Tech Stack
- **Backend**: Node.js, Express, MySQL, Sequelize
- **Frontend**: React.js, React Testing Library, Jest
- **Testing**: Mocha, Chai, Supertest

## 🛠️ Setup Instructions

## Clone the Repository

git clone https://github.com/your-username/employee-management.git
cd employee-management

## Install the dependencies
- npm install

## Set Up Environment Variables
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=employeeDB

## Create employeeDB Database
CREATE DATABASE employeeDB;
USE employeeDB;

## Run Migration file to create employee table
npx sequelize-cli db:migrate

## Save stored procedure on employeeDB
available path: storedProcedures/employee.sql

## Start the application
npm start

## Running Tests
npm test