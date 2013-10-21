module.exports = function(server) {
    var db = require('./db'),
        auth = require('./auth');

    server.get('/api/users', function(request, response, next) {
        db.users.all(function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200, body);
                next();
            }
        });
    });

    server.get('/api/users/me', [
        auth.authorize(),
        function(request, response, next) {
            response.send(200, request.user);
            next();
        }
    ]);

    function getUser(request, response, next) {
        db.users.find(request.params.id, function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                body.password = '';
                response.send(200, body);
                next();
            }
        })
    }

    function putUser(request, response, next) {
        //todo keep old values for pw and picture

        var sentUser = request.params;
        var user = {
            '_id': request.params.id, // we want the ID from the url
            '_rev': sentUser._rev,
            'doc_type': 'user',
            'name': sentUser.name,
            'email': sentUser.email
        };

        db.users.save(user, function(err, id) {
            if(err) {
                response.send(err);
            } else {
                response.send(201, id);
                next();
            }
        });
    }

    server.get('/api/users/:id', getUser);
    server.put('/api/users/:id', putUser);

};