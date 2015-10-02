$(document).ready(function(){

// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function( callback ){
		  window.setTimeout(callback, 1000 / 60);
		  };
})();

//Selecting the canvas
var canvas = document.getElementById('Canv');
//Gettting the canvas context 
var c = canvas.getContext("2d");

//Animation Configuration
var count = 300,
	particle = [],
	settings = {
        particleSize: 3,
		posX : canvas.width/2,
		posY : canvas.width/2,
	};

 function drawParticle() {
    // particle position
    this.x = settings.posX - 50;
    this.y = 100;

    //Particle Velocity
    this.vx = -1 + Math.random() * 4;
	this.vy = -1 + Math.random() * 4;
	
	//Deafult Color
	var color = "#fe2d2d";

	$('#ColorEffect').click(function(){
	//Random colors
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	
	return color = "rgba("+r+", "+g+", "+b+", 0.5)";

	})

	this.draw = function() {
		//Draw the particles
		c.fillStyle = color;
		c.beginPath();
		c.arc(this.x, this.y, settings.particleSize, 0, Math.PI * 2, false);
		// Fill the color to the arc that we just created
		c.fill();

	}
}

for(var i = 0; i < count; i++) {
	particle.push(new drawParticle());
}

function paintCanvas(){
	
	c.fillStyle =  "rgba(0, 0, 0, 0.1)";
	c.fillRect(0, 0, canvas.width, canvas.height);
	//Weird Effect Button one
	$('#LightEffect').click(function(){
	 	c.globalCompositeOperation = 'lighter'; 
	 })

}

function draw(){

	paintCanvas();

	//Draw the particle on the canvas with the animation
	for (var i = 0; i < particle.length; i++) {
		var p = particle[i];
		p.draw();

		$(canvas).mouseenter(function() {
			settings.particleSize = 10;
		  })
  		.mouseleave(function() {
    		settings.particleSize = 2;
  });
		//Keeps the particles inside the canvas 
		if(p.x < -50) p.x = (canvas.width)+50;
		if(p.y < -50) p.y = (canvas.height)+50;
		if(p.x > (settings.posX*2)+50) p.x = -50;
		if(p.y > (settings.posY*2)+50) p.y = -50;
	}

	update();//call update and the animation begins
}

function update() {

	// Updating the particle position
	for (var i = 0; i < particle.length; i++) {
		p = particle[i];


		// Change the velocities
		p.x += p.vx;
		p.y += p.vy
	}

}
// Start the main animation loop using requestAnimFrame
//This made the animation more smooth
function animloop() {
	
	draw();
	requestAnimFrame(animloop);
}

animloop();


//This is the other way to add the animation
/*
setInterval(function(){
	function animloop() {
	
	draw();
	
	}
	animloop();
 
	}, 30);//FPS

*/

});//End Document 