export default class Sprite {
	constructor(rows, cols, frameHeight, frameWidth, sheetSrc)
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

	updateFrame(context, x, y) {
		this.currentFrame = ++this.currentFrame % this.cols;

		if(this.currentFrameRow >= this.rows) {
			this.currentFrameRow = 0;
		}
		context.clearRect(x, y, this.frameWidth, this.frameHeight);
	}


	drawSprite(context, x, y, rotation) {
		this.updateFrame(context, x, y);
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
