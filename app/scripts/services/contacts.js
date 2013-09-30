'use strict';

(function(undefined) {
    var users = [
        {
            name: 'Mats Svensson',
            image: 'd36f174888868d824d06274fb5c42a2a'
        },
        {
            name: 'Aleksander Heintz',
            image: '5a87311ea4c9950793397f01eb208830'
        },
        {
            name: 'Arne Mæhlum',
            image: '35ce9a8c755f680d319d6e7e1d1cde24'
        },
        {
            name: 'Henrik Hjelle',
            image: '11259f423fa3432de529992edbefe417'
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