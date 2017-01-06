function Nave(){
	this.pos = createVector(width/2, height/2);
	this.lado = 20;
	this.direccion = 0;
	this.rotacion = 0;
	this.velocidad  = createVector(0,0);
	this.estaAcelerando = false;

	this.acelerando = function(aceleracion){
		this.estaAcelerando = aceleracion;
	}// fin acelerando

	this.actualizar = function(){
		if(this.estaAcelerando){
			this.acelerar();
		}
		this.pos.add(this.velocidad);
		this.velocidad.mult(0.99);	
	}// fin actualizar

	this.acelerar = function(){
		var fuerza = p5.Vector.fromAngle(this.direccion);
		fuerza.mult(0.1);
		this.velocidad.add(fuerza);
	}//fin acelerar

	this.colision = function(asteroide){
		var distancia = dist(this.pos.x, this.pos.y, asteroide.posicion.x, asteroide.posicion.y);
		if(distancia < this.lado + asteroide.radio){
			return true;
		}else{
			return false;
		}
	}// fin colision


	this.dibujar = function(){
		push();
		translate(this.pos.x, this.pos.y); // la X,Y del vector pos
		rotate(this.direccion + PI/2);
		noFill();
		stroke(0, 255, 0);
		triangle(-this.lado , this.lado, this.lado, this.lado, 0, -this.lado);
		pop();
	}// fin dibujar

	this.bordes = function(){
		if (this.pos.x > width + this.lado) {
			this.pos.x = -this.lado;	
		}else if (this.pos.x < -this.lado) {
			this.pos.x = width + this.lado;
		} else if (this.pos.y > height + this.lado) {
			this.pos.y = -this.lado;	
		}else if (this.pos.y < -this.lado) {
			this.pos.y = height + this.lado;
		}
	}// fin bordes

	this.setRotacion = function(angulo){
		this.rotacion = angulo;
	}//fin setRotacion

	this.giro = function(){
		this.direccion += this.rotacion;
	}//fin giro

}//fin nave