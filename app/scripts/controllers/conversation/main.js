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


        var maxScroll = 0;
        // Needs to wrapped inside a timeout so that it is put in the end of the event queue and happens after the DOM is updated
        function scrollToBottom()  {
            var fragment = jQuery('.fragment:last-child');

            function doScroll() {
                setTimeout(function() {
                    if (fragment[0].scrollHeight > maxScroll) {
                        maxScroll = fragment[0].scrollHeight;
                        fragment.animate({scrollTop: fragment[0].scrollHeight});
                    }
                }, 100); // no idea why this should be 100...
            }

            doScroll();
        }
        $scope.scrollToBottom = scrollToBottom;
  }]);
