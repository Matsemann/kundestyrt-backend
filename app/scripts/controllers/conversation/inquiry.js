'use strict';

angular.module('kundestyrtApp')
    .controller('InquiryMessagesCtrl', ['$scope', '$routeParams', 'conversation', 'Conversation', function ($scope, $routeValues, conversation, Conversation) {
        $scope.conversation = conversation.conversations[parseInt($routeValues.sub, 10) - 1];

        $scope.send = function() {
            Conversation.send($scope.msg.text, conversation._id, parseInt($routeValues.sub, 10) - 1).then(function(c) {
                if(c) {
                    $scope.conversation = c.conversations[parseInt($routeValues.sub, 10) - 1];
                    $scope.msg.text = '';
                    scrollToBottom();
                }
            });
        };

        scrollToBottom();

        // Needs to wrapped inside a timeout so that it is put in the end of the event queue and happens after the DOM is updated
        function scrollToBottom()  {
            var fragment = $('.fragment:last-child');

            function doScroll() {
                setTimeout(function() {
                    fragment.animate({scrollTop: fragment[0].scrollHeight});
                }, 100); // no idea why this should be 100...
            }

            doScroll();
        }
    }]);
