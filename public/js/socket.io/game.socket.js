

module.exports = {
    
    player_move: function(socket, key) {
        socket.emit("player_move", {
            socket_id: socket.id,
            key: key
        })
    }
}