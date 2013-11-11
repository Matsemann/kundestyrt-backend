module.exports = function(server) {
    var db = require('./db'),
        auth = require('./auth');

    function getConversation(request, response, next, id, responseCode) {
        var id = id || request.params.id;
        var responseCode = responseCode || 200;
        var userId = request.user._id;

        db.conversation.find(id, function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                var updated = false;
                
                if(body.type === 0 && !body.usersRead) {
                    body.usersRead = [];
                }

                // Add user requesting conversation to list of users that have read it
                if(body.type === 1) { // Inquiry
                    for(var i = 0, l = body.conversations.length; i < l; i++) {
                        var c = body.conversations[i];
                        if(c.recipient === userId) {
                            if(!c.usersRead) {
                                c.usersRead = [];
                            }

                            if(c.usersRead.indexOf(userId) === -1) {
                                c.usersRead.push(userId);
                                updated = true;
                            }
                            break;
                        }
                    }
                } else { // Normal conv
                    if (body.usersRead.indexOf(userId) === -1) {
                        body.usersRead.push(userId);
                        updated = true;
                    }
                }

                if (!updated) { // Send message
                    sendResult(null, body);
                } else { // Save update, then send
                    db.conversation.save(body, fetchNew);
                }
            }
        });

        function fetchNew(err, id) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                db.conversation.find(id, sendResult);
            }
        } 
 
        function sendResult(err, result) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                response.send(responseCode, fixInqueries(userId)(result));
                next();
            }
        }
    }

    function getConversationList(request, response, next) {
        db.conversation.forUser(request.user._id, function(err, body) {
            if (err) {
                response.send(err);
                next(false);
            } else {
                //body.rows = body.rows.map(fixInqueries(request.user._id));
                response.send(200, body);
                next();
            }
        });
    }

    function createConversation(request, response, next) {
        var i, l;

        var sentConversation = request.params;
        var sentFromUserId = request.user._id;

        // Create the conversation
        var conversation = {
            topic: sentConversation.topic,
            doc_type: 'conversation',
            type: sentConversation.inquiry ? 1 : 0,
            participants: [],
            usersRead: [sentFromUserId]
        };

        var firstMessage = {
            content: sentConversation.message,
            sender: sentFromUserId,
            date: new Date().toISOString()
        };

        if (conversation.type === 1) { // inquiry
            var userIds = [sentFromUserId];
            conversation.owner = sentFromUserId;
            conversation.conversations = [];

            // Add the selected users
            for (i = 0, l = sentConversation.recipients.users.length; i < l; i++) {
                var uId = sentConversation.recipients.users[i]._id;
                if(userIds.indexOf(uId) > -1) { continue; }
                userIds.push(uId);
            }

            // Add all users from the selected groups (make sure there aren't duplicates)
            db.groups.appendUserIds(userIds, sentConversation.recipients.groups.map(function(g) {
                return g._id;
            }), function(err) {
                if(err) {
                    response.send(err);
                    next(false);
                } else {
                    userIds.forEach(function(userId) {
                        conversation.participants.push({
                            _id: userId,
                            type: 'user'
                        });

                        if(userId !== sentFromUserId) {
                            conversation.conversations.push({
                                recipient: userId,
                                messages: [firstMessage]
                            });
                        }
                    });

                    save();
                }
            });

        } else { // group

            // Add the selected users
            for (i = 0; i < sentConversation.recipients.users.length; i++) {
                conversation.participants.push({
                    _id: sentConversation.recipients.users[i]._id,
                    type: "user"
                });
            }

            // Add the sender as a participant
            conversation.participants.push({
                _id: sentFromUserId,
                type: "user"
            });

            // And the groups
            for (i = 0; i < sentConversation.recipients.groups.length; i++) {
                conversation.participants.push({
                    _id: sentConversation.recipients.groups[i]._id,
                    type: "group"
                });
            }


            // Add the first message
            conversation.messages = [];
            conversation.messages.push(firstMessage);

            save();
        }


        function save(err) {
            if(err) {
                response.send(err);
                next(false);
            } else {
                db.conversation.save(conversation, function(err, id) {
                    if(err) {
                        response.send(err);
                        next(false);
                    } else {
                        response.send(201, {id: id});
                        next();
                    }
                });
            }
        }

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

    function appendAndSave(id, sub, msg, done, attempt) {
        if(attempt === undefined) { attempt = 0; }

        db.conversation.find(id, function(err, body) {
            if(err) {
                done(err);
                return;
            }

            if(body.type === 1 && sub === undefined && body.owner === msg.sender) {
                done(new Error("Can't have inquiry without a sub-id"));
                return;
            }

            if(body.type === 0 && sub !== undefined) {
                done(new Error("Can't have sub-id with normal conversation"));
                return;
            }

            if(body.type === 1 && sub === undefined) {
                // we have a response to an inquery sent from somebody else than the owner
                var userId = msg.sender;
                for(var i = 0, l = body.conversations.length; i < l; i++) {
                    if(body.conversations[i].recipient === userId) {
                        sub = i;
                        break;
                    }
                }

                if(sub === undefined) {
                    done(new Error("Can't find user in conversation-list"));
                    return;
                }
            }

            if(body.type === 1 && sub > body.conversations.length) {
                done(new Error("Invalid sub-id provided"));
                return;
            }

            if(sub === undefined) {
                body.messages.push(msg);
            } else {
                body.conversations[sub].messages.push(msg);
            }

            body.usersRead = [msg.sender];

            db.conversation.save(body, function(err, body) {
                if (err) {
                    if(attempt > 2) { // retry 3 times
                        done(err);
                    } else {
                        appendAndSave(id, sub, msg, done, attempt + 1);
                    }
                } else {
                    done(null);
                }
            });
        });
    }

    function fixInqueries(userId) {
        return function(conversation) {
            if(!conversation) { return null; }
            
            if(conversation.type === 1 && conversation.owner !== userId) {
                conversation.type = 0;
                conversation.participants = [
                    {_id: conversation.owner, type: 'user'},
                    {_id: userId, type: 'user'}
                ];
                for(var i = 0, l = conversation.conversations.length; i < l; i++) {
                    var c = conversation.conversations[i];
                    if(c.recipient === userId) {
                        conversation.messages = c.messages;
                        conversation.userRead = c.userRead;
                        break;
                    }
                }
                delete conversation.conversations;
            }
            return conversation;
        } 
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