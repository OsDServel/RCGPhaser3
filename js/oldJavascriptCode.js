//order:
//RENDERING SPRITES
////////////////////
//SCALING AND FLIPPING
/////////////////
//ROTATION AND UPDATE


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
this.player= this.add.sprite(40, 180, 'player');

this.player.setScale(0.5);
// 	//we are reducing the width by 50%, and we are doubling the height

//create an enemy
this.enemy1= this.add.sprite(250, 180, 'enemy');
this.enemy1.setScale(3)


//ROTATION AND UPDATE:
// // this.enemy1.angle= 45;
// // this.enemy1.setAngle(45);

// this.enemy1.setRotation(Math.PI/ 4);

// console.log(this.enemy1);



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



//ROTATION AND UPDATE:
// 	// this.enemy1.x += 0.1; 
// 		//this makes the sprite continue to move to the right.
// 	this.enemy1.angle += 1;
// 		//this will make the sprite continue to spin at an angle 
	
// if(this.player.scaleX< 2){
// this.player.scaleX += 0.01;
// 	this.player.scaleY += 0.01;
// }	//scale the sprite image until double the size
};

//Set the donfiguration of the game
let config={
	type: Phaser.AUTO, //Phaser will use WebGL if available if not it will use Canvas
	width: 640,
	height: 360,
	scene: gameScene
};

//Create a new game, pass the Configuration
let game= new Phaser.Game(config);






























///////////////////////////////////////////////////////////
//order:
//PLAYER AND GOAL
///////////////////


// ORDER of game set up: init(), preload(), create(), update()



//Create a new scene

let gameScene= new Phaser.Scene('Game');

//inititate scene parameters
gameScene.init= function(){
	//player speed
	this.playerSpeed= 3;

	//enemy speed
	this.enemyMinSpeed= 1;
	this.enemyMaxSpeed= 4;

	//boundaries
	this.enemyMinY= 80;
	this.enemyMaxY= 320;

}

//Load assets
gameScene.preload= function(){
	//Load images
	this.load.image('background', 'img/background.png');
	this.load.image('player', 'img/player.png');
	this.load.image('enemy', 'img/dragon.png');
	this.load.image('goal', 'img/treasure.png');
};


//Called once after the  preLoad ends
gameScene.create= function(){

//Create bg sprite
let bg= this.add.sprite(0, 0, 'background');

//change the origin to the top-left corner
	bg.setOrigin(0, 0);


//create the player
this.player= this.add.sprite(40, this.sys.game.config.height/ 2, 'player');

//we are reducing the width and height by 50%
this.player.setScale(0.5);

//goal
this.goal= this.add.sprite(this.sys.game.config.width- 80, this.sys.game.config.height/ 2, 'goal');
this.goal.setScale(0.6);

//enemy
this.enemy= this.add.sprite(125, this.sys.game.config.height/ 2, 'enemy');
this.enemy.flipX= true;
this.enemy.setScale(0.6);

//set enemy speed
	//we want to make the direction random,so were going to toss a coin
	//so were saying, 'if this random number is less than 0.5' than we get '1', and if it more than '0.5' were going to get '-1'
let dir= Math.random() < 0.5 ? 1 : -1;
	//we also want the speed to be random, so were going to take the minimum speed and add a random number, 'Math.random()' and multiply it by the difference of the maximum and minimum speed.
let speed= this.enemyMinSpeed + Math.random()* (this.enemyMaxSpeed- this.enemyMinSpeed);
this.enemy.speed= dir * speed;

};
//this is called up to 60 times per second
gameScene.update= function(){

	//check for active input
	if(this.input.activePointer.isDown){
		//player walks
		this.player.x+= this.playerSpeed;
	}

	//treasure overlapping check
	let playerRect= this.player.getBounds();
	let treasureRect= this.goal.getBounds();
	// console.log(playerRect);

	if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
		console.log('reached goal!');
		//NOTE: if when you type it 'console.log' and you 'console' is white, while your 'log' is green, it means that you have an incorrect placed ')' somewhere in your code 

		//restart the Scene
		this.scene.manager.bootScene(this);

		// this.scene.restart();
		// return;
	}
	 //enemy movement
	 this.enemy.y+= this.enemy.speed;

	 let conditionUp= this.enemy.speed< 0 && this.enemy.y<= this.enemyMinY;
	 let conditionDown= this.enemy.speed> 0 && this.enemy.y>= this.enemyMaxY;
	
	//if we passed the uppser or lower limit, reverse
	if(conditionUp || conditionDown){
		this.enemy.speed*= -1;
	}
/////////////////////////////////////////(this is added in our init() section under boundaries)
//more code to write, another way.
	// //chech we havent passed the min Y     
	//  if(conditionUp){  //'if(this.enemy.y< 0 && this.enemy.y<= this.enemyMinY)'               //'< 0 && this.enemy.y' was added as a piece of code so that the movement does not get stuck if going to fast. msy not even be needed fyi.
	//  	this.enemySpeed*= -1;

	//  }
	// //check we havent passed the max Y
	//  if(conditionDown){     //"if(this.enemy.y> 0 && this.enemy.y>= this.enemyMaxY)"
	//  	this.enemySpeed*= -1;

	//  }
};

//Set the configuration of the game
let config={
	type: Phaser.AUTO, //Phaser will use WebGL if available if not it will use Canvas
	width: 640,
	height: 360,
	scene: gameScene
};

//Create a new game, pass the Configuration
let game= new Phaser.Game(config);


























//////////////////////////////////////////////////////////////
//
//order:
//BOUNCING ENEMY
///////////////
//GROUPS





// ORDER of game set up: init(), preload(), create(), update()



//Create a new scene

let gameScene= new Phaser.Scene('Game');

//inititate scene parameters
gameScene.init= function(){
	//player speed
	this.playerSpeed= 3;

	//enemy speed
	this.enemyMinSpeed= 1;
	this.enemyMaxSpeed= 4;

	//boundaries
	this.enemyMinY= 80;
	this.enemyMaxY= 320;

}

//Load assets
gameScene.preload= function(){
	//Load images
	this.load.image('background', 'img/background.png');
	this.load.image('player', 'img/player.png');
	this.load.image('enemy', 'img/dragon.png');
	this.load.image('goal', 'img/treasure.png');
};


//Called once after the  preLoad ends
gameScene.create= function(){

//Create bg sprite
let bg= this.add.sprite(0, 0, 'background');

//change the origin to the top-left corner
	bg.setOrigin(0, 0);


//create the player
this.player= this.add.sprite(40, this.sys.game.config.height/ 2, 'player');

//we are reducing the width and height by 50%
this.player.setScale(0.5);

//goal
this.goal= this.add.sprite(this.sys.game.config.width- 80, this.sys.game.config.height/ 2, 'goal');
this.goal.setScale(0.6);

//enemy group
this.enemies= this.add.group({
	//were adding this line of code here so that we can call upon put enemies variable and add to its group
	key: 'enemy',
	repeat: 5,
	setXY: {
		x: 90,
		y: 100,
		stepX: 80,
		stepY: 20
			//with this code above, we have now created a bunch of enemies at the coordinates of (90, 100), then adding (80, 20) to the next sprite and so on and so forth
	}
});
//Getting rid of first 'Enemy'
// this.enemy= this.add.sprite(125, this.sys.game.config.height/ 2, 'enemy');
// this.enemy.flipX= true;


// this.enemies.add(this.enemy);
// 	//here we are adding the 'enemy' to the 'enemies' group


//setting scale to all group elements
Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4)
	//instead of adding the scale of each enemy, were going to scale the universal scale to '0.6' by substracting, '0.4' to the X and Y axis.


//set flipX, and speed
Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
	//flip enemy
	enemy.flipX= true;

	//set speed
	let dir= Math.random() < 0.5 ? 1 : -1;
	let speed= this.enemyMinSpeed + Math.random()* (this.enemyMaxSpeed- this.enemyMinSpeed);
	enemy.speed= dir * speed;


}, this);
// console.log(this.enemies.getChildren());

// //set enemy speed
// let dir= Math.random() < 0.5 ? 1 : -1;
// let speed= this.enemyMinSpeed + Math.random()* (this.enemyMaxSpeed- this.enemyMinSpeed);
// this.enemy.speed= dir * speed;

};
//this is called up to 60 times per second
gameScene.update= function(){

	//check for active input
	if(this.input.activePointer.isDown){
		//player walks
		this.player.x+= this.playerSpeed;
	}

	//treasure overlap check
	let playerRect= this.player.getBounds();
	let treasureRect= this.goal.getBounds();
	

	//get enemies
	let enemies= this.enemies.getChildren();
	let numEnemies= enemies.length;

	for(let i= 0; i< numEnemies; i++){
		//enemy movement
		enemies[i].y+= enemies[i].speed;

		let conditionUp= enemies[i].speed< 0 && enemies[i].y<= this.enemyMinY;
		let conditionDown= enemies[i].speed> 0 && enemies[i].y>= this.enemyMaxY;
		
		//if we passed the uppser or lower limit, reverse
		if(conditionUp || conditionDown){
			enemies[i].speed*= -1;
			}

		//check enemy overlap
		let enemyRect= enemies[i].getBounds();
		

		if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){
			console.log('Game Over!');
			
			//restart the Scene
			// this.scene.manager.bootScene(this);
			this.scene.restart();
			return;
			}

	}

};

//Set the configuration of the game
let config={
	type: Phaser.AUTO, //Phaser will use WebGL if available if not it will use Canvas
	width: 640,
	height: 360,
	scene: gameScene
};

//Create a new game, pass the Configuration
let game= new Phaser.Game(config);

































//order:
//CAMERA EFFECTS AND EVENT LISTENING
//////////////////////////////////////




// ORDER of game set up: init(), preload(), create(), update()



//Create a new scene

let gameScene= new Phaser.Scene('Game');

//inititate scene parameters
gameScene.init= function(){
	//player speed
	this.playerSpeed= 3;

	//enemy speed
	this.enemyMinSpeed= 1;
	this.enemyMaxSpeed= 4;

	//boundaries
	this.enemyMinY= 80;
	this.enemyMaxY= 320;

	//we are not terminating
	this.isTerminating= false;

};

//Load assets
gameScene.preload= function(){
	//Load images
	this.load.image('background', 'img/background.png');
	this.load.image('player', 'img/player.png');
	this.load.image('enemy', 'img/dragon.png');
	this.load.image('goal', 'img/treasure.png');
};


//Called once after the  preLoad ends
gameScene.create= function(){

//Create bg sprite
let bg= this.add.sprite(0, 0, 'background');

//change the origin to the top-left corner
	bg.setOrigin(0, 0);


//create the player
this.player= this.add.sprite(40, this.sys.game.config.height/ 2, 'player');

//we are reducing the width and height by 50%
this.player.setScale(0.5);

//goal
this.goal= this.add.sprite(this.sys.game.config.width- 80, this.sys.game.config.height/ 2, 'goal');
this.goal.setScale(0.6);

//enemy group
this.enemies= this.add.group({
	//were adding this line of code here so that we can call upon put enemies variable and add to its group
	key: 'enemy',
	repeat: 5,
	setXY: {
		x: 90,
		y: 100,
		stepX: 80,
		stepY: 20
			//with this code above, we have now created a bunch of enemies at the coordinates of (90, 100), then adding (80, 20) to the next sprite and so on and so forth
	}
});


//setting scale to all group elements
Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4)
	//instead of adding the scale of each enemy, were going to scale the universal scale to '0.6' by substracting, '0.4' to the X and Y axis.


//set flipX, and speed
Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
	//flip enemy
	enemy.flipX= true;

	//set speed
	let dir= Math.random() < 0.5 ? 1 : -1;
	let speed= this.enemyMinSpeed + Math.random()* (this.enemyMaxSpeed- this.enemyMinSpeed);
	enemy.speed= dir * speed;


}, this);
// console.log(this.enemies.getChildren());

};
//this is called up to 60 times per second
gameScene.update= function(){

	//dont execute if we are terminating
	if(this.isTerminating) return;

	//check for active input
	if(this.input.activePointer.isDown){
		//player walks
		this.player.x+= this.playerSpeed;
	}

	//treasure overlap check
	let playerRect= this.player.getBounds();
	let treasureRect= this.goal.getBounds();
	
	if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
		console.log('Reached goal!');

		//end game
		return this.gameOver();
	}

	//get enemies
	let enemies= this.enemies.getChildren();
	let numEnemies= enemies.length;

	for(let i= 0; i< numEnemies; i++){
		//enemy movement
		enemies[i].y+= enemies[i].speed;

		let conditionUp= enemies[i].speed< 0 && enemies[i].y<= this.enemyMinY;
		let conditionDown= enemies[i].speed> 0 && enemies[i].y>= this.enemyMaxY;
		
		//if we passed the uppser or lower limit, reverse
		if(conditionUp || conditionDown){
			enemies[i].speed*= -1;
			}

		//check enemy overlap
		let enemyRect= enemies[i].getBounds();
		

		if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){
			console.log('Game Over!');
			
			//end game
			return this.gameOver();
			}

	}

};


gameScene.gameOver= function(){
	//initiated game over sequence
	this.isTerminating= true;

	//shake camera
	this.cameras.main.shake(500);  //i want my camera shake effect to happen for half a second '(500)'

	//listen for event completion
	this.cameras.main.on('camerashakecomplete', function(camera, effect){
	
		//fade out
		this.cameras.main.fade(500);
	
	}, this)
	//NOTE: it is very important that we add the 'this' keyword at the end of the '}' curly brace, because otherwise the text will not know to invoke the 'this' as a keyword.

	this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){

		//restart the Scene
		this.scene.restart();
	}, this)

	
};

//Set the configuration of the game
let config={
	type: Phaser.AUTO, //Phaser will use WebGL if available if not it will use Canvas
	width: 640,
	height: 360,
	scene: gameScene
};

//Create a new game, pass the Configuration
let game= new Phaser.Game(config);