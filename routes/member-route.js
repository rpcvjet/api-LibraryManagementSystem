'use stirct'

const memberController = require('../controllers/member-controller');

module.exports = (app) => {
    app.post('/api/member', memberController.create) //create a new member
    app.put('/api/member/:id', memberController.updateMember) //update a  member
    app.get('/api/member/all', memberController.getAll) //get all members
    app.delete('/api/member/delete/:id', memberController.delete) //delete one members
}