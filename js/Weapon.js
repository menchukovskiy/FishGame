class Weapon {
    constructor( { weapon, canvas } ){
        this.type = weapon.type
        this.count = weapon.count
        this.skin = weapotType[this.type].skin
        this.damage = weapotType[this.type].damage
        this.weight = weapotType[this.type].weight
        this.shot = false
        this.state = false //выстрела нет
        this.bullets = []
        this.position = {
            x: player.x,
            y: player.y
        }
        this.size = weapotType[this.type].size
        this.countShot = 0
        
    }

    draw(ctx){
        
        for( let i = 0; i < this.bullets.length; i++ ){
            if( !this.bullets[i].status ){
                this.bullets[i].draw(ctx);
            } else {
                this.bullets.splice(i,1)
            }
        }
/*
        this.bullets.forEach( (bullet) => {
            if( !bullet.status ){
                bullet.draw(ctx);
            }
           
        } )
            */
    }

    shoot() {
        this.state = true
        if( this.count  ){
            this.bullets.push( new Bullet( player.x + player.width/2, player.y, this.weight, this.damage, this.size, this.skin  ) )
            this.count--
        } else {
            return
        }
    }


    update( ctx ){
        shotBox.innerHTML = this.count
        if( this.shot && !this.state ){
            this.shoot()
        } 
        
        if(!this.shot) this.state = false

        this.draw( ctx )

        
    }

}