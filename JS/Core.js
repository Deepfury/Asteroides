var nave;
var asteroides = [];
var canvas;
var lasers = [];
var puntaje=0;


function setup(){
	var i;

	// posicionando las canvas
	canvas = select('#contenedor'),
	canvasWidth = canvas.width,
	canvasHeight = canvas.height;
	createCanvas(canvasWidth, canvasHeight).parent('contenedor');
	crearObjetos();
	
}//end setup

function crearObjetos(){
	nave = new Nave();
	for (i = 0; i < 10; i++) {
		asteroides.push(new Asteroide());
	}
}

function windowResized() {
  	canvas = select('#contenedor'),
	canvasWidth = canvas.width,
	canvasHeight = canvas.height;
	resizeCanvas(canvasWidth, canvasHeight);
}

function draw(){
	var i,j;
	background(0);
	text('Puntaje: '+puntaje,10,10,70,80);
	fill(255);
	//---Asteroides---
	for (i = 0; i < asteroides.length; i++) {
		asteroides[i].dibujar();
		asteroides[i].actualizar();
		asteroides[i].bordes();
		if(nave.colision(asteroides[i])){
			asteroides = [];
			crearObjetos();
			puntaje=0;
		}

	}

	//--Lasers! Pium pium ---
	for (i = lasers.length - 1; i >= 0; i--) {
		lasers[i].dibujar();
		lasers[i].actualizar();
		if(lasers[i].fueraPantalla()){
			lasers.splice(i, 1);
		}else{
			for (j = asteroides.length - 1; j >= 0; j--) {
				if(lasers[i].colision(asteroides[j])){
					if(asteroides[j].radio > 10){
						asteroides = asteroides.concat(asteroides[j].romperse());
					}
					puntaje+=10;
					asteroides.splice(j, 1);
					lasers.splice(i, 1);
					break;
				}
			}
		}
	}

	//---NAVE---
	nave.dibujar();
	nave.giro();
	nave.actualizar();
	nave.bordes();


}// end draw


function keyReleased(){
	nave.setRotacion(0);
	nave.acelerando(false);
}//end keyReleased

function keyPressed(){
	if(key == ' '){
		lasers.push(new Laser(nave.pos, nave.direccion));
	}else if (keyCode == RIGHT_ARROW) {
		nave.setRotacion(0.1);
	}else if (keyCode == LEFT_ARROW) {
		nave.setRotacion(-0.1);
	}else if (keyCode == UP_ARROW) {
		nave.acelerando(true);
	}
}//end keyPressed
