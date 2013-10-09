'use strict';

angular.module('kundestyrtApp')
    .controller('NoteCtrl', ['$scope', '$sce', 'note', function ($scope, $sce, note) {
        note.markdown = $sce.trustAsHtml(note.markdown);
        $scope.note = note;
    }]);
