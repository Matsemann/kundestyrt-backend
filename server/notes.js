module.exports = function(server) {
    var db = require('./db');
    var marked = require('marked');

    server.get('/api/notes', function(request, response, next) {
        db.notes.all(function(err, body) {
            if (err) {
                response.send(err);
            } else {
                response.send(body);
            }
        });
    });

    server.get('/api/notes/:id', function(request, response, next) {
        marked.setOptions({
            breaks: true
        });

        db.notes.find(request.params.id, function(err, body) {
            if (err) {
                response.send(err);
            } else {
                body.html = marked(body.content);
                response.send(body);
            }
        });
    });

    server.put('api/notes/:id', function(request, response, next) {
        // var db = connect();
        // console.log('trying to save note');

        // var sentNote = request.params;
        // var note = {
        //     "_id": sentNote._id,
        //     "_rev": sentNote._rev,
        //     "doc_type": "note",
        //     "name": sentNote.name,
        //     "content": sentNote.content
        // };

        // db.insert(note, function(err, body) {
        //     if (err) {
        //         response.send(err);
        //     } else {
        //         console.log('it worked');
        //         response.send(body);
        //     }
        // });

        throw new Error('not implemented');
    });

    server.post('api/notes', function(request, response, next) {
        // var db = connect();
        // console.log('trying to save note');

        // var sentNote = request.params;
        // var note = {
        //     "doc_type": "note",
        //     "name": sentNote.name,
        //     "content": sentNote.content
        // };

        // db.insert(note, function(err, body) {
        //     if (err) {
        //         response.send(err);
        //     } else {
        //         console.log('it worked');
        //         response.setHeader('location', '/api/notes/' + body.id);
        //         response.send(201, body);
        //     }
        // });
        throw new Error('not implemented');
    });
};