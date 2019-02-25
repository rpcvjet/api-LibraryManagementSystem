const Employee = require('../models').Employee;
const jwtSecret = require('../config/jwtconfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser')


module.exports = {
    logIn(req, res) {
        console.log('req ', req.body)
        passport.authenticate('login', (err, employee) => {
            console.log('employee ',employee)
            if (err) {
                console.log('login err ', err)
            } else {
                Employee.findOne({
                    where: {
                        email: employee.email
                    }
                }).then(employee => {
                    const token = jwt.sign({
                        id: employee.name
                    }, jwtSecret.secret)
                    const payload = {
                        id: emp.id,
                        name: emp.name,
                        email: emp.email
                    }
                    res.status(200).send({
                        auth: true,
                        token: token,
                        payload,
                        message: 'user found & logged in'
                    })
                })

            }

        })
    }
}
