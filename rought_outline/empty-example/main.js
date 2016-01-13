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
    $("#clear").click(function(e){
        clear();
        shapes = [];
        ACTIVE_SHAPE = new Shape(START_FREQ);
    });

});
