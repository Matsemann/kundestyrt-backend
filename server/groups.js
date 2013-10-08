module.exports = function(server) {
    var connect = require('./db').connect;

    server.get('/api/groups', function(request, response, next) {
        var db = connect();

        db.view('groups', 'all', function(err, body) {
            if (err) {
                response.send(err);
            } else {
                response.send({
                    total_rows: body.total_rows,
                    offset: body.offset,
                    rows: body.rows.map(function(row) {
                        return row.value;
                    })
                });
            }
        });
    });
};