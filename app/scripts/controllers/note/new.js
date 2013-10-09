'use strict';

angular.module('kundestyrtApp')
    .controller('NoteNewCtrl', ['$scope', '$location', 'Notes', function ($scope, $location, Notes) {
        $scope.note = {
            name: '',
            content: ''
        };

        $scope.saveNote = function() {
            Notes.save($scope.note).then(function(result) {
                $location.path('/notes/' + result.data.id);
            });
        };
    }]);
