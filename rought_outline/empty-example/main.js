$(document).ready(function() {

    $("#play").click(function(e){
        play_all();
    });
    $("#stop").click(function(e){
        stop_all();
    });
    $("#complete-shape").click(function(e){
        complete_shape();
    });
    $("#new-shape").click(function(e){
        shapes.push(ACTIVE_SHAPE);
        new_shape();
    });
    $("#clear").click(function(e){
        stop_all();
        clear();
        shapes = [];
        ACTIVE_SHAPE = new Shape(START_FREQ);
    });

});
