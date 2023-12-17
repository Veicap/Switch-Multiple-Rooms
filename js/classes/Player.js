class Player extends Sprite {
	constructor({collisionBlocks = [], imageSrc, frameRate, animation, loop}) {
		super({ imageSrc, frameRate, animation, loop })
		this.position = {
			x: 200,
			y: 200,
		}
		this.width = 100;
		this.height = 100;
		this.sides = {
			bottom: this.position.y + this.height,
		}
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.gravity = 3;
		this.collisionBlocks = collisionBlocks;
	}
	update() {
		//this is blue player
			/*c.fillStyle = 'blue';
			c.fillRect(this.position.x, this.position.y, this.width, this.height)*/
		this.position.x += this.velocity.x;
		this.updateHitBox()
		this.checkForHorizontalCollisions();
		this.applyGravity();
		this.updateHitBox();
		//c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
		this.checkForVerticleCollisions();
	}
	handleInput(keys) {
		if(this.preventInput) return;
		if(keys.d.pressed){
			this.switchSprite('runRight');
			this.velocity.x = 5;
			this.direction = 'right'
		} else if(keys.a.pressed){
			this.switchSprite('runLeft');
			this.direction = 'left'
			this.velocity.x = -5;
		} else {
			if(this.direction === 'left') this.switchSprite('idleLeft');
			else this.switchSprite('idleRight');
		}
	}
	switchSprite(name) {
		if(this.image === this.animation[name].image) return;
		this.currentFrame = 0;
		this.image = this.animation[name].image;
		this.frameRate = this.animation[name].frameRate;
		this.frameBuffer = this.animation[name].frameBuffer;
		this.loop = this.animation[name].loop
	}
	updateHitBox(){
		this.hitBox = {
			position: {
				x: this.position.x + 58,
				y: this.position.y + 38
			},
			width: 50,
			height: 50
		}
	} 
		//check verticle collisions
	checkForHorizontalCollisions() {
		for(let i = 0; i < this.collisionBlocks.length; i++) {
		const collisionBlock = this.collisionBlocks[i];
			if(
				this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
				this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
				this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
				this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height) {
				if(this.velocity.x < 0) {
					const offset = this.hitBox.position.x - this.position.x
					this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
					break;
				}
				if(this.velocity.x > 0) {
					const offset = this.hitBox.position.x - this.position.x + this.hitBox.width;
					this.position.x = collisionBlock.position.x - offset - 0.01;
					break;
				}
			}
		}
	}
	applyGravity() {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
	}
	checkForVerticleCollisions() {
		for(let i = 0; i < this.collisionBlocks.length; i++) {
		const collisionBlock = this.collisionBlocks[i];
			if(
				this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
				this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
				this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
				this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height) {
				if(this.velocity.y < 0) {
					this.velocity.y = 0;
					const offset = this.hitBox.position.y - this.position.y;
					this.position.y = collisionBlock.position.y + offset + 0.01;
					break;
				}
				if(this.velocity.y > 0) {
					this.velocity.y = 0;
					const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;
					this.position.y = collisionBlock.position.y - offset - 0.01;
					break;
				}
			}
		}
	}
}