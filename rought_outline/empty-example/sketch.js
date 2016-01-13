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
var freq = 110;
var theta = 0;

function mouseClicked() {
    var len  = 0;
    var n;
    if (ACTIVE_SHAPE.is_empty()) {
        line(mouseX, mouseY, mouseX, mouseY);
        n = new Node(mouseX, mouseY, len, del, freq);
    }
    else if (ACTIVE_SHAPE.length() < 2) {
        line(prev_n.x, prev_n.y, mouseX, mouseY);
        len  = dist(prev_n.x, prev_n.y, mouseX, mouseY) / 200;
        n = new Node(mouseX, mouseY, len, del, freq);
    }
    else {
        line(prev_n.x, prev_n.y, mouseX, mouseY);
        len  = dist(prev_n.x, prev_n.y, mouseX, mouseY) / 200;
        console.log(count);
        n = new Node(mouseX, mouseY, len, del, freq);

        theta = angle_of_intersection(ACTIVE_SHAPE.at(count-1),ACTIVE_SHAPE.at(count-2),n)
        n.freq *= theta;

    }

    ACTIVE_SHAPE.append(n);


    del += len

    
    prev_n = n;


    count++;
}

function angle_of_intersection (p1,p2,p3) {
    var x1 = p1.x 
    var y1 = p1.y
    var x2 = p2.x 
    var y2 = p2.y
    var x3 = p3.x 
    var y3 = p3.y

    return acos((pow(dist(x1,y1,x2,y2), 2) + pow(dist(x1,y1,x3,y3), 2) - pow(dist(x2,y2,x3,y3), 2)) / (2 * dist(x1,y1,x2,y2) * dist(x1,y1,x3,y3)))
}

function new_frequency(freq, theta) {
    if (theta > HALF_PI) {
       /* theta = theta / -2;*/
    };
    console.log(theta);

}

function play_shape(){
     for (var i = 1; i < ACTIVE_SHAPE.length(); i++) {
       // console.log(delay);
        //delays(delay[i]*1000.0);
        ACTIVE_SHAPE.at(i).play();
        //setTimeout(nodes[i].play(), 5000);

    };
}

function keyPressed() {
if (keyCode === LEFT_ARROW) {
    play_shape();
  }    
}
