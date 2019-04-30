'use strict';
const db = require('../config/db')

module.exports = {
    circulationInsert(bookid, employeeid, Member_id) {

        return new Promise((resolve, reject) => {
            const post = {
                date: new Date().toISOString().slice(0, 10),
                Member_id: Member_id,
                Book_id: bookid,
                Employee_id: employeeid
            }
            const sql = "INSERT INTO Circulation SET ?"
            db.query(sql, post, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
                console.log(results.affectedRows + ' row was affected')
            })
        })
    }
}