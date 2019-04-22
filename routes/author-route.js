const db = require('../config/db')
const Router = require('express').Router;
const authorRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();

//post a new author
authorRouter.post('/api/author/add', bodyParser, (req, res, next) => {
    const post = {
        name: req.body.name
    }
    const request = () => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT into Author SET ?"
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
    }).catch(err => {
        console.log('err', err)
    })
})

//get all the authors
authorRouter.get('/api/author/getAll', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * from Author"
            db.query(sql, (err, results) => {
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
    }).catch(err => {
        console.log('err', err)
    })
})

//get author by ID
authorRouter.get('/api/author/:id', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * from Author WHERE id=?"
            let id = req.params.id
            db.query(sql, id, (err, results) => {
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
    }).catch(err => {
        console.log('err', err)
    })
})