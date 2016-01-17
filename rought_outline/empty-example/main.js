$(document).ready(function() {

    $("#play").click(function(){
        stop_all();
        play_all();
    });
    $("#stop").click(function(){
        stop_all();
    });
    $("#complete-shape").click(function(){
        complete_shape();
    });
    $("#new-shape").click(function(){
        console.log("active shape length:", ACTIVE_SHAPE.length());
        if (ACTIVE_SHAPE.length()) {
            ACTIVE_SHAPE.completed = true;
            SHAPES.push(ACTIVE_SHAPE);
            new_shape();
        };
    });
    $("#clear").click(function(){
        stop_all();
        clear();
        SHAPES = [];
        $( ".play-dot" ).remove();
        ACTIVE_SHAPE = new Shape(START_FREQ, SHAPES.length);
    });
    $("#grid").click(function(){
        if ($("#grid").is(":checked")) {
            $("#grid-overlay").show();
        } 
        else {
            ($("#grid-overlay").hide())
        } 
    });

});
