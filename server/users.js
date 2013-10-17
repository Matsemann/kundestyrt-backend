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

<!--
    server.get('/api/users/id', function(request, response, next) {
        db.users.all(function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200, body);
                next();
            }
        })
    })
-->

    server.get('/api/users/me', [
        auth.authorize(),
        function(request, response, next) {
            response.send(200, request.user);
            next();
        }
    ]);
};