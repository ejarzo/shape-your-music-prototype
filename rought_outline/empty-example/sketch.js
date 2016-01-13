// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com
//"use strict"
// Example 1-1: stroke and fill


var shape1 = new Shape(110);
var ACTIVE_SHAPE = shape1;

function setup() {
  createCanvas(1000, 650);
  stroke(2); 
  fill(0);
}

var value = 0;
function draw() {

}

var prev_n;
var count = 0;
var del = 0;
var freq = 440;
var theta = 0;

function mouseClicked() {
    if (mouseX > 0 && mouseY > 0) {
        ACTIVE_SHAPE.append(mouseX, mouseY);
    };
}

function complete_shape(shape) {
    ACTIVE_SHAPE.complete_shape()
}


function angle_of_intersection (p1,p2,p3) {
    var x1 = p1.x 
    var y1 = p1.y
    var x2 = p2.x 
    var y2 = p2.y
    var x3 = p3.x 
    var y3 = p3.y

    return acos((pow(dist(x1,y1,x2,y2), 2) + pow(dist(x1,y1,x3,y3), 2) 
            - pow(dist(x2,y2,x3,y3), 2)) / (2 * dist(x1,y1,x2,y2) * dist(x1,y1,x3,y3)))
}

function new_frequency(freq, theta) {
    if (theta > HALF_PI) {
       /* theta = theta / -2;*/
    };
    console.log(theta);

}

function play_shape(shape){
    shape.play();
}

function stop_shape(shape){
    shape.stop_playback();
}

function keyPressed() {
if (keyCode === LEFT_ARROW) {
    play_shape(ACTIVE_SHAPE);
  }    
if (keyCode === RIGHT_ARROW) {
    stop_shape(ACTIVE_SHAPE);
  }    
}


function play_all(){
    play_shape(ACTIVE_SHAPE);
}

