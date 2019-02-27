const authorController = require('../controllers/author-controller');


module.exports = (app) => {
    app.post('/api/author/add', authorController.create);
    app.get('/api/author', authorController.getAll);
    app.put('/api/author/update/:id', authorController.update);
}