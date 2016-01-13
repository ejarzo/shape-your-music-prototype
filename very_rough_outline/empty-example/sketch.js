// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com
//"use strict"
// Example 1-1: stroke and fill

var nodes = [];

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

function mouseClicked() {
    var len  = 0;
    
    if (prev_n) {
        line(prev_n.x, prev_n.y, mouseX, mouseY);
        len  = dist(prev_n.x, prev_n.y, mouseX, mouseY) / 200;
        //console.log(len);
    }
    else {
        line(mouseX, mouseY, mouseX, mouseY);
    }
    //console.log(len);
    var n = new Node(mouseX, mouseY, len, del, freq);

    console.log(nodes);
    nodes.push(n);
    console.log(count);

    if(nodes.length >= 3) {
        var theta = angle_of_intersection(nodes[count-1],nodes[count-2],nodes[count]);
        console.log(new_frequency(freq, theta))
        freq += theta*100;
    }

    del += len

    
    prev_n = n;
    
    //console.log(nodes);

    //console.log(nodes.length);

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

function delays(ms) {
    var cur_d = new Date();
    var cur_ticks = cur_d.getTime();
    var ms_passed = 0;
    while(ms_passed < ms) {
        var d = new Date();  // Possible memory leak?
        var ticks = d.getTime();
        ms_passed = ticks - cur_ticks;
        // d = null;  // Prevent memory leak?
    }
}

function play_shape(){
     for (var i = 1; i < nodes.length; i++) {
       // console.log(delay);
        //delays(delay[i]*1000.0);
        nodes[i].play();
        //setTimeout(nodes[i].play(), 5000);

    };
}

function keyPressed() {
if (keyCode === LEFT_ARROW) {
    play_shape();
  }    
}
