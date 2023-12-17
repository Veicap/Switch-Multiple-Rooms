window.addEventListener('keydown', function(e) {
	if(player.preventInput) return;
	switch(e.key) {
	case 'w':	
		for(let i = 0 ; i < doors.length; i++) {
			const door = doors[i];
			if(
				player.hitBox.position.x + player.hitBox.width <= door.position.x + door.width &&
				player.hitBox.position.x >= door.position.x &&
				player.hitBox.position.y + player.hitBox.height >= door.position.y &&
				player.hitBox.position.y <= door.position.y + door.height) {
				console.log('we are detecting');
				player.velocity.x = 0;
				player.velocity.y = 0;
				player.switchSprite('enterDoor')
				player.preventInput = true
				door.play()
				return;
			}
		}
		if(player.velocity.y === 0) player.velocity.y = -30;
		break;
	case 'a':
		keys.a.pressed = true;
		break;
	case 'd':
		keys.d.pressed = true;
		break;	
	}
})

window.addEventListener('keyup', function(e) {
	switch(e.key) {
	case 'a':
		keys.a.pressed = false;
		break;
	case 'd':
		keys.d.pressed = false;
		break;	
	}
})