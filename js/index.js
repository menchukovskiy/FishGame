
const canvas = document.querySelector('canvas') //Зона анимации
const ctx = canvas.getContext('2d') //Контекст

canvas.width = 300 //Ширина зоны анимации
canvas.height = 600 //Высота зоны анимации
const scoreBox = document.querySelector('#score')
const shotBox = document.querySelector('#shot')
let score = 0

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const keys = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    weapon: {
        pressed: false
    }
}

const gravity = 0.9
const waterGravity = 0.1

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/bg.png',
    size: {
        width: canvas.width,
        height: canvas.height,
        center: true
    }
})


const player = new Player({
    position: {
        x: canvas.width / 2,
        y: canvas.height * 0.4 + 8
    },
    skin: {
        width: 130,
        height: 60,
        speed: 5,
        style: 'red',
        img: './img/boat_demo.png',
    },
    velocity: {
        x: 0,
        y: 0
    },
    windowSize: {
        width: canvas.width,
        height: canvas.height,
    },
})

const weapon = new Weapon({
    weapon: {
        type: "dynamite",
        count: 20
    },
    ctx
})


const camera = {
    position: {
        x: 0,
        y: 0
    }
}

const countFish = 50
const fishes = []



for( let i = 0; i < countFish; i++ ){

    fishes.push( new Fish( {
        fish: 'sample',
        position: {
            x: randomInteger(-400,400),
            y: randomInteger(canvas.height * 0.5,canvas.height * 0.8) 
        },
        direction: randomInteger(0,1)
    } ) )

}



function animate() {
    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.save()

    background.update()
    ctx.restore()
    player.update()

    ctx.translate(camera.position.x, 0)

    player.velocity.x = 0

    player.move( { canvas, camera } )

    weapon.update( ctx )

    

    for( let i = 0; i < fishes.length; i++ ){

        const theFish = fishes[i]
        theFish.draw()
        
        if( theFish.status === 'die' ){
            if( Math.hypot(theFish.x - player.x,
                theFish.y - player.y) < player.width - theFish.width ){
                    fishes.splice(i, 1)
                    score += 10
                    scoreBox.innerHTML = score
                }
            
        }

        if( fishes.length <= countFish/2 ){
            for( let j = 0; j < countFish/2; j++ ){
                fishes.push( new Fish( {
                    fish: 'sample',
                    position: {
                        x: randomInteger(-400,400),
                        y: randomInteger(canvas.height * 0.5,canvas.height * 0.8) 
                    },
                    direction: randomInteger(0,1)
                } ) )
            }
            
        }

    }
    

}

animate()