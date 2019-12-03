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