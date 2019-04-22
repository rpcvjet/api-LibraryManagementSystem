'use strict';
const db = require('../config/db')
const Router = require('express').Router;
const locationRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();


//post a location
locationRouter.post('/api/location', bodyParser, function (req, res, next) {
    const post = {
        branch_name: req.body.branch_name,
        address: req.body.address
    }
    let request = () => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT into Location SET ?"
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
})
//get all locations
locationRouter.get('/api/getLocations', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * from Location"
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