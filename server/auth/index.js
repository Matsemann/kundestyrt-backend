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
    }
];

module.exports = {
    login: login,
    oauth2: require('./oauth2')
};