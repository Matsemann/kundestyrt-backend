module.exports = function(server) {
    var db = require('./db'),
        auth = require('./auth');

    function getGroups(request, response, next) {
        db.groups.all(function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200, body);
                next();
            }
        });
    }

    function getGroup(request, response, next, id) {
        var id = id || request.params.id;

        db.groups.find(id, function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200, body);
                next();
            }
        });
    }

    function putGroup(request, response, next) {
        var sentGroup = request.params;

        var group = {
            '_id': request.params.id, // we wan't the ID from the url
            '_rev': sentGroup._rev,
            'doc_type': 'group',
            'name': sentGroup.name,
            'members': sentGroup.members
        };

        db.groups.save(group, function(err, id) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                // return updated group
                getGroup(request, response, next, id);
                next();
            }
        });
    }

    function postGroup(request, response, next) {
        var sentGroup = request.params;
        var note = {
            'doc_type': "group",
            'name': sentGroup.name,
            'members': sentGroup.members
        };

        db.groups.save(note, function(err, id) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                response.send(201, {'id': id});
                next();
            }
        });
    }

    function deleteGroup(request, response, next) {
        var id = request.params.id;
        var rev = request.params.rev;

        db.notes.remove(id, rev, function(err, id) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200);
                next();
            }
        });
    }


    server.get('/api/groups', [
        auth.authorize(),
        getGroups
    ]);
    server.get('/api/groups/:id', [
        auth.authorize(),
        getGroup
    ]);
    server.put('/api/groups/:id', [
        auth.authorize("admin"),
        putGroup
    ]);
    server.post('/api/groups', [
        auth.authorize("admin"),
        postGroup
    ]);
    server.del('api/groups/:id/:rev', [
        auth.authorize("admin"),
        deleteGroup
    ]);
};