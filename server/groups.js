module.exports = function(server) {
    var db = require('./db');

    server.get('/api/groups', function(request, response, next) {
        db.groups.all(function(err, body) {
            if (err) {
                response.send(err);
            } else {
                response.send(200, body);
                next();
            }
        });
    });
};