module.exports = function(server) {
    var db = require('./db'),
        auth = require('./auth');

    function getUsers(request, response, next) {
        db.users.all(function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200, body);
                next();
            }
        });
    }

    function getMe(request, response, next) {
        response.send(200, request.user);
        next();
    }

    function returnUser(request, response, next) {
        return function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                body.password = '';
                response.send(200, body);
                next();
            }
        };
    }

    function getUser(request, response, next, id) {
        var id = id || request.params.id;
        db.users.find(id, returnUser(request, response, next));
    }

    function putUser(request, response, next) {
        //todo keep old values for pw and picture
        var current;
        if (request.params.id)
            current = db.users.find(request.params.id, function(err,body) {});


        var sentUser = request.params;
        var user = {
            '_id': request.params.id, // we want the ID from the url
            '_rev': sentUser._rev,
            'doc_type': 'user',
            'name': sentUser.name,
            'image': sentUser.image,
            'email': sentUser.email,
            'password': current.password,
            'role': sentUser.role
        };

        db.users.save(user, function(err, id) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                response.send(201, id);
                next();
            }
        });
    }

    function updatePassword(request, response, next) {
        var userId = request.user._id;
        var oldPw = request.params['old'],
            newPw = request.params['new']

        db.users.find(request.user._id, function(err, body) {
            oldPw = auth.hash(oldPw + body._id);
            newPw = auth.hash(newPw + body._id);

            if(oldPw !== body.password) {
                response.send(409, {
                    error: 'Wrong password entered.'
                }); // 409 = conflict
                next(false);
                return;
            }

            body.password = newPw;
            db.users.save(body, function(err) {
                if(err) {
                    response.send(err);
                    next(false);
                } else {
                    getUser(request, response, next, userId);
                }
            });
        });
    }

    server.get('/api/users', [
        auth.authorize(),
        getUsers
    ]);
    server.get('/api/users/me', [
        auth.authorize(),
        getMe
    ]);

    server.get('/api/users/:id', [
        auth.authorize(),
        getUser
    ]);

    server.post('/api/password', [
        auth.authorize(),
        updatePassword
    ]);

};