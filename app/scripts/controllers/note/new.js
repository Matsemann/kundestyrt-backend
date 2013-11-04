'use strict';

angular.module('kundestyrtApp')
    .controller('NoteNewCtrl', ['$scope', '$location', 'Notes', function ($scope, $location, Notes) {
        $scope.alert = '';

        $scope.note = {
            name: '',
            content: ''
        };

        $scope.saveNote = function() {
            if ($scope.note.name !== '' && $scope.note.content !== '') {
                Notes.save($scope.note).then(function(result) {
                    $location.path('/notes/' + result.data._id);
                });
                $scope.alert = '';
            } else {
                $scope.alert = 'Du må fylle i alle feltene.';
            }
        };
    }]);
