'use strict';

angular.module('kundestyrtApp')
    .controller('NoteCtrl', ['$scope', '$sce', 'note', function ($scope, $sce, note) {
        // Tell Angular that this html is safe and can be rendered
        note.html = $sce.trustAsHtml(note.html);

        $scope.note = note;
    }]);
