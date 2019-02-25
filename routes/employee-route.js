'use strict';
const employeeController = require('../controllers/employee-controller');
const isValid = require('../config/passportfiles/isValidSession')
module.exports = (app) => {

    app.post('/api/location/employee', employeeController.create); //create a new employee
    app.put('/api/location/:locationId/employee/:id',  employeeController.update); //update employee data
    app.delete('/api/location/:locationId/employee/:id', employeeController.delete); //delete
    app.get('/api/employees', employeeController.getallEmployees); //get all employees
    // isValid.loggedInOnly,
}

