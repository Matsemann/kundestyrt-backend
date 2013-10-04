'use strict';

(function(undefined) {
    var conversations = [
        {
            _id: 1,
            topic: 'Møte i dag?',
            lastDate: '2013-09-23T08:43Z',
            unread: true,
            type: 0,
            image: '5a87311ea4c9950793397f01eb208830',
            messages: [
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-23T08:43Z',
                    content: 'Dette er en test-melding, bare for å vise frem liksom :)',
                    self: true
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-22T09:53Z',
                    content: 'Dette er et svar, også bare for å teste litt.',
                    self: false
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-23T08:43Z',
                    content: 'Dette er en test-melding, bare for å vise frem liksom :)',
                    self: true
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-22T09:53Z',
                    content: 'Dette er et svar, også bare for å teste litt.',
                    self: false
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-23T08:43Z',
                    content: 'Dette er en test-melding, bare for å vise frem liksom :)',
                    self: true
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-22T09:53Z',
                    content: 'Dette er et svar, også bare for å teste litt.',
                    self: false
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-23T08:43Z',
                    content: 'Dette er en test-melding, bare for å vise frem liksom :)',
                    self: true
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-22T09:53Z',
                    content: 'Dette er et svar, også bare for å teste litt.',
                    self: false
                }
            ]
        },
        {
            _id: 2,
            topic: 'Lunch mandag',
            lastDate: '2013-09-20T10:42Z',
            unread: false,
            type: 0,
            image: '5a87311ea4c9950793397f01eb208830',
            messages: [
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-23T08:43Z',
                    content: 'Dette er en test-melding, den er i sammtale 2',
                    self: true
                },
                {
                    sender: 'Aleksander Heintz',
                    date: '2013-09-22T09:53Z',
                    content: 'Dette er et svar i sammtale 2, også bare for å teste litt.',
                    self: false
                }
            ]
        },
        {
            _id: 3,
            topic: 'Klager',
            lastDate: '2013-08-20T10:42Z',
            unread: true,
            type: 1,
            image: '5a87311ea4c9950793397f01eb208830',
            inquiry: 'Noen klager ang. arbeidstider?',
            conversations: [
                {
                    recipent: 'Mats',
                    unread: true,
                    lastDate: '2013-08-20T10:42Z',
                    messages: [
                        {
                            sender: 'Aleksander Heintz',
                            date: '2013-09-23T08:43Z',
                            content: 'Dette er en test-melding, den er i sammtale 1',
                            self: true
                        },
                        {
                            sender: 'Aleksander Heintz',
                            date: '2013-09-22T09:53Z',
                            content: 'Dette er et svar i sammtale 1, også bare for å teste litt.',
                            self: false
                        }
                    ]
                },
                {
                    recipent: 'Arne',
                    unread: true,
                    lastDate: '2013-08-20T10:42Z',
                    messages: [
                        {
                            sender: 'Aleksander Heintz',
                            date: '2013-09-23T08:43Z',
                            content: 'Dette er en test-melding, den er i sammtale 2',
                            self: true
                        },
                        {
                            sender: 'Aleksander Heintz',
                            date: '2013-09-22T09:53Z',
                            content: 'Dette er et svar i sammtale 2, også bare for å teste litt.',
                            self: false
                        }
                    ]
                }
            ]
        }
    ];

    angular.module('kundestyrtApp').factory('Conversation', ['$q', function($q) {
        return {
            list: [function() {
                var deferred = $q.defer();
                deferred.resolve(conversations);
                return deferred.promise;
            }],

            get: ['id', function(id) {
                var deferred = $q.defer();
                var conversation;

                for(var i = 0, l = conversations.length; i < l; i++) {
                    if(conversations[i]._id.toString() === id) {
                        conversation = conversations[i];
                        break;
                    }
                }

                if(conversation === undefined) {
                    deferred.reject(function() {throw new Error('not found');});
                } else {
                    deferred.resolve(conversation);
                }
                return deferred.promise;
            }],

            send: function(id, sub, msg) {
                if(id === undefined) {
                    return;
                }

                var conversation;
                for(var i = 0, l = conversations.length; i < l; i++) {
                    if(conversations[i]._id.toString() === id) {
                        conversation = conversations[i];
                        break;
                    }
                }

                if(sub === -1) {
                    if(conversation.type !== 0) {
                        return;
                    }

                    conversation.messages.push({
                        sender: 'Aleksander Heintz',
                        date: new Date().toISOString(),
                        content: msg,
                        self: true
                    });
                } else {
                    var subConv = conversation.conversations[sub];
                    subConv.messages.push({
                        sender: 'Aleksander Heintz',
                        date: new Date().toISOString(),
                        content: msg,
                        self: true
                    });
                }
            },

            create: function(isInquiry, recipents, topic, inquiry) {
                var time = new Date().toISOString();

                var newConv;

                if(isInquiry) {
                    newConv = {
                        _id: conversations.length + 1,
                        topic: topic,
                        lastDate: time,
                        unread: false,
                        type: 1,
                        image: '',
                        inquiry: inquiry,
                        conversations: []
                    };

                    for(var i = 0, l = recipents.length; i < l; i++) {
                        newConv.conversations.push({
                            recipent: recipents[i].recipent.name,
                            unread: false,
                            lastDate: time,
                            messages: [
                                {
                                    sender: 'Aleksander Heintz',
                                    date: time,
                                    content: inquiry,
                                    self: true
                                }
                            ]
                        });
                    }
                } else {
                    newConv = {
                        _id: conversations.length + 1,
                        topic: topic,
                        lastDate: time,
                        unread: false,
                        type: 0,
                        image: '5a87311ea4c9950793397f01eb208830',
                        messages: []
                    };
                }

                conversations.unshift(newConv);
            }
        };
    }]);
})();