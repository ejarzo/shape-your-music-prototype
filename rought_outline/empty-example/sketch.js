var START_FREQ = 220;
var ACTIVE_SHAPE = new Shape(START_FREQ);
var shapes = [];

function setup() {
  createCanvas(1000, 650);
  stroke(2); 
  fill(0);
}

function draw() {

}

function mouseClicked() {
    // TODO within canvas bounds
    if (mouseX > 0 && mouseY > 0) {
        ACTIVE_SHAPE.append(mouseX, mouseY);
    };
}

function complete_shape() {
    var s = ACTIVE_SHAPE.complete_shape();
    shapes.push(s);
    //console.log(shapes);
    new_shape();
}

function play_all(){
    // TODO for all shapes....
    var temp_list = shapes;
    if (ACTIVE_SHAPE.length()>1) {
        temp_list.push(ACTIVE_SHAPE);
    };
    console.log(temp_list);
    for (var i = shapes.length - 1; i >= 0; i--) {
        play_shape(temp_list[i]);
    };
}

function play_shape(shape){
    shape.play();
}

function stop_all(){
    IS_PLAYING = false;
}

function new_shape(){
    ACTIVE_SHAPE = new Shape(START_FREQ);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        play_shape(ACTIVE_SHAPE);
    }    
    if (keyCode === RIGHT_ARROW) {
        stop_shape(ACTIVE_SHAPE);
    }    
}
