import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Enemy extends Circle {
	constructor(x, y, size, speed = 10, color = "#ff3aef") {
		super(x, y, size, speed, color);
		
		// Carrega a imagem da sprite sheet do inimigo
		loadImage('img/enemy.png').then(img => this.img = img);

		// Propriedades da sprite sheet
		this.frameWidth = 36;  // Largura de um único quadro
		this.frameHeight = 40; // Altura de um único quadro
		this.spriteWidth = size * 4;  // Largura de um único quadro original
		this.spriteHeight = size * 4; // Altura de um único quadro original
		this.totalFrames = 4;        // Total de quadros na linha
		this.currentFrame = 0;       // Índice do quadro atual
		this.frameSpeed = 10;        // Controla a velocidade de mudança de quadros (maior = mais lento)
		this.frameCounter = 0;       // Para controlar a velocidade de troca de quadros
		this.scale = 2;              // Fator de escala para aumentar o tamanho do inimigo
	}

	// Override the draw method to render the sprite with animation and scaling
	draw(ctx) {
		if (this.img) { // Garante que a imagem foi carregada
			const scaledWidth = this.frameWidth * this.scale;   // Escala a largura do quadro
			const scaledHeight = this.frameHeight * this.scale; // Escala a altura do quadro
	
			// Ajusta as coordenadas para centralizar corretamente a sprite
			const offsetX = scaledWidth / 2;
			const offsetY = scaledHeight / 2;
	
			// Desenha a sprite
			ctx.drawImage(
				this.img,
				this.currentFrame * this.frameWidth, // Origem X: pega o quadro correto da sprite sheet
				0, // Origem Y: assumindo que as sprites estão em uma única linha
				this.frameWidth,  // Largura da origem: largura de um quadro
				this.frameHeight, // Altura da origem: altura de um quadro
				this.x - offsetX, // Destino X: centraliza a imagem na posição do inimigo
				this.y - offsetY, // Destino Y: centraliza a imagem na posição do inimigo
				scaledWidth,  // Largura do destino: aplica a escala
				scaledHeight  // Altura do destino: aplica a escala
			);
		} else {
			// Se a imagem não foi carregada, desenha um círculo como fallback
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

	// Atualiza o quadro de animação
	updateAnimation() {
		this.frameCounter++;
		if (this.frameCounter >= this.frameSpeed) {
			this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
			this.frameCounter = 0;
		}
	}
	
	// Usa o método herdado de colide da classe Circle para detecção de colisão
	colide(other) {
		return super.colide(other);
	}
}


