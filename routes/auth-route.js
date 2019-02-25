'use strict'

const jwt = require('jsonwebtoken');
const passport = require('passport');
const Employee = require('../models').Employee
const jwtconfig = require('../config/jwtconfig')

module.exports = app => {
    app.post('/api/login', (req, res, next) => {
      passport.authenticate('login', (err, emp, info) => {
        if (err) {
          console.log(err);
        }
        if (info != undefined) {
          console.log(info.message);
          res.send(info.message);
        } else {
          req.logIn(emp, err => {
            Employee.findOne({
              where: {
                email: emp.email,
              },
            }).then(emp => {
                const payload = {
                    id:emp.id,
                    email: emp.email,
                    employee_id: emp.employee_id
                }
              const token = jwt.sign(payload, jwtconfig.secret);
              res.status(200).send({
                auth: true,
                token: `Bearer ${token}`,
                message: 'employee found & logged in',
              });
            });
          });
        }
      })(req, res, next);
    });

  };