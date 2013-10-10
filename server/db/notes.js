'use strict';

var connect = require('./connect');

function find(id, done) {
    var db = connect();

    db.get(id, function(err, body) {
        if(err) {
            done(err);
        } else if(body.doc_type !== 'note') {
            done(new Error('doc not a note'));
        } else {
            done(null, body);
        }
    });
}

function all(done) {
    var db = connect();

    db.view('notes', 'all', function(err, body) {
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

function save(note, done) {
    var db = connect();
    
    db.insert(note, function(err, body) {
        if (err) {
            done(err);
        } else {
            done(null, body.id);
        }
    });
}

module.exports = {
    find: find,
    all: all,
    save: save
};
