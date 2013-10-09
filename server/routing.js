module.exports = function(server) {
    require('./users')(server);
    require('./groups')(server);
    require('./notes')(server);
    require('./conversations')(server);
};