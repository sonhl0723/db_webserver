let socket_io = require('socket.io');
let io = socket_io();
let socketAPI = {};


io.on('connection', function (socket){
    socket.on('addcomplain',function (data){
        io.emit('addcomplain',data.complaintext);
    });
});





socketAPI.io = io;
module.exports = socketAPI;