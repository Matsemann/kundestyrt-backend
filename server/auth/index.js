'use strict';

require('./auth');
var passport = require('passport');

var login = [
    passport.authenticate('local'),
    function(request, response, next) {
        console.log('Successful login');
        response.send(200);
        next();
    }
];

function authorize(role) {
    return function requestAuthorize(request, response, next) {
        if(!request.user) {
            response.send(401);
            next(false);
            return;
        }

        if(role !== undefined && request.user.role !== role) {
            response.send(401);
            next(false);
            return;
        }

        next();
    };
}

module.exports = {
    login: login,
    oauth2: require('./oauth2'),
    authorize: authorize
};