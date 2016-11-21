var allTheText;
var rs;
var risingWords = [];
var frame = 0;
var u = 1;

function preload(){
  allTheText = loadStrings( "data/adc.txt"); //loads lyrics from data folder
  rs = loadFont( "data/NexaRustScriptL.otf");//loads fonts from data folder 
}
function setup() {
  createCanvas(1000, 1000);
  makeWords(allTheText[0], 20);//create each word from first line of lyrics
  frameRate(60);
  
}

function draw() {
  background(255);
  for( var i = 0; i < risingWords.length; i++){//going through every word in array
    risingWords[i].rise();
    risingWords[i].display();
  }
  frame += 1;
  if( frame > 60){// every second
    frame = 0;
    makeWords(allTheText[u], (u+1) * 20);//next line of words with next resting y position
    u += 1;
  }
}

function Word(x, y, txt, restY){//create class for string
  // x = x position of x string
  //y = y position of y string
  //restY = restingY of word
  this.position = createVector(x, y);
  this.velocity = createVector();
  this.accel = createVector(0, -1);
  this.txt = txt;
  this.restY = restY;
}

Word.prototype.rise = function(){//rising word
  if( this.position.y <= this.restY){//if words go beyond restingY words stop moving
    this.velocity.y = 0;
    this.position.y = this.restY;
  }
  else{//if words are under restingY add words keep moving faster
    this.velocity.add(this.accel);
    this.position.add(this.velocity);
  }
}

Word.prototype.display = function(){//displaying word
  fill(0);
  textFont( rs, 20);
  text( this.txt, this.position.x, this.position.y );
}



function makeWords(line, row){ 
  //creates Word objects from spliting individual words from the line
  //row is for resting y value of lines so tha line dont overlaps
  var words = line.split(" ");
  var theX = 20;
  textFont( rs, 20);
  for( var i = 0; i < words.length; i++){
    var tw = textWidth( words[i] + " "); //get the width of the word + space
    word = new Word(theX, random(height), words[i], row); //create object
    risingWords.push(word); //add the object to global list
    theX = theX + tw; //increase x position of words so they don't overlap
  }
  
}
