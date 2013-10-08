module.exports = function(server) {
    require('./users')(server);
    require('./groups')(server);
};