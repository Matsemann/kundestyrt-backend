'use strict';

(function() {
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

    angular.module('kundestyrtApp').factory('Conversation', [function() {
        return {
            get: function() {
                return conversations;
            }
        };
    }]);
})();