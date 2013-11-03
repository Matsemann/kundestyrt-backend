'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationCtrl', ['$scope', 'conversation', 'Conversation', function ($scope, conversation, Conversation) {
        $scope.conversation = conversation;
        $scope.msg = {text: ''};

        scrollToBottom();

        $scope.send = function() {
            Conversation.send($scope.msg.text, conversation._id).then(function(c) {
                if(c) {
                    $scope.conversation = c;
                    $scope.msg.text = '';
                    scrollToBottom();
                }
            });
        };

        // Needs to wrapped inside a timeout so that it is put in the end of the event queue and happens after the DOM is updated
        function scrollToBottom()  {
            var fragment = jQuery('.fragment:last-child');

            function doScroll() {
                setTimeout(function() {
                    fragment.animate({scrollTop: fragment[0].scrollHeight});
                }, 100); // no idea why this should be 100...
            }

            doScroll();
        }
  }]);
