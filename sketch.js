var dog,dogImg1,dogImg2;
var database;
var foodStock;
var foodS;

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
  
}

function setup() {
  createCanvas(800, 700);
  
  dog = createSprite(400,350);
  dog.addImage(dogImg1);
  
  dog.scale = 0.4;

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
    
}


function draw() {    
  background("green")

   if(keyWentDown(UP_ARROW)){
    updateFood(foodS);
    dog.addImage(dogImg2)
  }

  drawSprites();
  //add styles here
  textSize(30)
  fill("white")
  text("Food Remaining: "+foodS,250,150)

}

function readStock(data){
  foodS = data.val(); 
}
function updateFood(food){
  if(food<= 0){
    food = 0;
  }
  else{food = food-1}
  database.ref("/").update({
    Food:food
  })
}
 
