class Sprite {
	constructor({position, imageSrc, frameRate = 1, animation, frameBuffer, loop = true, autoPlay = true}) {
		this.position = position;
		this.image = new Image();
		this.image.onload = () => {
			this.loaded = true;
			this.width = this.image.width / this.frameRate;
			this.height = this.image.height;
		}
		
		this.frameRate = frameRate;
		this.image.src = imageSrc;
		this.loaded = false;
		this.currentFrame = 0;
		this.elapsedFrames = 0;
		this.frameBuffer = frameBuffer;
		this.animation = animation;
		this.loop = loop;
		this.autoPlay = autoPlay;
		if(this.animation) {
			for(let key in this.animation) {
				const image = new Image();
				image.src = this.animation[key].imageSrc;
				this.animation[key].image = image;
			}
		}
	}
	draw() {
		if(!this.loaded) return;
		const cropBox = {
			position: {
				x: this.width * this.currentFrame,
				y: 0
			},
			width: this.width,
			height: this.height
		}

		c.drawImage(
			this.image,
			cropBox.position.x, 
			cropBox.position.y, 
			cropBox.width,
			cropBox.height,
			this.position.x, 
			this.position.y,
			this.width,
			this.height);
		this.updateFrames();
	}
	play() {
		this.autoPlay = true;
	}
	scale() {
		console.log(this.image.width);
	}
	updateFrames() {
		if(!this.autoPlay) return;
		this.elapsedFrames++;
		if(this.elapsedFrames % this.frameBuffer === 0) {
			if(this.currentFrame < this.frameRate - 1) this.currentFrame++;
			else {
				if(this.loop) this.currentFrame = 0;
			}
		}
		
	}
}