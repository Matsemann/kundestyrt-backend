'use strict';

angular.module('kundestyrtApp')
    .controller('NoteEditCtrl', ['$scope', '$location', 'note', 'Notes', function ($scope, $location, note, Notes) {
        $scope.note = note;
        $scope.alert = '';

        $scope.saveNote = function() {
            if ($scope.note.name !== '' && $scope.note.content !== '') {
                Notes.save($scope.note).then(function() {
                    $location.path('/notes/' + $scope.note._id);
                });
                $scope.alert = '';
            } else {
                $scope.alert = 'Du må fylle i alle feltene.';
            }
        };

        $scope.deleteNote = function() {
            if (confirm('Er du sikker på at du vil slette dette notatet?')) {
                Notes.delete($scope.note).then(function() {
                    $location.path('/notes');
                });
            }
        };
    }]);
