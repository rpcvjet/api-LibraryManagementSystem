const Author = require('../models').Author


module.exports = {
    create(req, res) {
        return Author.create({
            name: req.body.name
            })
            .then(author => res.status(200).send(author))
            .catch(error => res.status(400).send(error))
    },
    getAll(req, res) {
        return Author.findAll({
                model: Author,
        })
        .then(author => res.status(200).send(author))
        .catch(error => res.status(400).send(error))
    },
    update(req,res) {
        return Author
        .find({
            where: {
                id: req.params.id
            }
        }).then( author => {
            if(!author) {
                return res.status(404).send({
                    message: 'Author Not Found'
                })
            }
            return author
            .update(
                req.body,{fields: Object.keys(req.body)}
            )
            .then(updatedauthor => res.status(200).send(updatedauthor))
            .catch(error => res.status(400).send(error));

        })
    },



}
