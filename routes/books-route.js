'use strict';
const db = require('../config/db')
const Router = require('express').Router;
const BookRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();

//add a  new book to the library
BookRouter.post('/api/book/add', bodyParser, (req, res, next) => {
   
    const postAuthor = () => {
        return new Promise((resolve, reject) => {
            const author = {
                name: req.body.name
            }
            const sql = "INSERT INTO Author SET ?"
            db.query(sql, author, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
                console.log(results.affectedRows + ' row was affected')
            })
        })
    }

    const request = (results) => {
        const post = {
            ISBN: req.body.ISBN,
            title: req.body.title,
            genre: req.body.genre,
            volume: req.body.volume,
            edition: req.body.edition,
            publicationYear: req.body.publicationYear,
            Available: req.body.Available,
            Author_id: results.insertId,
            ShelfLocation_id: req.body.ShelfLocation_id
        }
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
    postAuthor()
        .then((results) => {
            return request(results)
        .then(content => {
            res.json('Success')
        })
        .catch(next)
    })
})

//get all books in library
BookRouter.get('/api/books/getAll', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT ISBN, title, genre, volume, edition, publicationYear, Available, Member_id, Shelf_name as Shelf, description as Shelf_description, name as Author from Book INNER JOIN Author ON Author.id = Book.Author_Id INNER JOIN ShelfLocation ON ShelfLocation.id = Book.ShelfLocation_Id"
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

//get all books by genre
BookRouter.get('/api/books/genre/:genre', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const genre = req.params.genre
            const sql = "SELECT ISBN, title, genre, volume, edition, publicationYear, Available, Shelf_name as Shelf, description as Shelf_description, name as Author from Book INNER JOIN Author ON Author.id = Book.Author_Id INNER JOIN ShelfLocation ON ShelfLocation.id = Book.ShelfLocation_Id WHERE genre = ?"
            db.query(sql, genre, (err, results) => {
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

//get a book by it's ISBN num
BookRouter.get('/api/books/isbn/:ISBN', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const ISBN = req.params.ISBN
            const sql = "SELECT ISBN, title, genre, volume, edition, publicationYear, Available, Shelf_name as Shelf, description as Shelf_description, name as Author from Book INNER JOIN Author ON Author.id = Book.Author_Id INNER JOIN ShelfLocation ON ShelfLocation.id = Book.ShelfLocation_Id WHERE ISBN = ?"
            db.query(sql, ISBN, (err, results) => {
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

//get a book by id
BookRouter.get('/api/books/:id', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const id = req.params.id
            const sql = "SELECT ISBN, title, genre, volume, edition, publicationYear, Available, Shelf_name as Shelf, description as Shelf_description, name as Author from Book INNER JOIN Author ON Author.id = Book.Author_Id INNER JOIN ShelfLocation ON ShelfLocation.id = Book.ShelfLocation_Id WHERE Book.id = ?"
            db.query(sql, id, (err, results) => {
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

//Checkout a book to a member
BookRouter.put('/api/book/checkout',bodyParser, (req, res, next) => {
    console.log(req.body)
    let request = () => {
        return new Promise((resolve, reject) => {
            const Update = [
                req.body.Member_id,
                req.body.Available,
                req.body.id
            ]
            const sql = "UPDATE Book SET Member_id = ?, Available = ? WHERE id =?"
            db.query(sql, Update, (err, result) => {
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)

})