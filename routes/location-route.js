'use strict';


const locationController = require('../controllers/location-controller');

module.exports = (app) => {
    app.post('/api/location', locationController.create) //create a new branch
    app.get('/api/location', locationController.getAll) //get all employees in each location
}