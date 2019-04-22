const db = require('../config/db')
const Router = require('express').Router;
const ShelfRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();


ShelfRouter.post('/api/shelf/add', bodyParser, (req, res, next) => {

    const post = {Shelf_name: req.body.Shelf_name, description: req.body.description}

    const request = () => {   
        return new Promise((resolve, reject) => {
            const sql = "INSERT into ShelfLocation SET ?"
            db.query(sql, post, (err, results) => {
                if(err) {
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
        console.log(err)
        return err
    })
});
    
ShelfRouter.get('/api/shelf/getAll', (req, res, next) => {

    const request = () => {   
        return new Promise((resolve, reject) => {
            const sql = "SELECT * from ShelfLocation"
            db.query(sql, (err, results) => {
                if(err) {
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
        console.log(err)
        return err
    })
});

//get shelfLocation by Id
ShelfRouter.get('/api/shelf/:id', (req, res, next) => {

    const request = function() {   
        return new Promise((resolve, reject) => {
              let id = req.params.id;
            const sql = "SELECT * from ShelfLocation WHERE id=?"
            db.query(sql, id, (err, results) => {
                if(err) {
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
        console.log(err)
        return err
    })
});
