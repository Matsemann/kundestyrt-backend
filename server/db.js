(function(exports) {
    function connect() {
        var username = "weldeciestsequierysomedw";
        var password = "MyFlBPu7hgFfnkJfkKeFBVUX";
        var dbName   = "defero.cloudant.com/db";
        var dbString = 'https://' + username + ":" + password + "@" + dbName;

        return require('nano')(dbString);
    }


    exports.connect = connect;
})(module.exports = {});