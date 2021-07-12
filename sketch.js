var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,gameState,PLAY,END,restart,gameover,restartImage,gameoverImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImage=loadImage("restart.png");
  gameoverImage=loadImage("gameOver.png");
}


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.5;
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  restart=createSprite(300,140,20,20);
  restart.addImage(restartImage);
  restart.scale=0.5;
  gameover=createSprite(340,160,20,20);
  gameover.addImage(gameoverImage);
  gameover.scale=0.5;
  score = 0;
  gameover.visible=false;
  restart.visible=false;
}

function draw() {
  background(180);
  
  if(gameState===PLAY){
  
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
    }
  }else if(gameState===END){
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    gameover.visible=true;
    restart.visible=true;
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("trex_collided",trex_collided);
 
    obstaclesGroup.setVelocityXEach(0);     
  }
  if(mousePressedOver(restart)){
      reset();
    }
    
  trex.collide(invisibleGround);
  text("Score: "+ score, 500,50);

  camera.x=trex.x;
  camera.y=trex.y;

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  trex.changeAnimation("running", trex_running);
  gameState=PLAY;
  score=0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  restart.visible=false;
  gameover.visible=false;
  
}


  



