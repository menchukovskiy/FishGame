class Fish {
    constructor( { fish, position, direction } ){
        this.x = position.x
        this.y = position.y
        this.image = new Image()
        this.image.src = fishType[fish].skin
        this.width = fishType[fish].size.width
        this.height = fishType[fish].size.height
        this.velocity = {
            x: 0,
            y: 0
        }
        this.frame = 4
        this.crop = 4
        this.currentFrame = 0
        this.frameBuffer = 30
        this.elapsedFrame = 0
        this.frameY = 0
        this.status = 'live'
        this.speed = fishType[fish].speed
        this.direction = direction
    }

    draw(){

        if( this.status === 'live' ){

            
            
            if( this.x < Math.floor( background.x ) + 250 ){
                this.direction = 1
            }

            if( this.x > Math.floor( background.resizeWidth * 0.5 + canvas.width * 0.5 ) - 250 ){
                this.direction = 0
            }


            if( this.direction ){
                //Движение в право
                this.x += this.speed
                this.frameY = 1
               
               
            } else {
                //Движение в лево
                this.x -= this.speed
                this.frameY = 0
            }
        }
        
        
        let up = 0
        weapon.bullets.forEach( (bullet) => {
            if( bullet.exp ){
                if( Math.hypot(this.x - bullet.x,
                    this.y - bullet.y) < bullet.radius ){
                        if( this.direction ){
                            this.frameY = 3
                        } else {
                            this.frameY = 2
                        }
                        
                        this.speed = 0
                        up = 0.1
                        this.status = "dead"
                    }
            }
        } )

        this.velocity.y += up

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frame),
                y: this.frameY * (this.image.height / this.frame)
            },
            width: this.image.width / this.frame ,
            height: this.image.height / this.frame
        }

        

        ctx.drawImage( 
            this.image, 
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.x, 
            this.y, 
            this.width, 
            this.height 
        )

        

        if( this.y + this.height/2 - 5 >= canvas.height * 0.4 ){
            this.y -= this.velocity.y
        } else {
            this.status = 'die'
        }

        

        this.elapsedFrame++
        if (this.elapsedFrame % this.frameBuffer === 0){
            if( this.currentFrame < this.frame - 1 ) this.currentFrame++
            else this.currentFrame = 0
        }
    }

}