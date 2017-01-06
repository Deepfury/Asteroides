
function Asteroide(posicion, radio){
	if(posicion){
		this.posicion = posicion.copy();
	}else{
		this.posicion = createVector(random(width), random(height));
	}
	if(radio){
		this.radio = radio * 0.5;
	}else{
		this.radio = floor(random(15, 50));
	}

	this.velocidad = p5.Vector.random2D();
	this.totalLados = floor(random(10,25));
	this.posicionLados = [];

	for (var i = 0; i < this.totalLados; i++) {
		this.posicionLados[i] = random(-this.radio*0.5, this.radio*0.5);
	}

	this.actualizar = function(){
		this.posicion.add(this.velocidad);
	}

	this.dibujar = function(){
		var i, anguloAsteroide, x, y, lado;

		push();
		noFill();
		stroke(255);
		translate(this.posicion.x, this.posicion.y);

		//Haciendo una figura cerrada con lados de tamaño random
		beginShape();
		for (i = 0; i < this.totalLados; i++) {
			anguloAsteroide = map(i, 0, this.totalLados, 0, TWO_PI);
			lado = this.radio + this.posicionLados[i];
			x = lado * cos(anguloAsteroide);
			y = lado * sin(anguloAsteroide);
			vertex(x, y);
		}
		endShape(CLOSE);

		pop(); 
	}// end dibujar

	this.romperse = function(){
		var nuevoAsteroide = [];
		nuevoAsteroide[0] = new Asteroide (this.posicion, this.radio);
		nuevoAsteroide[1] = new Asteroide (this.posicion, this.radio);
		return nuevoAsteroide;

	}//romperse


	this.bordes = function(){
		if (this.posicion.x > width + this.radio) {
			this.posicion.x = -this.radio;	
		}else if (this.posicion.x < -this.radio) {
			this.posicion.x = width + this.radio;
		} else if (this.posicion.y > height + this.radio) {
			this.posicion.y = -this.radio;	
		}else if (this.posicion.y < -this.radio) {
			this.posicion.y = height + this.radio;
		}
	}// end bordes

}//end Asteriode