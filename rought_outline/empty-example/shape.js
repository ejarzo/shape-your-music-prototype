"use strict"
const LEN_DIV = 100;
class Shape {
    constructor(start_freq) {
        this.nodes = [];
        this.start_freq = start_freq;
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
    append(x,y){
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

        this.nodes.push(n); // no nodes
    }
    play(){
        for (var i = 1; i < this.length(); i++) {
//            this.at(i).IS_PLAYING = true;
            this.at(i).play();
/*            if (this.loop && i == (this.length-1)) {
                i = 1;
            };*/
        };
    }
    stop_playback(){
        for (var i = 1; i < this.length(); i++) {
//            this.at(i).IS_PLAYING = false;
        };
    }
    complete_shape(){
        var n = this.at(0)
        this.loop = true;
        this.append(n.x, n.y);
    }
}