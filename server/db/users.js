'use strict';

var connect = require('./connect');

function findByUsername(username, done) {
    var db = connect();

    db.view('users', 'by_email', {key: username}, function(err, body) {
        if (err) {
            done(err);
        } else if(body.rows.length === 0) {
            done(null, null);
        } else {
            console.log('got user: ' + body.rows[0].id);
            done(null, body.rows[0].value);
        }
    });
}

function find(id, done) {
    var db = connect();

    db.get(id, function(err, body) {
        if(err) {
            done(err);
        } else if(body.doc_type !== 'user') {
            done(new Error('doc not a user'));
        } else {
            done(null, body);
        }
    });
}

function all(done) {
    var db = connect();

    db.view('users', 'all', function(err, body) {
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

function save(user, done) {
    var db = connect();

    db.insert(user, function(err, body) {
        if (err) {
            done(err);
        } else {
            done(null, body.id);
        }
    });
}

module.exports = {
    find: find,
    findByUsername: findByUsername,
    all: all,
    save: save
};
