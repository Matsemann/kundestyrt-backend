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

    // function returnUser(request, response, next) {
    //     return function(err, body) {
    //         if (err) {
    //             response.send(err);
    //             next(false);
    //         } else {
    //             body.password = '';
    //             response.send(200, body);
    //             next();
    //         }
    //     };
    // }

    function getUser(request, response, next, id, responseCode) {
        var id = id || request.params.id;
        var responseCode = responseCode || 200;

        db.users.find(id, function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                body.password = '';
                response.send(responseCode, body);
                next();
            }
        });
    }

    function addUser(request, response, next) {
        var sentUser = request.params;
        var user = {
            'doc_type': 'user',
            'name': sentUser.name,
            'email': sentUser.email,
            'password': sentUser.password
        };

        if (sentUser.role === 'null') {
            if (user.role)
                delete user.role;
        } else {
            user.role = sentUser.role;
        }
        // if (sentUser.admin) {
        //     user.role = 'admin';
        // } else if (user.role) {
        //     delete user.role;
        // }

        db.users.save(user, function(err, id) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                db.users.find(id, function(err, body) {
                    if(err) {
                        response.send(err);
                        next(false);

                        //TODO: delete user?
                    } else {
                        body.password = auth.hash(sentUser.password + id);
                        db.users.save(body, function(err, id) {
                            if(err) {
                                response.send(err);
                                next(false);
                            } else {
                                response.setHeader('Location', '/api/users/' + id);
                                getUser(request, response, next, id, 201);
                            }
                        });
                    }
                });
            }
        });
    }

    function putUser(request, response, next) {
        console.log('putUser in server');

        if (request.params.id) {
            db.users.find(request.params.id, function(err, body) {
                if (err) {
                    response.send(err);
                    next(false);
                } else {
                    var sentUser = request.params;
                    body.name = sentUser.name;
                    body.email = sentUser.email;

                    //only update password if a new password was actually set
                    if (sentUser.password)
                        body.password = auth.hash(sentUser.password + body._id);

                    //eliminate role field if role is null
                    if (sentUser.role === 'null') {
                        if (body.role)
                            delete body.role;
                    } else {
                        body.role = sentUser.role;
                    }

                    db.users.save(body, function(err, id) {
                        if(err) {
                            response.send(err);
                            next(false);
                        } else {
                            getUser(request, response, next, body._id);
                        }
                    });
                }
            });
        } else {
            response.send(404);
            next(false);
        }
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

    function deleteUser(request, response, next) {
        db.users.remove(request.params.id, request.params.rev, function(err, id) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200);
                next();
            }
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

    server.post('/api/users', [
        auth.authorize('admin'),
        addUser
    ]);

    server.put('/api/users/:id', [
        auth.authorize(),
        putUser
    ]);

    server.post('/api/password', [ //TODO is it POST????
        auth.authorize(),
        updatePassword
    ]);

    server.del('api/users/:id/:rev', [
        auth.authorize("admin"),
        deleteUser
    ]);

};