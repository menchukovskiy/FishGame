class Bullet {
    constructor( x, y, weight, damage, size, skin ){
        this.x = x
        this.y = y,
        this.weight = weight,
        this.damage = damage
        this.width = size.width
        this.height = size.height
        this.image = new Image()
        this.image.src = skin.weaponImg
        this.damageImage = new Image()
        this.damageImage.src = skin.damageImg
        this.frame = 4
        this.velocity = {
            x: 0,
            y: -1.8
        }
        this.currentFrame = 0
        this.frameBuffer = 5
        this.elapsedFrame = 0
        this.frameY = 1
        this.status = 0
        this.radius = size.radius * ( (canvas.height * 0.91) - (canvas.height * 0.35) )
        this.damageSetting = {
            width : size.damageWidth,
            height : size.damageHeight,
            frame : size.damageRate
        }
        this.exp = false
    }

    draw( ctx ){
       
        let imageBullet = this.image
        let imagePositionY = this.frameY * (imageBullet.height / 2)
        let imageBulletHeight = imageBullet.height / 2

        if( this.y + this.height <= (canvas.height * 0.4) ){
            this.y += (this.velocity.y * this.weight) * gravity;
            this.x += this.velocity.x
            //this.velocity.x += 0.09 * gravity
            this.frameY = 1
            
        } else {
            this.y += (this.velocity.y * this.weight) * waterGravity
            this.frameY = 0
        }


        if( this.y + this.height >= (canvas.height * 0.91) ){
            this.status = 0
            
            imageBullet = this.damageImage
            imageBulletHeight = imageBullet.height
            this.width = this.damageSetting.width
            this.height = this.damageSetting.height
            this.frame = this.damageSetting.frame
            imagePositionY = this.frameY * imageBullet.height
            this.velocity.y = 0
            this.frameBuffer = 3
            this.exp = true
        } else {
            this.velocity.y += 0.1
        }
        

        const crop = {
            position: {
                x: this.currentFrame * (imageBullet.width / this.frame),
                y: imagePositionY
            },
            width: imageBullet.width / this.frame ,
            height: imageBulletHeight
        }
        


        ctx.drawImage( 
            imageBullet, 
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.x, 
            this.y, 
            this.width, 
            this.height 
        )

        

        ctx.save();

        ctx.beginPath()


        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        //ctx.stroke()
        ctx.closePath()
        

        this.elapsedFrame++
        if (this.elapsedFrame % this.frameBuffer === 0){
            if( this.exp ){
                if( this.currentFrame < this.frame - 1 ){
                    this.currentFrame++
                } else {
                    this.currentFrame = 0
                    this.status = 1
                }
            } else {
                if( this.currentFrame < this.frame - 1 ) this.currentFrame++
                else this.currentFrame = 0
            }
           
        }
        
    }
}