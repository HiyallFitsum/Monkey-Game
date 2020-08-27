
var gameState = PLAY;
var PLAY = 0;
var END = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;

function preload(){

  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkey = loadImage("sprite_0.png");

}
function setup(){
createCanvas(400,400);

  //create monkey
  monkey =createSprite(100,390,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground =createSprite(400, 395, 800, 50);
  ground.shapeColor = "yellowgreen";
  ground.velocityX = -4;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width/8,monkey.hieght); 
  

  
  gameState = PLAY;
  
}

function draw(){
background("skyblue");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:" + survivalTime, 100, 50);
  
  if(gameState === PLAY) {
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  surivalTime = 0;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(keyDown("space")&& monkey.y >= 330) {
         monkey.velocityY = -12;
    }
  
  ground.x=ground.width/2;

if(gameState === END) {
   
   if(keyDown("r")) {
  survivalTime = 0;
  reset();
   }
   
   textSize(20);
   
   text("GAME OVER", 125, 200);
   textSize(18);
   text("Press R to restart", 125, 230);
   
  monkey.velocityY = 0;
   
  bananaGroup.destroyEach();
   
  obstaclesGroup.setVelocityXEach(0); 

   
  monkey.changeImage(monkey);
 }
  
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)) {
   bananaGroup.destroyEach();
  }
    
  if(obstaclesGroup.isTouching(monkey)) {
  gameState = END;
  }
  obstaclesGroup.setLifetimeEach(-1);
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
}

function reset() {
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  monkey.y = 390;
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
  banana = createSprite(400, 200, 20, 20);
  banana.lifetime = 100;
  banana.addImage(bananaImage);
  banana.y = Math.round(random(220,350));
  banana.scale = 0.05;
  banana.velocityX = -4;
  bananaGroup.add(banana);
    }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
  obstacle =createSprite(400, 360, 20, 20);
  obstacle.scale = 0.15;
  obstacle.lifetime = 100;
  obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8;
    obstaclesGroup.add(obstacle);
    }
}