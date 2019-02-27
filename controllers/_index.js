const location = require('./location-controller');
const employee = require('./employee-controller');
const member = require('./member-controller');
const books = require('./books-controller');
const author = require('./author-controller');
const shelfLocation = require('./shelf-controller');
module.exports = {
    location,
    employee,
    member,
    books,
    author,
    shelfLocation
};