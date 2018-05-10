export default class Sprite {
	constructor(rows, cols, frameHeight, frameWidth, sheetSrc, frameRate)
	{
		this.rows = rows;
		this.cols = cols;
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.frames = [];
		this.currentFrame = 0;
		this.currentFrameRow = 0;
		this.sheet = new Image(sheetSrc);
		this.sheet.src = sheetSrc;
		this.initFrames();
		this.counter = 0;
		this.frameRate = frameRate;
		this.secondsPerFrame = frameRate / (rows * cols);
	}

	initFrames() {
		for(let i = 0; i < this.rows; i++) {
			this.frames.push([]);
			for(let j = 0; j < this.cols; j++) {
				this.frames[i].push({});
				this.frames[i][j].srcX = this.frameWidth * j;
				this.frames[i][j].srcY = this.frameHeight * i;
			}
		}
	}

	moveRight() {
		this.currentFrame = ++this.currentFrame % this.cols;

		if(this.currentFrameRow >= this.rows) {
			this.currentFrameRow = 0;
		}
	}

	moveLeft() {

	}

	stay() {
		this.currentFrame = 0;
	}

	updateFrame(context, x, y, direction) {
		if(this.counter > this.secondsPerFrame) {
			switch(direction) {
				case 'right':
					this.moveRight();
					break;
				default:
					this.stay();
					break;
			}
			context.clearRect(x, y, this.frameWidth, this.frameHeight);
			this.counter = 0;
		}
		this.counter++;
	}


	drawSprite(context, x, y, rotation, direction) {
		this.updateFrame(context, x, y, direction);
		context.drawImage(
			this.sheet,
			this.frames[this.currentFrameRow][this.currentFrame].srcX,
			this.frames[this.currentFrameRow][this.currentFrame].srcY,
			this.frameWidth,
			this.frameHeight,
			x,
			y,
			this.frameWidth,
			this.frameHeight
		);
	}
}
