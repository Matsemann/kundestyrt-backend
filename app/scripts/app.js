'use strict';

angular.module('kundestyrtApp', ['ng', 'ngResource', 'fgmt'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    function serviceResolve(service, method) {
      return [service, function(s) {
        return s[method];
      }];
    }

    var f = {
      conversationList: {
        controller: 'ConversationListCtrl',
        templateUrl: '/views/conversation/list.html',
        resolve: {
          conversations: serviceResolve('Conversation', 'list')
        }
      },
      conversation: {
        controller: 'ConversationCtrl',
        templateUrl: '/views/conversation/main.html',
        resolve: {
          conversation: serviceResolve('Conversation', 'get')
        }
      },
      inquiryMessages: {
        controller: 'InquiryMessagesCtrl',
        templateUrl: '/views/conversation/messages.html',
        resolve: {
          conversation: serviceResolve('Conversation', 'get')
        }
      },
      newConversation: {
        controller: 'NewConversationCtrl',
        templateUrl: '/views/conversation/new.html',
        resolve: {
          users: serviceResolve('Contacts', 'getUsers'),
          groups: serviceResolve('Contacts', 'getGroups')
        }
      }
    };

    $routeProvider
      .when('/', {
        redirectTo: '/conversation'
      })
      .when('/conversation', {
        fragments: [f.conversationList]
      })
      .when('/conversation/new', {
        fragments: [f.conversationList, f.newConversation]
      })
      .when('/conversation/:id', {
        fragments: [f.conversationList, f.conversation]
      })
      .when('/conversation/:id/:sub', {
        fragments: [f.conversationList, f.conversation, f.inquiryMessages]
      })
      .when('/notes', {
        templateUrl: '/views/notes.html',
        controller: 'NoteCtrl'
      })
      .when('/notes/:id', {
        templateUrl: '/views/notes.html',
        controller: 'NoteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$isActive = function(location) {
      if(location.substring(location.length - 1) === '%') {
        var start = location.substring(0, location.length - 1);
        return $location.path().substring(0, start.length) === start;
      }

      return location === $location.path();
    };

    $rootScope.$goTo = function(location) {
      $location.path(location);
    };
  }]);

if(!Date.prototype.toISOString) {
  (function() {
    function pad(number) {
      var r = String(number);
      if(r.length === 1) {
        r = '0' + r;
      }
      return r;
    }

    Date.prototype.toISOString = function() {
      return this.getUTCFullYear()
        + '-' + pad( this.getUTCMonth() + 1 )
        + '-' + pad( this.getUTCDate() )
        + 'T' + pad( this.getUTCHours() )
        + ':' + pad( this.getUTCMinutes() )
        + ':' + pad( this.getUTCSeconds() )
        + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
    };
  })();
}