/* MY WEBCAM IS 640x480 */
// Author: Billy Henry
// Date Uploaded: 5/1/2020
// Course: CSC-363, Spring 2020
// Description: Interactive Coloring book application using p5.js and tracking.js

// GLOBALS
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
// Called in preload() as built in to p5
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
  PatternGallery = loadImage("assets/Patterns_.jpg");
}

// Create initial canvas
function setup() 
{
  createCanvas(w,h);
  //Set starting image to main menu screen
  currentImg = MainMenu;
  capture = createCapture(VIDEO); //capture the webcam
  // Place webcam in top left on canvas
  capture.position(0,0);
  // Hide capture
  capture.style('opacity',0);
  capture.id("myVideo");
  // set capture size to the same size as the screen
  capture.size(w,h);
  // set the color to track
  colors = new tracking.ColorTracker(['yellow']);

  // start the tracking of the colors above on the camera in p5
  tracking.track('#myVideo', colors); 

  //start detecting the tracking
  colors.on('track', function(event) 
  { //this happens each time the tracking happens
      trackingData = event.data; // break the trackingjs data into a global so we can access it with p5
  });

}

// Continuously draw to p5 canvas
function draw() 
{
  // Draw the image to the canvas
  image(currentImg,0,0,w,h);

  // Menu screens are bypassed, begin tracking algorithm
  if(mode > 4)
  {
    // Unhide the RGB sliders in the top left
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
    
    // Set the stroke color using vals from RGB sliders
    stroke(r,g,b);
    // Width of stroke can be adjusted here
    strokeWeight(50);
    if(trackingData)
    {
      // Find brightest consecutive points, and draw a line
      // connecting them
      var best = findPoint(trackingData);
      var next = findPoint(trackingData);
      line(best.x,best.y,next.x,next.y);
    }
  }
}

// Creates the sliders for RGB
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
 // Advance from main menu
 if(keyCode==ENTER)
 {
   background(255);
   currentImg = Gallery;
   mode = 1;
 }
 // Go back to main menu
 if(keyCode==ESCAPE)
 {
   background(255);
   currentImg = MainMenu;
   mode = 0;
 }
}

// Algorithm used for detecting the most yellow point
function findPoint()
{
  // Create vector to hold x,y coords
  var bestPoint = createVector(0,0);
  var x,y;
  // Loop through all tracking data from tracking.js
  for (var i = 0; i < trackingData.length; i++)
  {
    // Create x,y coords after scaling capture to canvas
    x = abs((trackingData[i].x)-w);
    y = trackingData[i].y;
  }
  bestPoint.set(x,y);
  return bestPoint;
}

// Menu navigation system
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
