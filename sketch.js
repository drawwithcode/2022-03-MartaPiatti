let myCapture,
  wSize,
  hSize,
  vanity,
  guides = 0,
  wigStand,
  selection = 0,
  hideFilter,
  wEffects,
  hEffects,
  vanityH,
  blingNoise,
  screenNoise,
  fillTesto = "white",
  switchX,
  switchY;

let effects = [],
  effectNames = [];

function preload() {
  //array containing the filters pictures
  effectNames = [
    loadImage("./assets/empty.png"),
    loadImage("./assets/glasses1.png"),
    loadImage("./assets/glasses2.png"),
    loadImage("./assets/hat1.png"),
    loadImage("./assets/hat2.png"),
  ];

  //preloading the pictures and the sounds for the code
  vanity = loadImage("./assets/vanity.png");
  wigStand = loadImage("./assets/wigstand.png");
  blingNoise = loadSound("./assets/audio/magic.mp3");
  screenNoise = loadSound("./assets/audio/screenshot.mp3");
}

function setup() {
  //create the capute and setting its size
  myCapture = createCapture(VIDEO);
  myCapture.hide();
  wSize = windowWidth / 2;
  hSize = (3 * windowWidth) / 8;
  wEffects = (wSize / 3.3) * 1.63;
  hEffects = hSize * 0.55 * 1.51;
  //adding the different filters to the array
  for (let i = 0; i < 5; i++) {
    effects.push(
      new Filters(
        effectNames[i],
        windowWidth / 2 - wEffects / 2,
        windowHeight / 2 - hEffects / 2,
        wEffects,
        hEffects
      )
    );
  }
  vanityH = windowWidth / 1.6;
  //creating the switch button using an image and the size and position relative to the vanity
  switchX = windowWidth / 1.5;
  switchY = (windowHeight - vanityH) / 2 + vanityH * 0.66;
  switchFilter = createImg("./assets/wigstand.png");
  switchFilter.size(windowWidth / 9.6, (windowWidth / 9.6) * 1.52);
  switchFilter.position(switchX, switchY);
  //function when the image is pressed to cchange the filter
  switchFilter.mousePressed(changeFilter);
  switchFilter.hide();
  //creating a button to hide the guides and setting a function for when is pressed
  hideFilter = createButton("GUIDES");
  hideFilter.style("border", "0");
  hideFilter.style("border-radius", "4px");
  hideFilter.style("color", "white");
  hideFilter.style("background-color", "rgb(255,69,174)");
  hideFilter.position(10, 10);
  hideFilter.mousePressed(hideGuides);
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background("#26666B");
  wSize = windowWidth / 2;
  hSize = (3 * windowWidth) / 8;
  push();
  translate(width, 0);
  //flip the camera image
  scale(-1, 1);
  image(myCapture, windowWidth / 4, (windowHeight - hSize) / 2, wSize, hSize);
  pop();
  if (guides == 0) {
    strokeWeight(4);
    stroke("rgba(255,69,174,0.5)");
  } else {
    noStroke();
  }
  push();
  noFill();
  //frawing the guide
  ellipse(windowWidth / 2, windowHeight / 2, wSize / 3.3, hSize * 0.55);
  pop();
  effects[selection].show();
  vanityH = windowWidth / 1.6;
  image(vanity, 0, (windowHeight - vanityH) / 2, windowWidth, vanityH);
  switchFilter.show();
  hideFilter.show();
  textSize(15);
  noStroke();
  fill(fillTesto);
  text("Press S to save a picture", 10, 50);
  text("Press the mannequin to add filters", 10, 70);
}

//classs that defines the structure of a filter
class Filters {
  constructor(filterAsset, positionX, positionY, sizeW, sizeH) {
    this.a = filterAsset;
    this.x = positionX;
    this.y = positionY;
    this.w = sizeW;
    this.h = sizeH;
  }

  show() {
    image(this.a, this.x, this.y, this.w, this.h);
  }
}

//when the wigstand is pressed it uploads the next filter in the array and it plays a sound. When the slection equals 5 the counter is restored
function changeFilter() {
  selection++;
  blingNoise.play();
  if (selection == 5) {
    selection = 0;
  }
}

//it checks if the guides are active and if they are it hides them and the text, otherwise it makes the visible
function hideGuides() {
  if (guides == 0) {
    guides = 1;
    fillTesto = "#26666B";
  } else {
    guides = 0;
    fillTesto = "white";
  }
}

//if the key s is pressed the image contained in the window is saved with the name "NewLook.png" and a sound is played
function keyPressed() {
  if (key == "s") {
    save("NewLook.png");
    screenNoise.play();
  }
}

//updates each element's position and size based on the current windowWidth and windowHeight
function windowResized() {
  vanityH = windowWidth / 1.6;
  wEffects = (wSize / 3.3) * 1.63;
  hEffects = hSize * 0.55 * 1.51;
  //it changes the position and size of each element contained in the array
  for (let i = 0; i < effects.length; i++) {
    effects[i].x = windowWidth / 2 - wEffects / 2;
    effects[i].y = windowHeight / 2 - hEffects / 2;
    effects[i].w = wEffects;
    effects[i].h = hEffects;
  }
  switchX = windowWidth / 1.5;
  switchY = (windowHeight - vanityH) / 2 + vanityH * 0.66;
  switchFilter.size(windowWidth / 9.6, (windowWidth / 9.6) * 1.52);
  switchFilter.position(switchX, switchY);
}
