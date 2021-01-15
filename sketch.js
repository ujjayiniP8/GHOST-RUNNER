var tower, towerImg;
var door, doorImg, doorGrp;
var climbers, climberImg, climberGrp;
var railing, railingImg, railingGrp;
var ghost, ghostImg;

//Game states
var gameState= "play";

function preload()
{
      towerImg = loadImage("tower.png");
      doorImg = loadImage("door.png");
      climberImg = loadImage("climber.png");
      ghostImg = loadImage("ghost-standing.png");

      //sounds
      spookySound = loadSound("spooky.wav");
  
}

function setup()
{
      createCanvas(600,600);
      spookySound.loop();
  
      tower= createSprite(300,300);
      tower.addImage("tower",towerImg);

      tower.velocityY=1;

      ghost= createSprite(250,250,20,20);
      ghost.addImage("ghost",ghostImg);
      ghost.scale=0.3;

      doorGrp= new Group();
      climberGrp= new Group();
      railingGrp= new Group();
  
}

function draw()
{
  background(0);
  if(gameState==="play")
    {
      if(keyDown("left_arrow"))
        {
          ghost.x= ghost.x-3;
        }
       if(keyDown("right_arrow"))
        {
          ghost.x= ghost.x+3;
        }
       if(keyDown("space"))
        {
          ghost.velocityY= -10; 
        }
          ghost.velocityY= ghost.velocityY+0.8;
       if(tower.y>400)
        {
          tower.y= 300; 
        }
         spawnDoors();
       if(climberGrp.isTouching(ghost))
        {
          ghost.velocityY= 0;
        }
       if(railingGrp.isTouching(ghost)||ghost.y>600)
        {
         ghost.destroy();
         gameState="end";
        }
     drawSprites()
       
    } 
  
      if(gameState==="end")
       {
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("gameOver",300,300);
       }  
}

//spawning doors
function spawnDoors()
{
  if(frameCount%240===0)
   {
    door=createSprite(200,-50);
    climber=createSprite(200,10);
    railing=createSprite(200,15);
    
    railing.width=climber.width;
    railing.height=2;
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    railing.x=door.x;
    
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    
    door.velocityY= 1;
    climber.velocityY= 1;
    railing.velocityY= 1;
    
    ghost.depth= door.depth
    ghost.depth+=1;
    
    //lifetime
    door.lifetime= 800;
    climber.lifetime= 800;
    railing.lifetime= 800;
     
    doorGrp.add(door);
    climberGrp.add(climber);
    railingGrp.add(railing);
     
    //debug
    railing.debug= true;
    
    }
}