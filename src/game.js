import { keyPress, key } from "./keyboard"
import Circle from "./geometries/Circle"
import Smile from "./Smile"
import Enemy from "./Enemy"
import Hero from "./Hero"
import hud from "./hud"
import { loadAudio, loadImage } from "./loaderAssets"

const FRAMES = 60
const smile = new Smile(300, 100, 20, 5, 'yellow')
const hero = new Hero(300, 100, 4, 82, 89, FRAMES)
const tangerines = [
    new Circle(200, 200, 10, 5, 'orange'),
    new Circle(400, 300, 10, 5, 'orange')
];
let enemies = Array.from({ length: 3 });
let ctx
let canvas
let gameover
let boundaries
let score
let anime
let backgroundImage
let tangerineImage

let scoreSound
let themeSound
let gameoverSound

const init = async () => {
	score = 0
	gameover = false

	console.log("Initialize Canvas")
	canvas = document.querySelector('canvas')
	ctx = canvas.getContext('2d')

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	hud(ctx, `Carregando... `, "#f00",canvas.height/2-50)
		

	scoreSound = await loadAudio('sounds/ka-ching.mp3')
	scoreSound.volume = .5
	gameoverSound = await loadAudio('sounds/game-over-retro-arcade-epic-stock-media-1-00-02.mp3')
	gameoverSound.volume = .5
	themeSound = await loadAudio('sounds/02.Hydrogen.mp3')
	themeSound.volume = .5
	themeSound.loop = true

	backgroundImage = await loadImage('img/street-view.png')
	tangerineImage = await loadImage('img/dollar.png')
	

	boundaries = {
		width: canvas.width,
		height: canvas.height
	}

	enemies = enemies.map(i => new Enemy(
		Math.random() * canvas.width,
		Math.random() * canvas.height, 10, 5)
	)
	
	tangerines.forEach(tangerine=>{
		tangerine.restart = () => {
		tangerine.x = tangerine.size + Math.random() * (boundaries.width - tangerine.size)
		tangerine.y = tangerine.size + Math.random() * (boundaries.height - tangerine.size)
		// debugger;
		}
	})

	keyPress(window)
	start()
}

const start = () =>{
	let startInterval = setInterval(()=>{
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		hud(ctx, `Pressione ENTER para começar!! `, "#0f0",canvas.height/2-50)
		console.log(key)
		if(key=='Enter'){
			themeSound.play()
			clearInterval(startInterval)
			loop()
		}
	},1000)
}

const loop = () => {
	setTimeout(() => {

		ctx.clearRect(0, 0, canvas.width, canvas.height)

		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
		
		tangerines.forEach(tangerines =>{
			tangerines.draw(ctx)
			if (smile.colide(tangerines) || hero.colide(tangerines)) {
				tangerines.restart()
				console.clear()
				scoreSound.play()
				console.count("DINHEIRO", ++score)
			}})
		// debugger

		hero.move(boundaries, key)
		hero.draw(ctx)

		enemies.forEach(e => {
			e.move(boundaries, 0)
			e.draw(ctx)
			gameover = !gameover
				? hero.colide(e)
				: true
		})

		if (gameover) {
			console.error('DEAD!!!')
			hud(ctx, `Dinheiro FINAL: $ ${score}00,00. GAME OVER !! `, "#f00")
			hud(ctx, `Pressione F5 para reiniciar!`, "#f00",canvas.height/2-50)
			gameoverSound.play()
			themeSound.pause()
			cancelAnimationFrame(anime)
		} else {
			hud(ctx, `Dinheiro: $ ${score}00,00`, "#0f0")
			anime = requestAnimationFrame(loop)
		}

	}, 1000 / FRAMES)
}

tangerines.draw = (ctx) => {
    const spriteWidth = tangerines.size * 4; 
    const spriteHeight = tangerines.size * 2; 
debugger
    ctx.drawImage(
        tangerineImage, 
        tangerines.x - spriteWidth / 2, 
        tangerines.y - spriteHeight / 2, 
        spriteWidth,
        spriteHeight  
    );
}
export { init }
