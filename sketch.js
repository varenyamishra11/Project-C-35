var dog,happyDog,dogg;
var dogImg,database,foodS,foodStock;

var lastFed,food;
var feedTime
var feed,addFood;

function preload(){
    dogImg = loadImage("Dog.png")
    dogg = loadImage("DogSleeping.png")
    happyDog= loadImage("happydog.png")
}

function setup() {
   createCanvas(700, 600);
    database=firebase.database();
    foodStock=database.ref('food');
    dog = createSprite(250,250,10,10);
    dog.addImage(dogImg)

    foodStock.on("value",readStock);
    food=new Foods(290,100,50,50)

    feedTime=database.ref('feedTime')
    feedTime.on("value",function(data){
        lastFed=data.val();
    })

    feed=createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
	  
  
}


function draw() {  
  background(46, 139, 87)
  dog.scale = 0.3
  food.display();
/*if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDog);
}

  if(keyWentDown(DOWN_ARROW)){
    writeStockk(foodS)
    dog.addImage(happyDog);
  */

  
  drawSprites();
  stroke("magenta")
  
  textSize(20)
  fill(255,255,254);
        textSize(15)
        if (lastFed>=12) {
            text("Last Feed : "+lastFed%12 + "PM",350,30)
        }else{
            text("Last Feed : "+lastFed+ "AM",350,30)           
        } 

        
    
  /*text("NOTE : Press UP_ARROW Key To Feed Drago Milk!",20,50)
  text("NOTE : Press DOWN_ARROW Key To Refill the milk!",20,400)
  text("Food left :"+ foodS,200,100)*/
  //foodS.update



  //add styles here

}

function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Foods:food.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodStock)
}

function writeStock(x){
  if (x<=0) {
    x=0;
  }else{

    x=x-1
  }

  database.ref('/').update({
    food:x
    
  })
}


function writeStockk(x){
  if (x<=0) {
    x=x+20
  }
    /*gameState="none"
    text("Oh I need to go to sleep now",20,120)
    dog.addImage(dogg)*/
  /*}else{

    x=x+1
    //gameState="some"

  }
if (gameState==="some") {
  x=20
}*/

  database.ref('/').update({
    food:x
  })
}

function showError(){
  console.log("Error in writing to the database");
}



