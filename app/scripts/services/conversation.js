'use strict';

(function(undefined) {
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