/* MY WEBCAM IS 640x480 */
let mode = 0;
var colors;
var r, g, b, sw;
var sliderR, sliderG, sliderB, sliderSW;
var showSliders = false;
var capture;
var trackingData;
var w = 1280;
var h = 600;
let Beach, Mountains, Town, Dandelion, PandaPansy, TigerLily, Fruits, Veggies, Leaves, MainMenu, Gallery;
let FlowerGallery, LandscapeGallery, PatternGallery;
var currentImg;
var showSliders = false;
let trail = [];

// Load the coloring pages
function preload()
{
  Beach = loadImage("assets/Beach.png");
  Mountains = loadImage("assets/Moutains.png");
  Town = loadImage("assets/Town.png");
  Dandelion = loadImage("assets/Dandelion.png");
  PandaPansy = loadImage("assets/PandaPansy.png");
  TigerLily = loadImage("assets/Tiger_Lily.png");
  Fruits = loadImage("assets/Fruit_Pattern.png");
  Veggies = loadImage("assets/Veggies.png");
  Leaves = loadImage("assets/Leaves.png");
  MainMenu = loadImage("assets/Interface_Main_Page.jpg");
  Gallery = loadImage("assets/Interface_Gallery.jpg");
  FlowerGallery = loadImage("assets/Flower_Category.jpg");
  LandscapeGallery = loadImage("assets/Landscape_Category.jpg");
  PatternGallery = loadImage("assets/Flower_Category.jpg");
}

function setup() 
{
  createCanvas(w,h);
  currentImg = MainMenu;
  capture = createCapture(VIDEO); //capture the webcam
  capture.position(0,0); //move the capture to the top left
  capture.style('opacity',0);// use this to hide the capture later on (change to 0 to hide)...
  capture.id("myVideo"); //give the capture an ID so we can use it in the tracker below.
  capture.size(w,h);
  colors = new tracking.ColorTracker(['yellow']);

  tracking.track('#myVideo', colors); // start the tracking of the colors above on the camera in p5

  //start detecting the tracking
  colors.on('track', function(event) 
  { //this happens each time the tracking happens
      trackingData = event.data; // break the trackingjs data into a global so we can access it with p5
  });

}

function draw() 
{
  image(currentImg,0,0,w,h);
  print("X = " + mouseX);
  print("Y = " + mouseY);
  if(mode > 4)
  {
    if(!showSliders)
    {
      createUI();
      showSliders = true;
    }
  
    // Continually update values from RGB Sliders
    r = sliderR.value();
    g = sliderG.value();
    b = sliderB.value();  
    // print text labels
    //text('R: '+r,160,35);
    //text('G: '+g,160,55);
    //text('B: '+b,160,75);
    
    //fill(r,g,b);
    stroke(r,g,b);
    strokeWeight(50);
    if(trackingData)
    {
      var best = findPoint(trackingData);
      var next = findPoint(trackingData);
      line(best.x,best.y,next.x,next.y);
      /*trail.push([best.x,best.y]);
      
      for (let i = 0; i < trail.length; i++)
      {
        noStroke();
        ellipse(trail[i][0], trail[i][1], 16);
      }*/
    }
  }
}

function createUI()
{
  // create some sliders
  sliderR = createSlider(0, 255, 0);
  sliderR.position(20, 20);

  sliderG = createSlider(0, 255, 0);
  sliderG.position(20, 40);

  sliderB = createSlider(0, 255, 155);
  sliderB.position(20, 60); 
}

function keyPressed()
{
 if(keyCode==ENTER)
 {
   background(255);
   currentImg = Gallery;
   mode = 1;
 }
 if(keyCode==ESCAPE)
 {
   background(255);
   currentImg = MainMenu;
   mode = 0;
 }
 if(keyCode == UP_ARROW)
 {
   r = 0;
   g = 0;
   b = 150;
 }
}

function findPoint()
{
  var bestPoint = createVector(0,0);
  var x,y;
  for (var i = 0; i < trackingData.length; i++)
  {
    //x = abs((trackingData[i].x*2)-w);
    //y = trackingData[i].y*2;
    x = abs((trackingData[i].x)-w);
    y = trackingData[i].y;
  }
  bestPoint.set(x,y);
  return bestPoint;
}

function mouseClicked()
{
  if(mode == 1)
  {
    if (mouseX < 450 && mouseX > 150)
    {
      if (mouseY < 480 && mouseY > 320)
      {
        background(255);
        mode = 2;
        currentImg = FlowerGallery;
      }
    }
    if (mouseX < 800 && mouseX > 490)
    {
      if (mouseY < 480 && mouseY > 320)
      {
        background(255);
        mode = 3;
        currentImg = LandscapeGallery;
      }
    }
    if (mouseX < 1150 && mouseX > 850)
    {
      if (mouseY < 480 && mouseY > 320)
      {
        background(255);
        mode = 4;
        currentImg = PatternGallery;
      }
    }  
  }
  if(mode == 2)
  {
    if (mouseX < 450 && mouseX > 150)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 5;
        currentImg = TigerLily;
        trail = [];
      }
    }
    if (mouseX < 800 && mouseX > 490)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 6;
        currentImg = Dandelion;
        trail = [];
      }
    }
    if (mouseX < 1150 && mouseX > 850)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 7;
        currentImg = PandaPansy;
        trail = [];
      }
    }  
  }
  if(mode == 3)
  {
    if (mouseX < 450 && mouseX > 150)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 8;
        currentImg = Beach;
        trail = [];
      }
    }
    if (mouseX < 800 && mouseX > 490)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 9;
        currentImg = Mountains;
        trail = [];
      }
    }
    if (mouseX < 1150 && mouseX > 850)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 10;
        currentImg = Town;
        trail = [];
      }
    }  
  }
  if(mode == 4)
  {
    if (mouseX < 450 && mouseX > 150)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 11;
        currentImg = Fruits;
        trail = [];
      }
    }
    if (mouseX < 800 && mouseX > 490)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 12;
        currentImg = Veggies;
        trail = [];
      }
    }
    if (mouseX < 1150 && mouseX > 850)
    {
      if (mouseY < 300 && mouseY > 190)
      {
        background(255);
        mode = 13;
        currentImg = Leaves;
        trail = [];
      }
    }  
  }
}
