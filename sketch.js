var balloon,balloonImg1,balloonImg2;
var backgroundImg;
var database,position;

function preload(){

  backgroundImg = loadImage("HotAirBallon-1.png");
  balloonImg = loadImage("HotAirBallon-3.png");
  balloonImg2 = loadImage("HotAirBallon-4.png");
}

function setup() {
  createCanvas(800,800);
  balloon = createSprite(400, 200, 50, 50);
  balloon.scale = 0.4;

  database = firebase.database();
  var balloonposition = database.ref("balloon/position");
    balloonposition.on("value",readPosition,showError);
}

function draw() {
  background(backgroundImg); 
  fill("black"); 
  textSize(15)
  text("Use arrow keys to move Hot Air Balloon!",12,20);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10;
  }

    if(keyDown(UP_ARROW)){
      updateposition(0,-10);
      balloon.addAnimation("hotAirBalloon",balloonImg2);
      balloon.scale = balloon.scale -0.01;
    }

    if(keyDown(DOWN_ARROW)){
      updateposition(0,10);
      balloon.addAnimation("hotAirBalloon",balloonImg1);
      balloon.scale = balloon.scale +0.01;
    }

   if(keyDown(LEFT_ARROW)){
     updateposition(-10,0);
     balloon.addAnimation("hotAirBalloon",balloonImg2);
    }

   if(keyDown(RIGHT_ARROW)){
    updateposition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImg1);
   }

   drawSprites();
}

function updateposition(x,y){
    database.ref("balloon/position").set({
      'x': position.x + x,
      'y': position.y + y
    })
}

function readposition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}