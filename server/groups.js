module.exports = function(server) {
    var db = require('./db');

    function getGroups(request, response, next) {
        db.groups.all(function(err, body) {
            if (err) {
                response.send(err);
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
            } else {
                response.send(201, {'id': id});
            }
        });
    }

    server.get('/api/groups', getGroups);
    server.get('/api/groups/:id', getGroup);
    server.put('/api/groups/:id', putGroup);
    server.post('/api/groups', postGroup);
};