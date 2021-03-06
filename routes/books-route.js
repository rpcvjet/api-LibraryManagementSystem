'use strict';
const db = require('../config/db')
const Router = require('express').Router;
const BookRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();
const circulation = require('../lib/libs');


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

BookRouter.get('/api/books/:search', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const search =  req.params.search
            const sql = "SELECT Books.id,title,isbn,genre,volume,edition,publicationyear, dateadded, name, description FROM Books INNER JOIN Author ON Author_id = Author.id WHERE concat(title, '', name, '', isbn, '') LIKE '%' ? '%' "
            db.query(sql, search, (err, results) => {
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
            const sql = "SELECT ISBN, title, genre, volume, edition, publicationYear, Available, Shelf_name as Shelf, description as Shelf_description, name as Author from Books INNER JOIN Author ON Author.id = Book.Author_Id INNER JOIN Shelf_Location ON Shelf_Location.id = Book.Shelf_Location_Id WHERE ISBN = ?"
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
BookRouter.get('/api/books/BookId/:id', (req, res, next) => {
    const request = () => {
        return new Promise((resolve, reject) => {
            const id = req.params.id
            const sql = "SELECT isbn, description, image, shelf_name, shelf_description, title, genre, volume, edition, publicationyear, available, Author.name as Author from Books INNER JOIN Author ON Author.id = Books.Author_Id INNER JOIN Shelf_Location ON Shelf_Location.id = Books.Shelf_Location_Id WHERE Books.id = ?"
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

    let request = () => {
        return new Promise((resolve, reject) => {
            //Updates must be arrays
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
    request().then((content) => {
        return circulation.circulationInsert(req.body.id, 2, req.body.Member_id)
    }).then(content => {
        res.json(content)
    }).catch(next)

})
//checkIN book to the library
BookRouter.put('/api/book/checkin',bodyParser, (req, res, next) => {
    const Available = true;
    const Member_id = null
    let request = () => {
        return new Promise((resolve, reject) => {
            const Update = [
                Member_id,
                Available,
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

//get all checked out books
BookRouter.get('/api/book/notavailable', (req, res, next) => {
    let request = () => {
        const available = false
        return new Promise((resolve, reject) => {  
            const sql = "SELECT title, ISBN,genre, volume, edition, publicationYear, name as Author from Book INNER JOIN Author ON Author_id = Author.id WHERE Available = ?"
            db.query(sql, available,(err, result) => {
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

//get all books that are available
BookRouter.get('/api/book/available', (req, res, next) => {
    let request = () => {
        const available = true
        return new Promise((resolve, reject) => {  
            const sql = "SELECT * from Book INNER JOIN ShelfLocation ON ShelfLocation.id = Book.ShelfLocation_id INNER JOIN Author ON Author_id = Author.id  WHERE Available = ?"
            db.query(sql, available,(err, result) => {
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