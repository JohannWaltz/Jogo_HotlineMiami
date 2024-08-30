const hud = (ctx,texto, color = "#00f",y=0, fontFamily = "'8bit Wonder', sans-serif")=>{
	let textSize = 14;
	ctx.font = `bold ${textSize}px ${fontFamily}`;
	ctx.textBaseline = "top";
	let textMetric = ctx.measureText(texto)
	ctx.fillStyle = color;
	ctx.fillText(texto,
		ctx.canvas.width / 2 - textMetric.width / 2,
		y)
}

export default hud