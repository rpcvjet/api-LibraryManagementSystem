'use strict';


module.exports = {

    create(req, res) {
        db.connection(function (err) {
            if (err) throw err;

            // const locationPost = function () {
                db.query(sql, function (err, result) {
                    if (err) throw err;
                })
                console.log('Number of affectedRow: ', result.affectedRows)
            // }
        })


    }


}