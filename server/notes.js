module.exports = function(server) {
    var connect = require('./db').connect;
    var marked = require('marked');

    server.get('/api/notes', function(request, response, next) {
        var db = connect();

        db.view('notes', 'all', function(err, body) {
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

    server.get('/api/notes/:id', function(request, response, next) {
        var db = connect();

        marked.setOptions({
            breaks: true
        });

        db.get(request.params.id, function(err, body) {
            if (err) {
                response.send(err);
            } else {
                body.html = marked(body.content);
                response.send(body);
            }
        });
    });

    server.put('api/notes/:id', function(request, response, next) {
        var db = connect();
        console.log('trying to save note');

        var sentNote = request.params.note;
        var note = {
            "_id": sentNote._id,
            "_rev": sentNote._rev,
            "doc_type": "note",
            "name": sentNote.name,
            "content": sentNote.content
        };

        db.insert(note, function(err, body) {
            if (err) {
                response.send(err);
            } else {
                console.log('it worked');
                response.send(body);
            }
        })

    });
};