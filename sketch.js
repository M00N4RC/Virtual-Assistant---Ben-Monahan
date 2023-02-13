//speech variables
let speechRec;
let speechGen;

let speaking = false;
let listening = false;

// calling data from weather open soruce api with URL
var weather;
var api = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&APPID=00400fa79c76538700580ea8c8bf2a39";
var units = "&units=metric";
var img;
var Btnimg;

var search;
var Notes;
var files;
let Wbutton;

var input;
var input1;
var Vinput;
var img1;

let font1;

// Start the speech recognition
function startRecognition() {
  speechRec = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
  speechRec.onResult = gotSpeech; // say what function to call when we hear something
  speechRec.onEnd = restartRecognition; // what to happen when the speech recognition stops
  continuous = false;
  interim = false;
  speechRec.start(continuous, interim); // start listening
  listening = true;
}
// Restart the speech recognition when you stop speaking
function restartRecognition() {
  //print("restart")
  speechRec.start();
  listening = false;
}
function startGeneration() {
  speechGen = new p5.Speech(); // speech synthesis object
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //calls functions
  startRecognition();
  startGeneration();

  //buttons Show/Hide for Weather
  button = createImg("Openbtn.png");
  button.position(windowWidth / 1.74, 625);
  button.mousePressed(Hide1);
  button.size(40, 40);
  scale(1);

  button = createImg("Closebtn.png");
  button.position(windowWidth / 1.79, 632);
  button.mousePressed(Show1);
  button.size(30, 30);
  scale(1);
  //inversed one

  //buttons Show/Hide for Time and date
  button = createImg("Closebtn.png");
  button.position(windowWidth / 1.84, 550);
  button.mousePressed(Hide2);
  button.size(30, 30);
  scale(1);

  button = createImg("Openbtn.png");
  button.position(windowWidth / 1.8, 520);
  button.mousePressed(Show2);
  button.size(40, 40);
  scale(1);

  //buttons Show/Hide for links
  button = createImg("Openbtn.png");
  button.position(windowWidth / 2.05, 460);
  button.mousePressed(Show3);
  button.size(40, 40);
  scale(1);

  button = createImg("Closebtn.png");
  button.position(windowWidth / 2.04, 500);
  button.mousePressed(Hide3);
  button.size(30, 30);
  scale(1);

  //buttons Show/Hide for Notes
  button = createImg("Openbtn.png");
  button.position(windowWidth / 2.35, 520);
  button.mousePressed(Show4);
  button.size(40, 40);
  scale(1);

  button = createImg("Closebtn.png");
  button.position(windowWidth / 2.26, 550);
  button.mousePressed(Hide4);
  button.size(30, 30);
  scale(1);

  //buttons Show/Hide for google search
  button = createImg("Openbtn.png");
  button.position(windowWidth / 2.46, 625);
  button.mousePressed(Show5);
  button.size(40, 40);
  scale(1);

  button = createImg("Closebtn.png");
  button.position(windowWidth / 2.34, 632);
  button.mousePressed(Hide5);
  button.size(30, 30);
  scale(1);

  //buttons Show/Hide for files
  button = createImg("Openbtn.png");
  button.position(windowWidth / 2.35, 740);
  button.mousePressed(Show6);
  button.size(40, 40);
  scale(1);

  button = createImg("Closebtn.png");
  button.position(windowWidth / 2.26, 720);
  button.mousePressed(Hide6);
  button.size(30, 30);
  scale(1);

  angleMode(DEGREES); //set the angle/value of the desired shape to degrees

  //calls html square to cover time & date and weather, acting as if it has been closed
  Cover1 = select("#cover1");
  col1 = color(0);
  Cover1.size(450, 505);
  Cover1.position(windowWidth / 1.33, 440);
  Cover1.style("background-color", col1);

  Cover2 = select("#cover2");
  col1 = color(0);
  Cover2.size(400, 350);
  Cover2.position(windowWidth / 1.268, 80);
  Cover2.style("background-color", col1);

  //links to different websites
  link1 = createA("http://youtube.com/", "YouTube", "_blank");
  link1.position(windowWidth / 3.2, 60);
  link1.style("font-size", "20px");
  link1.style("color:#2196F3");
  link1.style("font-family", "Orbitron");
  link1.hide();

  link2 = createA("http://discord.com/", "Discord", "_blank");
  link2.position(windowWidth / 2.1, 60);
  link2.style("font-size", "20px");
  link2.style("color:#2196F3");
  link2.style("font-family", "Orbitron");
  link2.hide();

  link3 = createA("http://netflix.com/", "Netflix", "_blank");
  link3.position(windowWidth / 1.55, 60);
  link3.style("font-size", "20px");
  link3.style("color:#2196F3");
  link3.style("font-family", "Orbitron");
  link3.hide();

  //calls html text box which acts as a note pad
  Notes = select("#notes");
  col1 = color(0);
  Notes.style("font-size", "20px");
  Notes.style("color:#2196F3");
  Notes.style("font-family", "Orbitron");
  Notes.style("background-color", col1);
  Notes.style("border: 1px solid #2196F3");
  Notes.size(350, 300);
  Notes.position(windowWidth / 0, 75);
  Notes.hide();

  search = select("#search");
  col1 = color(0);
  search.size(450, 300);
  search.position(windowWidth / 0, 390);
  search.style("border: 1px solid #2196F3");
  search.hide();

  //calls html iframe of google drive folder
  files = select("#Files");
  col1 = color(0);
  files.size(350, 400);
  // files.style("background-color", col);
  files.position(windowWidth / 0, 705);
  files.style("border: 1px solid #2196F3");
  files.hide();

  //enter button for weather
  Wbutton = select("#enter");
  col = color(0);
  Wbutton.style("font-size", "24px");
  Wbutton.style("color:#2196F3");
  Wbutton.style("font-family", "Orbitron");
  Wbutton.style("background-color", col);
  Wbutton.position(windowWidth / 1.29, 490);
  Wbutton.mousePressed(weatherAsk);
  Wbutton.hide();

  //input/search bar to search for cities weather
  input = select("#city");
  input.hide();
}

// creating an input to show text of what both the user and jarvis are saying
function gotSpeech() {
  if (speechRec.resultValue) {
    Vinput = createInput(speechRec.resultString);
    col1 = color(0);
    Vinput.position(windowWidth / 1.3, 950);
    Vinput.size(400, 100);
    Vinput.style("font-size", "20px");
    Vinput.style("color:#2196F3");
    Vinput.style("font-family", "Orbitron");
    Vinput.style("background-color", col1);
    Vinput.style("border: 1px solid #2196F3");
  }
  // Get what was said
  said = speechRec.resultString.toLowerCase();

  // Reply to it
  replyTo(said);
}

// Reply to what was said
function replyTo(said) {
  print(said);

  // Based on what was said, say something back
  if (said.includes("good morning jarvis")) {
    speechGen.speak("Goodmorning sir");
  } else if (said.includes("open google drive")) {
    speechGen.speak("yes sir");
    window.open("https://drive.google.com/drive/my-drive");
  } else if (said.includes("open google")) {
    speechGen.speak("Yes sir");
    window.open("https://www.google.com");
  } else if (said.includes("goodnight jarvis")) {
    speechGen.speak("Goodnight sir, sleep well");
  } else if (said.includes("hello jarvis")) {
    speechGen.speak("hello sir, how can I assist you");
  } else if (said.includes("open weather")) {
    speechGen.speak("Yes, sir");
    Cover1.hide();
    Wbutton.show();
    input.show();
  } else if (said.includes("close weather")) {
    speechGen.speak("Yes, sir");
    Cover1.show();
    Wbutton.hide();
    input.hide();
  } else if (said.includes("show time")) {
    speechGen.speak("yes, sir");
    Cover2.hide();
  } else if (said.includes("close time")) {
    speechGen.speak("yes, sir");
    Cover2.show();
  } else if (said.includes("open links")) {
    speechGen.speak("yes, sir");
    link1.show();
    link2.show();
    link3.show();
  } else if (said.includes("close links")) {
    speechGen.speak("yes, sir");
    link1.hide();
    link2.hide();
    link3.hide();
  } else if (said.includes("open notepad")) {
    speechGen.speak("yes, sir");
    Notes.show();
  } else if (said.includes("close notepad")) {
    speechGen.speak("yes, sir");
    Notes.hide();
  } else if (said.includes("open search")) {
    speechGen.speak("yes, sir");
    search.show();
  } else if (said.includes("close search")) {
    speechGen.speak("yes, sir");
    search.hide();
  } else if (said.includes("open files")) {
    speechGen.speak("yes, sir");
    files.show();
  } else if (said.includes("close files")) {
    speechGen.speak("yes, sir");
    files.hide();
  }
}

function preload() {
  font1 = loadFont("Orbitron.ttf"); //loads external files to be called (font file)
  ing = createImg("CntrDesign.png");
  gif = createImg("2RNb.gif");
}

//gets JSON data from the variable 'URL' (API), specifcially the api key, the type of measurement (units) and the input value for the weather search bar
function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  //print if it has retrieved data
  weather = data;
}

function draw() {
  background(0);

  //sizing and position of GIF and image of arc rings in center circle
  push();
  ing.position(windowWidth / 2.60, 449);
  ing.size(388, 390);
  pop();

  push();
  gif.position(windowWidth / 2.2, 548);
  gif.size(190, 190);
  pop();

  //Center Circle
  strokeWeight(5);
  stroke(0, 153, 255);
  noFill();
  scale(1);
  ellipse(windowWidth / 2, 597, 400);

  //time/clock boarder
  strokeWeight(1);
  stroke(0, 153, 255);
  noFill();
  rect(windowWidth / 1.267, 30, 360, 350);

  //weather boarder
  strokeWeight(1);
  stroke(0, 153, 255);
  noFill();
  rect(windowWidth / 1.3, 390, 400, 500);

  //digital clock
  //declaring time variables
  let hr = hour();
  let min = minute();
  let sec = second();

  //declared other time variables
  let dy = day();
  let mnth = month();
  let yr = year();

  //simple text function to place time variables, seperated by semi-colon's.
  fill(0, 153, 255);
  noStroke(0);
  textSize(30);
  //calls specific font
  textFont(font1);
  text("TIME", windowWidth / 1.163, 160);
  text(hr + ":" + min + ":" + sec, windowWidth / 1.185, 190);

  fill(0, 153, 255);
  noStroke();
  textSize(20);
  text("DATE", windowWidth / 1.155, 230);
  text(dy + ":" + mnth + ":" + yr, windowWidth / 1.175, 255);

  //analog clock
  strokeWeight(4);
  noFill();
  stroke(0, 153, 255);
  //maps the number of seconds (sec) which goes between 0 & 60 to between 0 & 360
  let end1 = map(sec, 0, 60, 0, 360);
  arc(windowWidth / 1.135, 195, 300, 300, 0, end1); //arc is another draw function

  stroke(0, 102, 204);
  let end2 = map(min, 0, 60, 0, 360);
  arc(windowWidth / 1.135, 195, 280, 280, 0, end2); //different measurements to get different levels

  stroke(0, 0, 255);
  let end3 = map(hr, 0, 60, 0, 360);
  arc(windowWidth / 1.135, 195, 260, 260, 0, end3);

  //display text to indicate what the different values are
  fill(0, 153, 255);
  noStroke();
  textSize(20);
  textFont(font1);
  text("Temperature", windowWidth / 1.26, 520);
  text("Humidity", windowWidth / 1.26, 620);
  text("Minimum Temperature", windowWidth / 1.26, 720);
  text("Maximum Temperature", windowWidth / 1.26, 820);

  //taking JSON data and creating variables
  if (weather) {
    let temp = weather.main.temp;
    let humidity = weather.main.humidity;
    let tempMin = weather.main.temp_min;
    let tempMax = weather.main.temp_max;
    text(temp, windowWidth / 1.26, 560);
    text(humidity, windowWidth / 1.26, 660);
    text(tempMin, windowWidth / 1.26, 760);
    text(tempMax, windowWidth / 1.26, 860);
  }
  //design the input for weather search bar
  input.style("font-size", "24px");
  input.style("border: 1px solid #2196F3");
  input.style("color: #2196F3;");
  input.style("font-family", "Orbitron");
  input.position(windowWidth / 1.29, 450);
}

//all the show and hide button functions
function Hide1() {
  Cover1.hide();
  Wbutton.show();
  input.show();
}

function Show1() {
  Cover1.show();
  Wbutton.hide();
  input.hide();
}

function Hide2() {
  Cover2.show();
}

function Show2() {
  Cover2.hide();
}

function Show3() {
  link1.show();
  link2.show();
  link3.show();
}

function Hide3() {
  link1.hide();
  link2.hide();
  link3.hide();
}

function Show4() {
  Notes.show();
}

function Hide4() {
  Notes.hide();
}
function Show5() {
  search.show();
}

function Hide5() {
  search.hide();
}
function Show6() {
  files.show();
}

function Hide6() {
  files.hide();
}

//resizes window to different screens
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
