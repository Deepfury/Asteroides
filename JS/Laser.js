function Laser(posicionNave, direccionNave){
	this.velocidad = p5.Vector.fromAngle(direccionNave).mult(10);
	this.posicion = createVector(posicionNave.x, posicionNave.y);

	this.actualizar = function(){
		this.posicion.add(this.velocidad);
	}

	this.dibujar = function(){
		push();
		stroke(255);
		strokeWeight(4);
		point(this.posicion.x, this.posicion.y);
		pop();
	}

	this.colision = function(asteriode){
		var distancia = dist(this.posicion.x, this.posicion.y, asteriode.posicion.x, asteriode.posicion.y);
		if (distancia < asteriode.radio){
			return true;
		}else{
			return false;
		}
	}	

	this.fueraPantalla = function(){
		if (this.posicion.x > width || this.posicion.x < 0 || this.posicion.y > height || this.posicion.y < 0) {	
			return true;
		}
		return false;
	}

}//end Laser