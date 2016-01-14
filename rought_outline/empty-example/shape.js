"use strict"
const LEN_DIV = 100; // TODO tempo here
var IS_PLAYING = true;

class Shape {
    constructor(start_freq) {
        this.nodes = [];
        this.start_freq = start_freq;
        this.completed = false;
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
        if (this.is_empty()) {
            ellipse(x, y, 5, 5);
        };
        var len = 0;
        var del = 0;
        var freq = this.start_freq;
        var theta = 0;

        var pos = this.length();
        var n = new Node(x, y, len, del, freq);

        if (this.length() >= 1) { // this is not the first node
            
            var prev_n = this.nodes[pos-1];
            
            line(prev_n.x, prev_n.y, x, y);

            n.len = dist(prev_n.x, prev_n.y, x, y) / LEN_DIV;
            n.del = prev_n.del + prev_n.len;

            if (this.length() >= 2) { // this is not the second node
                theta = angle_of_intersection(this.at(pos-1),this.at(pos-2),n);
                console.log(theta);
                n.freq *= theta;
            }
        }
        this.nodes.push(n);
    }
    play(){
       IS_PLAYING = true;
        this.play_helper(1);
    }
    play_helper(i){
        console.log("ey", i);
        if (i == this.length() && this.completed) { // loop if a completed shape
            this.play_helper(1);
        }
        if (i < this.length()) {
            var curr_shape = this;
            var freq = this.at(i).freq;
            var len = this.at(i).len * 1000;

            var sine1 = T("sin", {freq:freq, mul:0.5});
            
            T("perc", {r:len}, sine1).on("ended", function() {
                if (IS_PLAYING) { // continue playing
                    curr_shape.play_helper(i+1);

                } else { // stop
                    this.pause()
                };
            }).bang().play();  
        }
    }
    complete_shape(){
        if (this.completed == false && this.length() > 1) {
            var n = this.at(0)
            this.completed = true;
            this.append(n.x, n.y);   
            return this;
        }
        else {
            console.log("no shape to complete");
        }
    }
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
    //console.log(theta);

}
