//order:
//RENDERING SPRITES
////////////////////
//SCALING AND FLIPPING
/////////////////
//ROTATION AND UPDATE
////////////////
//PLAYER AND GOAL
///////////////////
//BOUNCING ENEMY
///////////////
//GROUPS
/////////////
//CAMERA EFFECTS AND EVENT LISTENING
//////////////////////////////////////


// ORDER of game set up: init(), preload(), create(), update()




//Create a new scene

let gameScene= new Phaser.Scene('Game');


//Load assets
gameScene.preload= function(){
	//Load images
	this.load.image('background', 'img/background.png');
	this.load.image('player', 'img/player.png');
	this.load.image('enemy', 'img/dragon.png');
	// this.load.image('treasure', 'img/treasure.png');
};

//Called once after the  preLoad ends
gameScene.create= function(){

//Create bg sprite
let bg= this.add.sprite(0, 0, 'background');


//create the player
let player= this.add.sprite(70, 180, 'player');
// player.setScale(0.5, 2)
// 	//we are reducing the width by 50%, and we are doubling the height

//create an enemy
this.enemy1= this.add.sprite(250, 180, 'enemy');
this.enemy1.setScale(3)

// this.enemy1.angle= 45;
// this.enemy1.setAngle(45);

this.enemy1.setRotation(Math.PI/ 4);

console.log(this.enemy1);



// /////////////
//SCALING AND FLIPPING
////////////////////////////
//LOADING SECOND ENEMY, AND LEARNING HOW TO FLIP SPRITES ON THE AXIS
	// enemy1.scaleX= 2;
	// enemy1.scaleY= 2;
	// //create second enemy
	// let enemy2= this.add.sprite(450, 180, 'enemy');
	// enemy2.displayWidth= 300;

	// //flip, in case we want to flip the image to face a specific way
	// enemy1.flipX= true;
	// enemy1.flipY= true;







//change the origin to the top-left corner
	bg.setOrigin(0, 0);
// ANOTHER OPTION TO SET ORIGIN:////////////////////////////////
	// place sprite in the center
	// bg.setPosition( 640/2, 360/2);
	// 	//	we got these numbers by taking a scroll down and looking at the 'width', and 'height' that we gave out canvas earlier when we wrote the 'config' variable
	// let gameW= this.sys.game.config.width;
	// let gameH= this.sys.game.config.height;
	// 	//by accessing the "this.sys.game" you can access any variable you create, like accessing "width" and "height" in the "let config" variable.
	// console.log(gameW, gameH);
	// 	//this will console log the written values for the attributes in "config"
	// 	console.log(bg);
	// 		console.log(this);
////////////////////////////////////////////////////////////
};
//this is called up to 60 times per second
gameScene.update= function(){
	// this.enemy1.x += 0.1; 
		//this makes the sprite continue to move to the right.
	this.enemy1.angle += 1;
		//this will make the sprite continue to spin at an angle
}

//Set the donfiguration of the game
let config={
	type: Phaser.AUTO, //Phaser will use WebGL if available if not it will use Canvas
	width: 640,
	height: 360,
	scene: gameScene
};

//Create a new game, pass the Configuration
let game= new Phaser.Game(config);