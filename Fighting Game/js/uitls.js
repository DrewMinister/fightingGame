function attackCollision({box1, box2}) {
    return (
    box1.attackBox.position.x + box1.attackBox.width >= box2.position.x &&
    box1.attackBox.position.x <= box2.position.x + box2.width &&
    box1.attackBox.position.y + box1.attackBox.height >= box2.position.y &&
    box1.attackBox.position.y <= box2.position.y + box2.height
) 
}

//determine winner
function determineWinner({player, enemy, clockId}) {
    clearTimeout(clockId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins!'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins!'
    }
}

let clock = 20
let clockId
function decreaseClock() {
    clockId = setTimeout(decreaseClock, 1000)
    if (clock > 0) {
        clock--
        document.querySelector('#clock').innerHTML = clock
    }

    if (clock === 0) {
        document.querySelector('#displayText').style.display = 'flex'
        determineWinner({player, enemy, clockId})
    }
}