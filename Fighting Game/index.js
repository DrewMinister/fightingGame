const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 1

const background = new Sprite ({
    position: {
        x: 0,
        y:0
    },
    imageSrc: './img/Background1.png',
    scale: 1
})

const shop = new Sprite ({
    position: {
        x: 650,
        y:128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
    x: 0, 
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157 
    },
    sprites: {
        idle: {
            imageSrc: './img/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/Run.png',
            framesMax: 8,
            image: new Image()
        }
    }
})

const enemy = new Fighter({
    position: {
    x: 400, 
    y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "green",
    offset: {
        x: 70,
        y:0
    },
    imageSrc: './enemy/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157 
    },
    sprites: {
        idle: {
            imageSrc: './enemy/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './enemy/Run.png',
            framesMax: 8,
            image: new Image()
        }
    }
})

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
    }

decreaseClock()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas. height)
    background.update()
    //shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    player.image = player.sprites.idle.image
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.image = player.sprites.run.image
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.image = player.sprites.run.image
    }

        //enemy movement
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x = -5
        } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x = 5
        }

  //collosion detection
  if (
    attackCollision({
        box1: player,
        box2: enemy
    }) &&
    player.isAttacking
    ) {
    player.isAttacking = false 
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  }      

  if (
    attackCollision({
        box1: enemy,
        box2: player
    }) &&
    enemy.isAttacking
    ) {
    enemy.isAttacking = false
    player.health -= 20
    document.querySelector('#playerHealth').style.width = player.health + '%' 
  }  

//end game when health hits 0
if (enemy.health <= 0 || player.health <= 0)
determineWinner({player, enemy, clockId})
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break 
        case ' ':
            player.attack()
            break      
        
        case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                enemy.velocity.y = -20
                break  
            case 'ArrowDown':
                enemy.attack()
                break
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        case 'w':
        keys.w.pressed = false
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
            case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
    console.log(event.key);
})