'use strict';


const locationController = require('../controllers/location-controller');

module.exports = (app) => {
    app.post('/api/location', locationController.create) //create a new branch
    app.get('/api/location/employees', locationController.getAll) //get all locations with employees in each location
}