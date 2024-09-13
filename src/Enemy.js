import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets"; // Import the image loader

export default class Enemy extends Circle {
	constructor(x, y, size, speed = 10, color = "#ff3aef") {
		super(x, y, size, speed, color);
		
		// Load the sprite sheet image for the enemy
		loadImage('img/enemy.png').then(img => this.img = img);

		// Sprite sheet properties
		this.frameWidth = 36;  // Width of a single frame
		this.frameHeight = 40; // Height of a single frame
		this.spriteWidth = size * 4;  // Original width of one frame
		this.spriteHeight = size * 4; // Original height of one frame
		this.totalFrames = 4;        // Number of frames in the sprite sheet row
		this.currentFrame = 0;       // Current frame to be displayed
		this.frameSpeed = 10;        // Frame speed for animation (higher is slower)
		this.frameCounter = 0;       // Counter to control frame switching
		this.scale = 2;              // Scale factor for enlarging the sprite (adjust as needed)
	}

	// Override the draw method to render the sprite with animation and scaling
	draw(ctx) {
		if (this.img) { // Ensure the image is loaded
			const scaledWidth = this.spriteWidth * this.scale;  // Scaled width
			const scaledHeight = this.spriteHeight * this.scale; // Scaled height
			
			// Draw the sprite, ensuring correct positioning and scaling
			ctx.drawImage(
				this.img,
				this.currentFrame * this.spriteWidth, // Source x position for the current frame
				0, // Source y position (0 for single row)
				this.spriteWidth,
				this.spriteHeight,
				this.x - (scaledWidth / 2), // Center the sprite at the enemy's position
				this.y - (scaledHeight / 2),
				scaledWidth,  // Scaled width
				scaledHeight  // Scaled height
			);
		} else {
			// Fallback: If the image is not loaded, draw the default circle
			super.draw(ctx);
		}
	}

	move(limits, key) {
		this.y += this.speed;
		this.limits(limits);
		this.updateAnimation();
	}

	limits(limits) {
		if (this.y - this.size > limits.height + this.size) {
			this.y = -this.size;
			this.x = Math.random() * limits.width;
		}
	}

	// Update the animation frame
	updateAnimation() {
		this.frameCounter++;
		if (this.frameCounter >= this.frameSpeed) {
			this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
			this.frameCounter = 0;
		}
	}
	
	// Use the inherited `colide()` method from Circle for collision detection
	colide(other) {
		return super.colide(other);
	}
}


