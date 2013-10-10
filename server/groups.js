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

    server.get('/api/groups', getGroups)
};