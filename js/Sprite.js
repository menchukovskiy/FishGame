class Sprite {
    static center = false
    static x = 0
    constructor( { 
        position, 
        imageSrc,
        size } ){
            this.position = position
            this.image = new Image()
            this.image.src = imageSrc,
            this.width = size.width
            this.height = size.height
            this.resizeWidth = 0
            this.center = size.center
    }

    draw(){
        if( !this.image ) return
        this.resizeWidth = (this.image.width * this.height) / this.image.height
        if( this.center ){
            this.x = -this.resizeWidth * 0.5 + this.width * 0.5
        } else {
            this.x = this.position.x
        }
       
        ctx.drawImage( this.image, this.x, this.position.y, this.resizeWidth, this.height )
    }

    update(){
        this.draw()
    }
}