module.exports = function(server) {
    var db = require('./db');

    server.get('/api/users', function(request, response, next) {
        db.users.all(function(err, body) {
            if (err) {
                response.send(err);
            } else {
                response.send(200, body);
                next();
            }
        });
    });
};