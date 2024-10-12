class Player {
    padding = 40

    constructor({
        position,
        skin,
        velocity,
        windowSize
    }){
        this.position = position
        this.height = skin.height
        this.width = skin.width
        this.skin = skin.style
        this.x = this.position.x - this.width/2
        this.y =  this.position.y - this.height
        this.speed = skin.speed
        this.velocity = velocity
        this.windowSize = windowSize
        this.image = new Image()
        this.image.src = skin.img
        this.cameraBox = {
            width: windowSize.width,
            height: this.height,
            position: {
                x: this.x,
                y: this.y
            },
        },
        this.direction = 'stop',
        this.lastDirection = 'right'
        this.frame = 4
        this.crop = 4
        this.currentFrame = 0
        this.frameBuffer = 30
        this.elapsedFrame = 0
        this.frameY = 0
       
    }

    draw() {

        let resizeWidth = (this.image.width * this.frame * this.height) / this.image.height
        let resizeHeight = ( this.image.height * resizeWidth ) / this.image.width

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

        //ctx.fillStyle = this.skin
        //ctx.fillRect( this.x, this.y, this.width, this.height )
    }

    

    updateCameraBox(){
        this.cameraBox.position.x = this.x - ( (this.cameraBox.width/2) - (this.width/2) )
    }

    move( { canvas, camera } ){
        const playerBoxRightSide = this.x + this.width
        const playerBoxLeftSide = this.x 
        const widthGameZone = Math.floor( background.resizeWidth * 0.5 + canvas.width * 0.5 ) - this.padding
        const endGameZone = Math.floor( background.x ) + this.padding

        let rightSide = this.x + this.width * 0.5 + canvas.width * 0.5
        let leftSide = this.x - ( canvas.width * 0.5 - this.width * 0.5 )
        

        switch( this.direction ){
            case 'stop':
                if( this.lastDirection === 'right' ){
                    this.frameY = 0
                } else {
                    this.frameY = 1
                }
                camera.position.x = 0
            break;

            case 'right':
                this.lastDirection = "right"
                this.frameY = 2

                if( rightSide >= widthGameZone ) {
                    camera.position.x = 0
        
                    if( playerBoxRightSide >= widthGameZone - 15 ){
                        return
                    } else {
                        this.velocity.x = this.speed
                    }
                   
                }  else {
                    this.velocity.x = this.speed

                    if( leftSide <= endGameZone ){
                        camera.position.x = 0
                    } else {
                        camera.position.x = -this.velocity.x
                    }

                    
                    
                }
            break;

            case 'left':
                this.lastDirection = "left"
                this.frameY = 3
                if( leftSide <= endGameZone ){
                    camera.position.x = 0
                    if( playerBoxLeftSide <= endGameZone + 15  ){
                        return
                    } else {
                        this.velocity.x = -this.speed
                    }
                } else {
                    this.velocity.x = -this.speed

                    if( rightSide > widthGameZone ){
                        camera.position.x = 0
                    } else {
                        camera.position.x = -this.velocity.x
                    }
                }
                
                
            break;
        }

        

    }

    updateFrame(){
        this.elapsedFrame++
        if (this.elapsedFrame % this.frameBuffer === 0){
            if( this.currentFrame < this.frame - 1 ) this.currentFrame++
            else this.currentFrame = 0
        }
       
    }

    update() {
        
        this.draw()
        this.updateFrame()
        this.x += this.velocity.x 


    }


}