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

    angular.module('kundestyrtApp').factory('Conversation', ['$q', '$http', function($q, $http) {
        return {
            list: [function() {
                return $http.get('/api/conversations').then(function(xhr) {
                    return xhr.data.rows;
                });
            }],

            get: ['id', function(id) {
                return $http.get('/api/conversations/' + id).then(function(xhr) {
                    return xhr.data;
                });
            }],

            send: function(msg, id, sub) {
                var data = {content: msg};
                var url = '/api/conversations/' + id;
                if(sub) {
                    url += '/' + sub;
                }
                url += '/send';

                return $http.post(url, data).then(function(xhr) {
                    return xhr.data;
                });
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