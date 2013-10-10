'use strict';

var connect = require('./connect');

function all(done) {
    var db = connect();

    db.view('groups', 'all', function(err, body) {
        if (err) {
            done(err);
        } else {
            done(null, {
                total_rows: body.total_rows,
                offset: body.offset,
                rows: body.rows.map(function(row) {
                    return row.value;
                })
            });
        }
    });
}

module.exports = {
    all: all
};
