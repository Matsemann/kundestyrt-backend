'use strict';

var connect = require('./connect'),
    groups = require('./groups');

function find(id, done) {
    var db = connect();

    db.get(id, function(err, body) {
        if(err) {
            done(err);
        } else if(body.doc_type !== 'conversation') {
            done(new Error('doc not a conversation'));
        } else {
            done(null, body);
        }
    });
}

function forUser(userId, done) {
    var db = connect();

    db.view('groups', 'for_user', {key: userId}, function(err, body) {
        if (err) {
            done(err);
        } else {
            var groups = body.rows.map(function(row) {
                return row.value;
            });

            var userGroups = [];
            groups.forEach(function(g) {
                if(g.members.indexOf(userId) !== -1) {
                    userGroups.push(g._id);
                }
            });
            userGroups.unshift(userId);

            db.view_with_list('conversations', 'by_user', 'no_duplicates', {keys: userGroups}, function(err, body) {
                if(err) {
                    done(err);
                } else {
                    done(null, {
                        total_rows: -1,
                        offset: -1,
                        rows: body
                    });
                }
            });
        }
    });
}

function save(conversation, done) {
    var db = connect();
    
    db.insert(conversation, function(err, body) {
        if (err) {
            done(err);
        } else {
            done(null, body.id);
        }
    });
}


module.exports = {
    find: find,
    forUser: forUser,
    save: save
};
