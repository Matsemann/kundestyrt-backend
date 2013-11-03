'use strict';

var connect = require('./connect');

function find(id, done) {
    var db = connect();

    db.get(id, function(err, body) {
        if(err) {
            done(err);
        } else if(body.doc_type !== 'group') {
            done(new Error('doc not a note'));
        } else {
            done(null, body);
        }
    });
}


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

function save(group, done) {
    var db = connect();

    db.insert(group, function(err, body) {
        if (err) {
            done(err);
        } else {
            done(null, body.id);
        }
    });
}

function remove(id, rev, done) {
    var db = connect();

    db.destroy(id, rev, function(err, body) {
        if (err) {
            done(err);
        } else {
            done(null, body);
        }
    });
}

function forUser(userId, done) {
    var db = connect();

    db.view('groups', 'for_user', {key: userId}, function(err, body) {
        if(err) {
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

function appendUserIds(userIds, groupIds, done) {
    var db = connect();

    db.view_with_list('groups', 'user_ids', 'no_duplicates', {keys: groupIds}, function(err, body) {
        if(err) {
            done(err);
        } else {
            body.forEach(function(uid) {
                if(userIds.indexOf(uid) < 0) {
                    userIds.push(uid);
                }
            });

            done(null);
        }
    });
}


module.exports = {
    all: all,
    find: find,
    save: save,
    remove: remove,
    forUser: forUser,
    appendUserIds: appendUserIds
};
