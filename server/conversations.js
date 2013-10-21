module.exports = function(server) {
    var db = require('./db'),
        auth = require('./auth');

    function getConversation(request, response, next, id, responseCode) {
        var id = id || request.params.id;
        var responseCode = responseCode || 200;

        db.conversation.find(id, function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(responseCode, body);
                next();
            }
        });
    }

    function getConversationList(request, response, next) {
        db.conversation.forUser(request.user._id, function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                response.send(200, body);
                next();
            }
        });
    }

    function createConversation(request, response, next)
    {
        var sentConversation = request.params;

        console.log(sentConversation)

        next();
        // set variables

        // include the message as a new message by this user
    }

    function sendMessage(request, response, next) {
        var newMessage = {
            content: request.params.content,
            date: new Date().toISOString(),
            sender: request.user._id
        };

        appendAndSave(request.params.id, request.params.sub, newMessage, function(err) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                getConversation(request, response, next);
            }
        });
    }

    function appendAndSave(id, sub, msg, done) {
        db.conversation.find(id, function(err, body) {
            if(err) {
                done(err);
                return;
            }

            if(body.type === 1 && sub === undefined) {
                done(new Error("Can't have inquiry without a sub-id"));
                return;
            }

            if(body.type === 0 && sub !== undefined) {
                done(new Error("Can't have sub-id with normal conversation"));
                return;
            }

            if(sub === undefined) {
                body.messages.push(msg);
            } else {
                body.conversations[sub].messages.push(msg);
            }

            db.conversation.save(body, function(err, body) {
                if (err) {
                    done(err);
                } else {
                    done(null);
                }
            });
        });
    }

    server.get('/api/conversations', [
        auth.authorize(),
        getConversationList
    ]);

    server.get('/api/conversations/:id', [
        auth.authorize(),
        getConversation
    ]);

    server.post('/api/conversations', [
        auth.authorize(),
        createConversation
    ]);

    server.post('/api/conversations/:id/send', [
        auth.authorize(),
        sendMessage
    ]);

    server.post('/api/conversations/:id/:sub/send', [
        auth.authorize(),
        sendMessage
    ]);
};