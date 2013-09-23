'use strict';

(function(undefined) {
    var conversations = [
        {
            _id: 1,
            topic: 'Møte i dag?',
            lastDate: '2013-09-23T08:43Z',
            unread: true
        },
        {
            _id: 2,
            topic: 'Lunch mandag',
            lastDate: '2013-09-20T10:42Z',
            unread: false
        }
    ];

    var messages = {
        1: [
            {
                _id: 1,
                sender: 'Aleksander Heintz',
                date: '2013-09-23T08:43Z',
                content: 'Dette er en test-melding, bare for å vise frem liksom :)',
                self: true
            },
            {
                _id: 1,
                sender: 'Aleksander Heintz',
                date: '2013-09-22T09:53Z',
                content: 'Dette er et svar, også bare for å teste litt.',
                self: false
            }
        ],

        2: [
            {
                _id: 3,
                sender: 'Aleksander Heintz',
                date: '2013-09-23T08:43Z',
                content: 'Dette er en test-melding, den er i sammtale 2',
                self: true
            },
            {
                _id: 4,
                sender: 'Aleksander Heintz',
                date: '2013-09-22T09:53Z',
                content: 'Dette er et svar i sammtale 2, også bare for å teste litt.',
                self: false
            }
        ]
    };

    angular.module('kundestyrtApp').factory('Conversation', [function() {
        return {
            get: function(id) {
                if(id === undefined) {
                    return conversations;
                } else {
                    return messages[id];
                }
            }
        };
    }]);
})();