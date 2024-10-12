window.addEventListener('keydown', ( event ) => {
    
    switch( event.keyCode ) {
        case 68: //Движение в право
        keys.right.pressed = true
        player.direction = 'right'
        break

        case 65: //Движение в лево 
        keys.left.pressed = true
        player.direction = 'left'
        break

        case 32: //Использовать оружие 
        keys.weapon.pressed = true
        weapon.shot = true
        
        break
    }

})

window.addEventListener('keyup', ( event ) => {

    
    switch( event.keyCode ) {
        case 68: //Движение в право
        keys.right.pressed = false
        player.direction = 'stop'
        break

        case 65: //Движение в лево 
        keys.left.pressed = false
        player.direction = 'stop'
        break

        case 32: //Использовать оружие 
        keys.weapon.pressed = false
        weapon.shot = false
        break
    }

})