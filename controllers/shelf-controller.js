const shelfLocation = require('../models').shelfLocation;

module.exports = {
    create(req, res) {
        return shelfLocation.create({
            name: req.body.name,
            description: req.body.description
            })
            .then(shelfLocation => res.status(200).send(shelfLocation))
            .catch(error => res.status(400).send(error))
    },
    getAll(req, res) {
        return shelfLocation.findAll({
                model: shelfLocation,
        })
        .then(shelfLocation => res.status(200).send(shelfLocation))
        .catch(error => res.status(400).send(error))
    },
    update(req,res) {
        return shelfLocation
        .find({
            where: {
                id: req.params.id
            }
        }).then( shelf => {
            if(!shelf) {
                return res.status(404).send({
                    message: 'Author Not Found'
                })
            }
            return shelf
            .update(
                req.body,{fields: Object.keys(req.body)}
            )
            .then(shelf => res.status(200).send(shelf))
            .catch(error => res.status(400).send(error));

        })
    },

}
