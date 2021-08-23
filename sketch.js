var BGImg,Shooter2,Shooter3,ZombieImg,BulletImg;
var BulletGroup,ZombieGroup,Heart1Img,Heart2Img,Heart3Img,heart1,heart2,heart3;
var GameState = "play"
var bullets = 100;
var life = 3;
var score = 0;
var Lose,Win,Explosion;
function preload(){
BGImg = loadImage("bg.jpeg")
Shooter2 = loadImage("shooter_2.png");
Shooter3 = loadImage("shooter_3.png");;
ZombieImg = loadImage("zombie.png");
BulletImg = loadImage("bullet.png");
Heart1Img = loadImage("heart_1.png");
Heart2Img = loadImage("heart_2.png");
Heart3Img = loadImage("heart_3.png");
Lose = loadSound("lose.mp3");
Win = loadSound("win.mp3");
Explosion = loadSound("explosion.mp3");
}

function setup() {
createCanvas(windowWidth,windowHeight)
BG = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
BG.addImage(BGImg)
BG.scale = 1.1;
Player = createSprite(displayWidth-1150,displayHeight-300,50,50);
Player.addImage(Shooter2);
Player.scale = 0.3;
heart1 = createSprite(displayWidth-150,40,20,20);
heart1.addImage(Heart1Img);
heart1.scale=0.3;
heart1.visible=false;
heart2 = createSprite(displayWidth-100,40,20,20);
heart2.addImage(Heart2Img);
heart2.scale=0.3;
heart2.visible=false;
heart3 = createSprite(displayWidth-150,40,20,20);
heart3.addImage(Heart3Img);
heart3.scale=0.3;
heart3.visible=true;
BulletGroup = new Group()
ZombieGroup = new Group()

}

function draw() {
 background("black")
    drawSprites()
  if(GameState === "play"){
  
  enemy();
  if(keyWentDown("space")){
Bullet = createSprite(displayWidth-1150,Player.y-30,20,10);
Bullet.addImage(BulletImg);
Player.addImage(Shooter3);
Bullet.scale = 0.2;
Bullet.velocityX = 10; 
BulletGroup.add(Bullet);
bullets=bullets-1
Player.depth = Bullet.depth;
Player.depth = Player+1;
Explosion.play();
}
if(bullets===0){
GameState = "bullet"
Lose.play();
}
if(keyWentUp("space")){
Player.addImage(Shooter2);

}
if(life===3){
heart3.visible = true;
heart2.visible = false;
heart1.visible = false;
}
if(life===2){
heart2.visible = true;
heart3.visible = false;
heart1.visible = false;
}
if(life===1){
heart1.visible = true;
heart2.visible = false;
heart3.visible = false;
}
if(life===0){
GameState = "lost"
}
if(score === 100){
GameState = "won"
Win.play();
}
if(BulletGroup.isTouching(ZombieGroup)){
  for(var i = 0;i<ZombieGroup.length;i++){
  if(ZombieGroup[i].isTouching(BulletGroup)){
  ZombieGroup[i].destroy();
  BulletGroup.destroyEach();
  score = score+2;
  Explosion.play();
  }
  }
  }
  if(Player.isTouching(ZombieGroup)){
    for(var i = 0;i<ZombieGroup.length;i++){
    if(ZombieGroup[i].isTouching(Player)){
    ZombieGroup[i].destroy();
    life = life-1;
    Lose.play();
    }
    }
    }
  textSize(25)
  fill("white")
  text("Bullet="+bullets,displayWidth-210,displayHeight/2-250);
  text("Score="+score,displayWidth-200,displayHeight/2-220);
  text("Life="+life,displayWidth-200,displayHeight/2-280);
if(keyDown("down")){
Player.y = Player.y+10;
}
if(keyDown("UP")){
Player.y-=10;
}
if(keyDown("right")){
Player.x+=10;
}
if(keyDown("left")){
Player.x-=10;
}
  }
  if(GameState==="lost"){
  textSize(100)
  fill("blue")
    text("YouLost",400,400)
  ZombieGroup.destroyEach()
  Player.destroy();
  }
  else if(GameState==="won"){
    textSize(100)
    fill("blue")
      text("YouWin",400,400)
    ZombieGroup.destroyEach()
    Player.destroy();
  }
  else if(GameState==="bullet"){
    textSize(100)
    fill("blue")
      text("YouRanOutOfBullet",400,400)
    BulletGroup.destroyEach();
      ZombieGroup.destroyEach();
    Player.destroy();
  }
}

function enemy(){
if(frameCount%50===0){
Zombie = createSprite(random(500,2000),random(100,500),40,40)
Zombie.addImage(ZombieImg)
Zombie.scale = 0.15;
Zombie.velocityX=-5
Zombie.lifetime=400;
ZombieGroup.add(Zombie)
}


}