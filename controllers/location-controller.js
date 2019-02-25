const Location = require('../models').Location
const Employee = require('../models').Employee;

module.exports = {
    create(req, res) {
        return Location.create({
                branch: req.body.branch,
                address: req.body.address
            })
            .then(location => res.status(200).send(location))
            .catch(error => res.status(400).send(error))
    },
    getAll(req, res) {
        return Location.findAll({
            include: [{
                model: Employee,
                as: 'employees'
            }]
        })
        .then(location => res.status(200).send(location))
        .catch(error => res.status(400).send(error))
    }
}