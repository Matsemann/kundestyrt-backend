module.exports = function(server) {
    var connect = require('./db').connect;

    server.get('/api/users', function(request, response, next) {
        var db = connect();

        db.view('users', 'all', function(err, body) {
            if (err) {
                response.send(err);
            } else {
                response.send(body);
            }
        });
    });
};