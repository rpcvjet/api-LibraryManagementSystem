const Books = require('../models').Books


module.exports = {
    create(req, res) {
        return Books.create({
            isbn: req.body.isbn,
            title: req.body.title,
            genre: req.body.genre,
            volume: req.body.volume,
            edition: req.body.edition,
            publicationYear: req.body.publicationYear

            })
            .then(book => res.status(200).send(book))
            .catch(error => res.status(400).send(error))
    },
    getAll(req, res) {
        return Books.findAll({
                model: Books,
        })
        .then(books => res.status(200).send(books))
        .catch(error => res.status(400).send(error))
    },
    updateBook(req,res) {
        return Books
        .find({
            where: {
                id: req.params.id
            }
        }).then( book => {
            if(!book) {
                return res.status(404).send({
                    message: 'Book Not Found'
                })
            }
            return book
            .update(
                req.body,{fields: Object.keys(req.body)}
            )
            .then(updatedBook => res.status(200).send(updatedBook))
            .catch(error => res.status(400).send(error));

        })
    },
    delete(req,res) {
        return Books
        .find({
            where: {
                id:req.params.id
            },
        })
        .then(book => {
            if(!book) {
                return res.status(404).send({
                    message: 'Book Not Found!'
                })
            }
            return book
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
             .catch(error => res.status(400).send(error))
    }
}