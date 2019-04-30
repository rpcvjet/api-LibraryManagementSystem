'use strict';
const db = require('../config/db')
const Router = require('express').Router;
const CirculationRouter = module.exports = new Router();

CirculationRouter.get('/api/circulation', (req,res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT member_name, title, employee_name from Circulation INNER JOIN Member ON Member.id = Member_id INNER JOIN Book ON Book.id = Book_id INNER JOIN Employee ON Employee.id = Employee_id";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next);
})


