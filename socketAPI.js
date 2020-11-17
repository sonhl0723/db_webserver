var socketAPI = {};
var socket_io = require('socket.io');
var io = socket_io();



io.on('connection', function (socket){
    socket.on('addcomplain',function (data){
        io.emit('addcomplain',data.complaintext);
    });
});





socketAPI.io = io;
module.exports = socketAPI;