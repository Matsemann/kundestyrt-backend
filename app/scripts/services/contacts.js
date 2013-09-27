'use strict';

(function(undefined) {
    var users = [
        {
            name: 'Mats',
            image: 'd36f174888868d824d06274fb5c42a2a'
        },
        {
            name: 'Aleksander Heintz',
            image: '5a87311ea4c9950793397f01eb208830'
        }

    ];

    var groups = [];

    angular.module('kundestyrtApp').factory('Contacts', [function() {
        return {
            getUsers: function() {
                return users;
            },

            getGroups: function() {
                return groups;
            }
        };
    }]);
})();