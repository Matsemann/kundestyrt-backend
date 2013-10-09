'use strict';

module.exports = function(connect) {
    function findByUsername(username, done) {
        var db = connect();

        db.view('users', 'by_email', {key: username}, function(err, body) {
            if (err) {
                done(err);
            } else if(body.total_rows === 0) {
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

    return {
        find: find,
        findByUsername: findByUsername
    };
};