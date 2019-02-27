const shelfLocationController = require('../controllers/shelf-controller');

module.exports = (app) => {
    app.post('/api/shelf/add', shelfLocationController.create);
    app.get('/api/shelf', shelfLocationController.getAll);
    app.put('/api/shelf/update/:id', shelfLocationController.update);

}