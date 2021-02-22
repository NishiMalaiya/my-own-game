
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var virus1,virus2,virus3,virus4;
var virus1IMG,virus2IMG,virus3IMG,virus4IMG;
var player,playerIMG1,player2IMG,player3IMG,player4IMG;
var rod,rod2;
var mask,sanitizer;
var sound;
var maskImage,sanitizerImage;
var backgroundIMG;
var mask1IMG;
var tressur;
var SCORE = 0;
var tressureGroup;
var MASK;
var gameState = "play";
var index = 0;

function preload(){

    backgroundIMG = loadImage("backgr.png");
     virus1IMG = loadImage("c1.png");
     virus2IMG = loadImage("c2.png");
     virus3IMG = loadImage("c3.png");
     virus4IMG = loadImage("c4.png");
      playerIMG1 = loadImage("B1.png");
     player2IMG = loadImage("B2.png");
     player3IMG = loadImage("B3.png");
     player4IMG = loadImage("B4.png");
     maskImage = loadImage("cmask.png");
     sanitizerImage = loadImage("sanitizer.png")
   //  sound = loadSound("backgroundsound.mp3");
   mask1IMG = loadImage("BM1.png");
   mask2IMG = loadImage("BM2.png");
   mask3IMG = loadImage("BM3.png");

}

function setup() {
	createCanvas(800, 700);

  

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
    virus1 = createSprite(130,50,20,20);
    virus1.addImage(virus1IMG);
    virus1.scale = 0.1;

    virus2 = createSprite(650,200,20,20);
    virus2.addImage(virus2IMG);
    virus2.scale = 0.1;

    virus3 = createSprite(200,350,20,20);
    virus3.addImage(virus3IMG);
    virus3.scale = 0.1;

    virus4 = createSprite(500,400,20,20);
    virus4.addImage(virus4IMG);
    virus4.scale = 0.1;

 player = createSprite(150,550,20,20);
 player.addImage(playerIMG1);
 player.scale = 0.4;

 rod = createSprite(1345,80,30,1500)
 rod.shapeColor = "black";
 rod2 = createSprite(5,80,30,1500)
 rod2.shapeColor = "black";

 
 
 tressureGroup = new Group();

  virus1.velocityX = 1;
  virus1.velocityY = -1;
  virus2.velocityX = -1;
  virus2.velocityY = 1;
  virus3.velocityX = 1;
  virus3.velocityY = -1;
  virus4.velocityX = -1;
  virus4.velocityY = 1;

	Engine.run(engine);
  
}


function draw() {
 // rectMode(CENTER);
  background(backgroundIMG);
  strokeWeight(25);
  fill("black");
  text("SCORE : "+SCORE,50,100);
  bounceoff();
 // sound.play();

  edges = createEdgeSprites();
  virus1.bounceOff(edges);
  virus2.bounceOff(edges)
  virus3.bounceOff(edges);
  virus4.bounceOff(edges);
if(gameState === "play"){
  if(keyDown(UP_ARROW)){
    player.y = player.y - 3 ;
    player.addImage(player3IMG);
  }

  if(keyDown(DOWN_ARROW)){
    player.y = player.y + 3 ;
    player.addImage(playerIMG1);
  }

  if(keyDown(LEFT_ARROW)){
    player.x = player.x - 3 ;
    player.addImage(player2IMG);
  }

  if(keyDown(RIGHT_ARROW)){
    player.x = player.x + 3 ;
    player.addImage(player4IMG);
  }

   

  

  if(tressureGroup.isTouching(player)){
    tressureGroup[0].destroy();
    SCORE = SCORE+1;
  
    index = 5;
   
  }

  if(keyDown(LEFT_ARROW) && index === 5){
    MASK = createSprite(player.x,player.y,10,10);
    MASK.x = player.x;
    MASK.y = player.y;

    MASK.x =MASK.x -3;
    
    MASK.addImage(mask2IMG); 
    MASK.scale = 0.1;
   
  }

  if(keyDown(RIGHT_ARROW) && index === 5){
    MASK = createSprite(player.x,player.y,10,10);
    MASK.x = player.x;
    MASK.y = player.y;

    MASK.x =MASK.x +3;
   
    MASK.addImage(mask3IMG);
    MASK.scale = 0.1;
   
  }

  if(keyDown(UP_ARROW) && index === 5){
   // MASK.x =MASK.x -3;
   // MASK.scale = 0.1;
   // MASK = createSprite(player.x,player.y,10,10);
  }

  if(keyDown(DOWN_ARROW) && index === 5){
    MASK = createSprite(250,200,10,10);
    MASK.x = player.x;
    MASK.y = player.y;
    MASK.x =MASK.x +3;
   
    MASK.addImage(mask1IMG);
    MASK.scale = 0.1;
    
  }
  //index = index-1;


  
   
  if(virus1.isTouching(player)|| virus2.isTouching(player)|| virus3.isTouching(player) || virus4.isTouching(player)){
    gameState = "end";
  }
 
  Spawntressur();
  drawSprites();
}

if(gameState === "end"){
  textSize(13);
  text("GAME OVER",350,300);

  if(keyDown("R")){
    gameState = "play";
  }
}
  
  
 
}



function bounceoff(){
  if (player.x - rod.x < rod.width/2 + player.width/2
    && rod.x - player.x < rod.width/2 + player.width/2) {
      player.velocityX = player.velocityX * (-1);
      rod.velocityX = rod.velocityX * (-1);
     
}
if (player.y - rod.y < rod.height/2 + player.height/2
  && rod.y - player.y < rod.height/2 + player.height/2){
  player.velocityY = player.velocityY * (-1);
  rod.velocityY = rod.velocityY * (-1);
}
if (player.x - rod2.x < rod2.width/2 + player.width/2
  && rod2.x - player.x < rod2.width/2 + player.width/2) {
    player.velocityX = player.velocityX * (-1);
    rod2.velocityX = rod2.velocityX * (-1);
   
}
if (player.y - rod2.y < rod2.height/2 + player.height/2
&& rod2.y - player.y < rod2.height/2 + player.height/2){
player.velocityY = player.velocityY * (-1);
rod2.velocityY = rod2.velocityY * (-1);
}
}


function Spawntressur(){
 
  if(frameCount % 200 === 0){
    tressur = createSprite(Math.round(random(50,750)),Math.round(random(50,650)),10,10);
    tressur.lifetime = 200;
    tressureGroup.add(tressur);
    tressur.addImage(mask1IMG);
    tressur.scale = 0.3;
 //   var rand = Math.round(random(1,2));
   // switch(rand) {
  //    case 1: mask.addImage("mask",maskImage);
           //   break;
  //    case 2: sanitizer.addImage("sanitizer",sanitizerImage);
           //   break;
  //    default: break;
  
  //  }
 
}
}

