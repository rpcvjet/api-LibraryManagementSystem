const Member = require('../models').Member

module.exports = {
    create(req, res) {
        return Member.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                memberNumber: req.body.memberNumber,
                numberofBooks: req.body.numberofBooks

            })
            .then(location => res.status(200).send(location))
            .catch(error => res.status(400).send(error))
    },
    getAll(req, res) {
        return Member.findAll({
                model: Member,
        })
        .then(members => res.status(200).send(members))
        .catch(error => res.status(400).send(error))
    },
    updateMember(req,res) {
        return Member
        .find({
            where: {
                // locationId: req.params.locationId,
                id: req.params.id
            }
        }).then( member => {
            if(!member) {
                return res.status(404).send({
                    message: 'Member Not Found'
                })
            }
            return member
            .update(
                req.body,{fields: Object.keys(req.body)}
            )
            .then(updatedMember => res.status(200).send(updatedMember))
            .catch(error => res.status(400).send(error));

        })
    },
    delete(req,res) {
        return Member
        .find({
            where: {
                id:req.params.id
            },
        })
        .then(member => {
            if(!member) {
                return res.status(404).send({
                    message: 'Member Not Found!'
                })
            }
            return member
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
             .catch(error => res.status(400).send(error))
    }
}