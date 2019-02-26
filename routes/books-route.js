const booksController = require('../controllers/books-controller');


module.exports = (app) => {
    app.post('/api/books/add', booksController.create) //create a book
    app.get('/api/books', booksController.getAll) //get all books in database
    app.put('/api/books/update/:id', booksController.updateBook) //update a book in database
    app.delete('/api/books/delete/:id', booksController.delete) //delete a book in database
}