"use strict"
//const LEN_DIV = 200; // TODO tempo here
var LEN_DIV = 200;
var L_BUFF = 66;
var R_BUFF = 36;
var IS_PLAYING = true;
var ROOT = 222;
var KEY = "MAJ"


class Shape {
    constructor(start_freq, id_num) {
        this.nodes = [];
        this.id_num = id_num;
        this.start_freq = start_freq;
        this.completed = false;
        this.loop = false;
    }
    at(i){
        return this.nodes[i]
    }
    length(){
        return this.nodes.length;
    }
    is_empty(){
        if (this.nodes.length == 0) {
            return true;
        }
        else return false;
    }
    append(x,y){ // TODO clean up
        var len = 0;
        var del = 0;
        var freq = this.start_freq;
        var theta = 0;

        var pos = this.length();
        var n = new Node(x, y, len, del, freq);

        if (this.is_empty()) {
            ellipse(x, y, 5, 5);
            this.nodes.push(n);
        }
        else {
            var prev_n = this.nodes[pos-1];
            
            if (!(x == prev_n.x && y == prev_n.y)) {
                line(prev_n.x, prev_n.y, x, y);

                n.len = dist(prev_n.x, prev_n.y, x, y) / LEN_DIV;
                n.del = prev_n.del + prev_n.len;

                if (this.length() > 1) {
                    theta = angle_of_intersection(this.at(pos-1),this.at(pos-2),n);
                    //console.log(theta);
                    n.freq = new_frequency(note_chooser_1, prev_n.freq, theta); // TODO make work with note chooser
                }   
                this.nodes.push(n);
            }
        }
    }
    play(){
        console.log("ID", this.id_num);
        IS_PLAYING = true;
        
        // move play dot to start
        // TODO clean up
        var new_x = this.at(0).x + L_BUFF;
        var new_y = this.at(0).y + R_BUFF;

        if (!($("#dot"+this.id_num).is(":visible"))) {
            $("#play-dots").append( "<div id='dot"+this.id_num+"' class='play-dot'></div>" );
        };

        $("#dot"+this.id_num).css("top", new_y);
        $("#dot"+this.id_num).css("left", new_x);

        this.play_helper(1);
    }
    play_helper(i){
        //console.log("ey", i);
        if (i == this.length() && this.loop) { // loop if a completed shape
            this.play_helper(1);
        }
        if (i < this.length()) {
            var curr_shape = this;
            var freq = this.at(i).freq;
            var len = this.at(i).len * 1000;

            var wave = T("saw", {freq:freq, mul:0.5});
            
            // animate play dot
            $("#dot"+this.id_num).animate({ 
                left: this.at(i).x + L_BUFF,
                top: this.at(i).y + R_BUFF
            }, len, "linear");

            T("perc", {r:len}, wave).on("ended", function() {
                if (IS_PLAYING) { // continue playing
                    curr_shape.play_helper(i+1);

                } else { // stop
                    this.pause()
                };
            }).bang().play();  
        }
    }
    // completes the shape by using the cooridnates from the first node to construct 
    // the final node. returns the completed shape. 
    complete_shape(){
        if (this.completed == false && this.length()) {
            console.log("completing shape:", this.id_num);
            var n = this.at(0)
            this.completed = true;
            this.loop = true;
            this.append(n.x, n.y);   
            return this;
        }
        else {
            console.log("no shape to complete");
            return 0;
        }
    }
}

/*
Unison          1.0000          1.0000
Minor Second    25/24 = 1.0417  1.05946
Major Second    9/8 = 1.1250    1.12246
Minor Third     6/5 = 1.2000    1.18921
Major Third     5/4 = 1.2500    1.25992
Fourth          4/3 = 1.3333    1.33483
Dminished Ffth  45/32 = 1.4063  1.41421
Fifth           3/2 = 1.5000    1.49831
Minor Sixth     8/5 = 1.6000    1.58740
Major Sixth     5/3 = 1.6667    1.68179
Minor Seventh   9/5 = 1.8000    1.78180
Major Seventh   15/8 = 1.8750   1.88775
Octave          2.0000          2.0000
*/

var MIN_2ND = 1.05946 * ROOT;
var MAJ_2ND = 1.12246 * ROOT;
var MIN_3RD = 1.18921 * ROOT;
var MAJ_3RD = 1.25992 * ROOT;
var FOURTH  = 1.33483 * ROOT;
var DIM_5TH = 1.41421 * ROOT;
var FIFTH   = 1.49831 * ROOT;
var MIN_6TH = 1.58740 * ROOT;
var MAJ_6TH = 1.68179 * ROOT;
var MIN_7TH = 1.78180 * ROOT;
var MAJ_7TH = 1.88775 * ROOT;
var OCT     = 2.00000 * ROOT;

// returns new frequency based on the algorithm... TODO
function note_chooser_1(freq, theta) {
    // TODO - charlie
    /* in the synth library (timbre) I think there are midi->freq and freq->midi 
    functions that should be helpful. */


    var result = freq;

    if (theta < PI/8) {
        result = MIN_2ND;
    }
    else if (theta < PI/4) {
        result = MIN_3RD;
    }
    else if (theta < ((3*PI)/8)) {
        result = FOURTH;
    }
    else if (theta < PI/2) {
        result = FIFTH;
    }
    else if (theta < ((5*PI)/8)) {
        result = MIN_6TH;
    }
    else if (theta < ((3*PI)/4)) {
        result = MIN_7TH
    }
    else if (theta < ((7*PI)/8)) {
        result = OCT;
    }
    else if (theta < PI) {
        result = OCT;
    }
    
    return result;
}
// returns the angle of intersection centered at p1
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

// returns a new freuquency, by applying func (the given note-choosing 
// algorithm) to theta and the previous freq
function new_frequency(func, freq, theta) {
    return func(freq, theta);
}

