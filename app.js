const express = require("express")
const app = express()
const http = require("http").createServer(app)
const socket = require("socket.io")(http)
const path = require("path")

app.use(express.static(path.join(__dirname, "dist")))

let game = {
    fruit: {x: Math.floor(Math.random() * (10 - 1) + 1), y: Math.floor(Math.random() * (10 - 1) + 1)},
    players: {}
}

socket.on('connection', (io) => {
    console.log("Uma nova conexão foi efetuada: " + io.id)
    game.players[io.id] = {x: 0, y: 0, points: 0}

    io.on("player_move", data => {
        switch (data.key) {
            case 'w':
                if(game.players[data.socket_id].y > 0) {
                    game.players[data.socket_id].y--
                }
                break;
            case 's':
                if(game.players[data.socket_id].y <= 8) {
                    game.players[data.socket_id].y++
                }
                break;

            case 'a':
                if(game.players[data.socket_id].x > 0) {
                    game.players[data.socket_id].x--
                }
                break;

            case 'd':
                if(game.players[data.socket_id].x <= 8) {
                    game.players[data.socket_id].x++
                }
                break;

            default:
                break;
        }
        if(game.players[data.socket_id].x === game.fruit.x && game.players[data.socket_id].y === game.fruit.y) {
            game.players[data.socket_id].points++
            game.fruit.x = Math.floor(Math.random() * (10 - 1) + 1)
            game.fruit.y = Math.floor(Math.random() * (10 - 1) + 1)
        }
        socket.emit("game_update", {game})
    })
    
    io.on("disconnect", (e) => {
        delete game.players[io.id]
        socket.emit("game_update", {game})
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/game.html")
})


http.listen(3333, () => {
    console.log("Servidor aberto e operando na porta 3333")
})