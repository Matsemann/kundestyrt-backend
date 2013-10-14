'use strict';

require('./auth');
var passport = require('passport');

var login = [
    function(request, response, next) {
        debugger;
        next();
    },
    passport.authenticate('local'),
    function(request, response, next) {
        console.log('Successful login');
        response.send(200);
        next();
    }
];

function authorize() {
    return function requestAuthorize(request, response, next) {
        if(!request.user) {
            response.send(401);
            next(false);
        }

        next();
    };
}

module.exports = {
    login: login,
    oauth2: require('./oauth2'),
    authorize: authorize
};