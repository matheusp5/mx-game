const socket_game = require("./socket.io/game.socket")
const socket = io()

let game = {}
socket.on('game_update', data => {
    
    game = data.game

    const lista = document.querySelector('#players');
    lista.innerHTML = ""
    for(let player in game.players) {
        const novoItem = document.createElement('li');
        if(player === socket.id) {
            novoItem.textContent = `${player} (You): ${game.players[player].points}`;
        } else {
            novoItem.textContent = `${player}: ${game.players[player].points}`;
        }

        lista.appendChild(novoItem);
    }
    
})

$("body").keydown(e => {
    socket_game.player_move(socket, e.key)
})

function renderScreen() {
    const screen = document.querySelector("#screen")
    const context = screen.getContext("2d")
    
    context.fillStyle = 'white'
    context.fillRect(0, 0, 500, 500)
    
    for (player in game.players) {
        var color = ""
        if (player === socket.id) {
            color = 'green'
        } else {
            color = 'red'
        }
        const x = game.players[player].x * 50;
        const y = game.players[player].y * 50
        const width = 50
        const height = 50

        context.fillStyle = color
        context.fillRect(x, y, width, height)
    }
    
    if(game.fruit !== undefined) {

        context.fillStyle = 'blue'
        context.fillRect(game.fruit.x * 50, game.fruit.y * 50, 50, 50)
    }

    requestAnimationFrame(renderScreen)
}

renderScreen()