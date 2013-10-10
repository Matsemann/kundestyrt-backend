'use strict';

var nano = require('nano');

function connect() {
    var username = "weldeciestsequierysomedw";
    var password = "MyFlBPu7hgFfnkJfkKeFBVUX";
    var dbName   = "defero.cloudant.com/db";
    var dbString = 'https://' + username + ":" + password + "@" + dbName;

    return nano(dbString);
}

module.exports = connect;