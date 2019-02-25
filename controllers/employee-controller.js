const Employee = require('../models').Employee;
const passport = require('passport');
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;
const isValid = require('../config/passportfiles/isValidSession');


module.exports = {
    create(req, res, next) {
         Employee.findOne({
             where: {
                 email: req.body.email
             }
         }).then(emp => {
             if(emp) {
                 return res.status(400).json({
                     email: 'Email already exists!'
                 })
             }
             else {
                 const newEmployee = new Employee({
                     name: req.body.name,
                     email: req.body.email,
                     password: req.body.password,
                     employee_id: req.body.employee_id,
                     locationId: req.body.locationId
                 })
                 bcrypt.genSalt(BCRYPT_SALT_ROUNDS, (err, salt) => {
                     if(err) console.error('There was an error', err);
                     else {
                         bcrypt.hash(newEmployee.password, salt, (err, hash) => {
                             if(err) console.error('There was an error', err);
                             else {
                                 newEmployee.password = hash;
                                 newEmployee
                                 .save()
                                 .then(employee => {
                                     res.json(employee)
                                    }); 
                                }
                            })
                        }
                    })
                }

         })
    },
    getallEmployees(req, res, next) {
            
            return Employee
            .findAll({
                model: Employee
            })
            .then(employee => res.status(200).send(employee))
            .catch(error => res.status(400).send(error));

    },
    update(req, res) {
        return Employee
        .find({
            where: {
                locationId: req.params.locationId,
                id: req.params.id
            }
        }).then( employee => {
            if(!employee) {
                return res.status(404).send({
                    message: 'Employee Not Found'
                })
            }

            return employee
            .update(
                req.body,{fields: Object.keys(req.body)}
            )
            .then(updatedEmployee => res.status(200).send(updatedEmployee))
            .catch(error => res.status(400).send(error));

        })
    },
    delete(req,res) {
        return Employee
        .find({
            where: {
                id:req.params.id
            },
        })
        .then(employee => {
            if(!employee) {
                return res.status(404).send({
                    message: 'Employee Not Found!'
                })
            }
            return employee
            .delete()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
             .catch(error => res.status(400).send(error))
    }
}