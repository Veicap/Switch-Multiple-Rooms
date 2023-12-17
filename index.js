const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = 64 * 16;
canvas.height = 64 * 9;
const parsedCollisions = collisionsLevel1.parsed2D();
const collisionBlocks = parsedCollisions.creatFrom2D();

const keys = {
	a: {
		pressed: false,
	},
	d: {
		pressed: false,
	}
}

const player = new Player({
	collisionBlocks,
	imageSrc: "./img/king/idle.png",
	frameRate: 11,
	animation: {
		idleRight: {
			frameRate: 11, 
			frameBuffer: 3,
			loop: true,
			imageSrc: "./img/king/idle.png",
		},
		idleLeft: {
			frameRate: 11, 
			frameBuffer: 3,
			loop: true,
			imageSrc: "./img/king/idleLeft.png",
		},
		runLeft: {
			frameRate: 8, 
			frameBuffer: 4,
			loop: true,
			imageSrc: "./img/king/runLeft.png",
		},
		runRight: {
			frameRate: 8, 
			frameBuffer: 4,
			loop: true,
			imageSrc: "./img/king/runRight.png",
		},
		enterDoor: {
			frameRate: 8,
			frameBuffer: 4,
			loop: false,
			imageSrc: "./img/king/enterDoor.png",
		}
	},
});
const doors = [
	new Sprite({
		position: {
			x: 765,
			y: 272,
		},
		imageSrc: "./img/doorOpen.png",
		frameRate: 5,
		frameBuffer: 5,
		loop: false,
		autoPlay: false,
	})
]
const backgroundLevel1 = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: "./img/backgroundLevel1.png"
})	


function animate() {
	backgroundLevel1.draw();
	//backgroundLevel1.scale();
	collisionBlocks.forEach(element => {
		element.draw();
	})
	doors.forEach(door => {
		door.draw();
	})
	player.update();
	player.draw();
	player.velocity.x = 0;
	player.handleInput(keys);
	requestAnimationFrame(animate);
}
animate();
