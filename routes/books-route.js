'use strict';
const db = require('../config/db')
const Router = require('express').Router;
const BookRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();

//create a book
BookRouter.post('/api/book/add', bodyParser, (req, res, next) => {

    const post = {
        ISBN: req.body.ISBN,
        title: req.body.title,
        genre: req.body.genre,
        volume: req.body.volume,
        edition: req.body.edition,
        publicationYear: req.body.publicationYear,
        Available: req.body.Available,
        Author_id: req.body.Author_id,
        ShelfLocation_id: req.body.ShelfLocation_id
    }

    const request = () => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT into Book SET ?"
            db.query(sql, post, (err, results) => {
                if (err) {
                    console.log('err', err)
                    reject(err)
                }
                resolve(results)
                console.log(results.affectedRows + ' row was affected')
            })
        })
    }
    request().then(content => {
        res.json('Success')
    }).catch(next)
})

//get all books
BookRouter.get('/api/books/getAll', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT ISBN, title, genre, volume, edition, publicationYear, Available, Shelf_name as Shelf, description as Shelf_description, name as Author from Book INNER JOIN Author ON Author.id = Book.Author_Id INNER JOIN ShelfLocation ON ShelfLocation.id = Book.ShelfLocation_Id"
            db.query(sql, (err, results) => {
                if (err) {
                    console.log('err', err)
                    reject(err)
                }
                resolve(results)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)
})