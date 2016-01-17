var SHAPES = [];
var START_FREQ = 220;
var ACTIVE_SHAPE = new Shape(START_FREQ, SHAPES.length);
var GRID_SIZE = 36;

function setup() {
  createCanvas(1046, 650);
  stroke(2); 
  fill(0);
}

function draw() {

}

// TODO 
$("html").dblclick(function() {
  complete_shape();
});

function mouseClicked() {
    // TODO within canvas bounds
    if (mouseX > 0 && mouseY > 0) {
        var x = mouseX;
        var y = mouseY;
        if ($("#snap").is(":checked")) {
            x = (Math.round(mouseX / GRID_SIZE) * GRID_SIZE);
            y = (Math.round(mouseY / GRID_SIZE) * GRID_SIZE);
        };
        ACTIVE_SHAPE.append(x, y);
    };
}

function complete_shape() {
    var s = ACTIVE_SHAPE.complete_shape();
    if (s) {
        SHAPES.push(s);
    };
    //console.log(SHAPES);
    new_shape();
}

function play_all(){
    // TODO for all SHAPES....
    var temp_list = SHAPES.slice();
    if (ACTIVE_SHAPE.length()) {
        temp_list.push(ACTIVE_SHAPE);
    };
    console.log("TEMP LIST:", temp_list);
    console.log("SHAPES:", SHAPES);

    for (var i = temp_list.length - 1; i >= 0; i--) {
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
    //if (ACTIVE_SHAPE.length()) {
        ACTIVE_SHAPE = new Shape(START_FREQ, SHAPES.length) 
    //};
}
