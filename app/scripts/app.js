'use strict';

angular.module('kundestyrtApp', ['ng', 'ngResource', 'fgmt'])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    function serviceResolve(service, method) {
      return [service, function(s) {
        return s[method];
      }];
    }

    var f = {
      conversationList: {
        controller: 'ConversationListCtrl',
        templateUrl: 'views/conversation/list.html',
        resolve: {
          conversations: serviceResolve('Conversation', 'list')
        },
        context: {
          title: 'Conversations',
          right: {
            type: 'link',
            url: '/conversation/new',
            title: 'Compose'
          },
          action: {
            type: 'link',
            url: '/conversation/new',
            title: 'Compose'
          },
          left: {
            type: 'menu'
          }
        }
      },
      conversation: {
        controller: 'ConversationCtrl',
        templateUrl: 'views/conversation/main.html',
        resolve: {
          conversation: serviceResolve('Conversation', 'get')
        },
        context: ['conversation', function(conversation) {
          return {
            title: conversation.topic,
            action: {
              type: 'link',
              url: '/conversation/new',
              title: 'Compose'
            },
            left: {
              type: 'back',
              url: '/conversation',
              title: 'Conversations'
            }
          };
        }]
      },
      inquiryMessages: {
        controller: 'InquiryMessagesCtrl',
        templateUrl: 'views/conversation/messages.html',
        resolve: {
          conversation: serviceResolve('Conversation', 'get')
        },
        context: ['id', 'conversation', 'sub', '$scope', 'userFilter', '$q', '$rootScope', function(id, conversation, sub, $scope, userFilter, $q) {
          var ret = {};
          var userId = conversation.conversations[parseInt(sub, 10) - 1].recipient;
          $q.when(userFilter(userId)).then(function(user) {
            ret.title = user.name;
          });
          angular.extend(ret, {
            title: '',
            action: {
              type: 'link',
              url: '/conversation/new',
              title: 'Compose'
            },
            left: {
              type: 'back',
              url: '/conversation/' + id,
              title: conversation.topic
            }
          });
          return ret;
        }]
      },
      newConversation: {
        controller: 'NewConversationCtrl',
        templateUrl: 'views/conversation/new.html',
        resolve: {
          users: serviceResolve('Contacts', 'getUsers'),
          groups: serviceResolve('Groups', 'getGroups')
        },
        context: [function() {
          return {
            title: 'Ny samtale',
            left: {
              type: 'link',
              url: '/conversation/',
              title: 'Avbryt'
            },
            right: {
              type: 'action',
              title: 'Send',
              action: 'create()'
            },
            action: {
              type: 'action',
              title: 'Send',
              action: 'create()'
            }
          };
        }]
      },
      userList: {
        controller: 'UserListCtrl',
        templateUrl: 'views/user/list.html',
        resolve: {
          users: serviceResolve('Users', 'getUsers')
        }
      },
      user: {
        controller: 'UserCtrl',
        templateUrl: 'views/user/main.html',
        resolve: {
          user: serviceResolve('Users', 'getUser')
        }
      },
      userEdit: {
        controller: 'UserEditCtrl',
        templateUrl: 'views/user/edit.html',
        resolve: {
          user: serviceResolve('Users', 'getUser')
        }
      },
      userNew: {
        controller: 'UserNewCtrl',
        templateUrl: 'views/user/edit.html',
        resolve: {}
      },
      noteList: {
        controller: 'NoteListCtrl',
        templateUrl: 'views/note/list.html',
        resolve: {
          notes: serviceResolve('Notes', 'getNotes')
        },
        context: {
          title: 'Notater',
          right: {
            type: 'link',
            url: '/notes/new',
            title: 'Nytt notat'
          },
          action: {
            type: 'link',
            url: '/notes/new',
            title: 'Nytt notat'
          },
          left: {
            type: 'menu'
          }
        }
      },
      note: {
        controller: 'NoteCtrl',
        templateUrl: 'views/note/main.html',
        resolve: {
          note: serviceResolve('Notes', 'getNote')
        },
        context: ['note', function(note) {
          return {
            title: note.name,
            action: {
              type: 'link',
              url: '/notes/' + note._id + '/edit',
              title: 'Rediger'
            },
            right: {
              type: 'link',
              url: '/notes/' + note._id + '/edit',
              title: 'Rediger'
            },
            left: {
              type: 'back',
              url: '/notes',
              title: 'Notater'
            }
          };
        }]
      },
      noteEdit: {
        controller: 'NoteEditCtrl',
        templateUrl: 'views/note/edit.html',
        resolve: {
          note: serviceResolve('Notes', 'getNote')
        },
        context: {
          title: 'Rediger notat',
          right: {
            type: 'action',
            action: 'saveNote()',
            title: 'Lagre'
          },
          action: {
            type: 'action',
            action: 'saveNote()',
            title: 'Lagre'
          },
          left: {
            type: 'link',
            url: '/notes',
            title: 'Avbryt'
          }
        }
      },
      noteNew: {
        controller: 'NoteNewCtrl',
        templateUrl: 'views/note/edit.html',
        resolve: {},
        context: {
          title: 'Nytt notat',
          right: {
            type: 'action',
            action: 'saveNote()',
            title: 'Lagre'
          },
          action: {
            type: 'action',
            action: 'saveNote()',
            title: 'Lagre'
          },
          left: {
            type: 'link',
            url: '/notes',
            title: 'Avbryt'
          }
        }
      },
      groupList: {
        controller: 'GroupListCtrl',
        templateUrl: 'views/group/list.html',
        resolve: {
          groups: serviceResolve('Groups', 'getGroups')
        }
      },
      groupEdit: {
        controller: 'GroupEditCtrl',
        templateUrl: 'views/group/edit.html',
        resolve: {
          group: serviceResolve('Groups', 'getGroup'),
          users: serviceResolve('Contacts', 'getUsers')
        }
      },
      groupNew: {
        controller: 'GroupEditCtrl',
        templateUrl: 'views/group/edit.html',
        resolve: {
          group: function(){}, // no group
          users: serviceResolve('Contacts', 'getUsers')
        }
      },
      login: {
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        resolve: {}
      },
      password: {
        controller: 'UserEditPasswordCtrl',
        templateUrl: 'views/user/editPassword.html',
        resolve: {},
        context: {
          title: 'Endre passord',
          right: {
            type: 'action',
            action: 'editPassword()',
            title: 'Lagre'
          },
          action: {
            type: 'action',
            action: 'editPassword()',
            title: 'Lagre'
          },
          left: {
            type: 'link',
            url: '/',
            title: 'Avbryt'
          }
        }
      },
      unauthorized: {
        controller: 'LoginCtrl',
        templateUrl: 'views/unauthorized.html',
        resolve: {}
      }
    };

    $routeProvider
      .when('/', {
        redirectTo: '/conversation'
      })
      .when('/login', {
        auth: false,
        fragments: [f.login]
      })
      .when('/password', {
        auth: true,
        fragments: [f.password]
      })
      .when('/unauthorized', {
        auth: true,
        fragments: [f.unauthorized]
      })
      .when('/users', {
      auth: 'admin',
          fragments: [f.userList]
      })
      .when('/users/new', {
        auth: 'admin',
        fragments: [f.userList, f.userNew]
      })
      .when('/users/:id', {
        auth: 'admin',
        fragments: [f.userList, f.user]
      })
      .when('/users/:id/edit', {
        auth: 'admin',
        fragments: [f.userList, f.userEdit]
      })
      .when('/conversation', {
        auth: true,
        fragments: [f.conversationList]
      })
      .when('/conversation/new', {
        auth: true,
        fragments: [f.conversationList, f.newConversation]
      })
      .when('/conversation/:id', {
        auth: true,
        fragments: [f.conversationList, f.conversation]
      })
      .when('/conversation/:id/:sub', {
        auth: true,
        fragments: [f.conversationList, f.conversation, f.inquiryMessages]
      })
      .when('/notes', {
        auth: true,
        fragments: [f.noteList]
      })
      .when('/notes/new', {
        auth: 'admin',
        fragments: [f.noteList, f.noteNew]
      })
      .when('/notes/:id', {
        auth: true,
        fragments: [f.noteList, f.note]
      })
      .when('/notes/:id/edit', {
        auth: 'admin',
        fragments: [f.noteList, f.noteEdit]
      })
      .when('/groups', {
        auth: 'admin',
        fragments: [f.groupList]
      })
      .when('/groups/new', {
        auth: 'admin',
        fragments: [f.groupList, f.groupNew]
      })
      .when('/groups/:id', {
        auth: 'admin',
        fragments: [f.groupList, f.groupEdit]
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).run(['$rootScope', '$location', 'Account', function($rootScope, $location, Account) {
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

    var awaitingLogin = [];
    var returnPath = null;
    //$rootScope.$debug = function() {debugger;};
    $rootScope.$login = function(deferred) {
      if(deferred) { awaitingLogin.push(deferred); }
      if($location.path() !== '/login') {
        returnPath = $location.path();
        $location.path('/login');
      }
    };
    $rootScope.$login.$complete = function() {
      for(var i = 0, l = awaitingLogin.length; i < l; i++) {
        awaitingLogin[i].resolve(null);
      }
      awaitingLogin = [];
      if(returnPath !== null) { $location.path(returnPath); }
      else if($location.path() === '/login') { $location.path('/'); }
      returnPath = null;
    };

    $rootScope.$userPromise = Account.get();
    $rootScope.$userPromise.success(function(user) {
      $rootScope.$user = user;
      $rootScope.$login.$complete();
    });

    $rootScope.$alert = function(msg) {
      var alert = {
        message: msg,
        type: 'warning',
        destroy: function() {
          var index = $rootScope.$alert.items.indexOf(alert);
          $rootScope.$alert.items.splice(index, 1);
        }
      };

        if($rootScope.$alert.items.length >= 2) { // max to allerts på en gang
        $rootScope.$alert.items.shift();
      }
      $rootScope.$alert.items.push(alert);
    };
    $rootScope.$alert.items = [];
  }]).directive('inputGroupSingular', function() {
    return {
      restrict: 'C',
      link: function(scope, elm, ctrls) {
        /*jshint unused:false */
        elm.children().on('focus', function() {
          elm.addClass('focus');
        }).on('blur', function() {
          elm.removeClass('focus');
        });
      }
    };
  });

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