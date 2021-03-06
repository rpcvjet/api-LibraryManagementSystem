'use strict';
const db = require('../config/db')
const Router = require('express').Router;
const employeeRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();


//post a new employee
employeeRouter.post('/api/postEmployee', bodyParser, (req, res, next) => {
    const post = {
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        password: req.body.password,
        email: req.body.email,
        Location_id: req.body.Location_id
    }
    let request = () => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT into Employee SET ?"
            db.query(sql, post, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
                console.log(results.affectedRows + ' row was affected')
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)
});

//get all employees
employeeRouter.get('/api/getEmployees', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT employee_name, email, employee_number, branch_name, address from Employee INNER JOIN Location ON Location.id = Employee.Location_id"
            db.query(sql, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }  
    request().then(content => {
        res.json(content)
    }).catch(next)
})

//get employee by Id
employeeRouter.get('/api/getEmployees/:id', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            let id = req.params.id;
            const sql = "SELECT employee_name, email, employee_id, branch_name, address from Employee INNER JOIN Location ON Location.id =Employee.Location_id WHERE Employee.id=?";
            db.query(sql, id, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)
})

//get all employees by Location
employeeRouter.get('/api/employee/location/location:id', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            let id = req.params.id;
            const sql = "SELECT employee_name, email, employee_number from Employee WHERE Location_id=?";
            // const sql = "SELECT employee_name, email, employee_number from Employee";
            db.query(sql, id, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    } 
    request().then(content => {
        res.json(content)
    }).catch(next)
})