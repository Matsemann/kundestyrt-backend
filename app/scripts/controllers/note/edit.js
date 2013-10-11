'use strict';

angular.module('kundestyrtApp')
    .controller('NoteEditCtrl', ['$scope', '$location', 'note', 'Notes', function ($scope, $location, note, Notes) {
        $scope.note = note;

        $scope.saveNote = function() {
            Notes.save($scope.note).then(function() {
                $location.path('/notes/' + note._id);
            });
        };

        $scope.deleteNote = function() {
            Notes.delete($scope.note).then(function() {
                $location.path('/notes');
            });
        };
    }]);
