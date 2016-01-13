"use strict"
class Node {
    constructor(x, y, len, del, freq) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.del = del;
        this.freq = freq;
    }
    play() {
        //var osc = new p5.Oscillator();
        //var env = new p5.Env();
        
        //env.attackTime = 0.5;
        //env.releaseTime = 0.5;

        console.log("DEL:", this.del);
        console.log("LEN", this.len);

        var osc = new p5.Oscillator();
        osc.freq = this.freq;
        var del = this.del
        //env.play(osc, 0)
        setTimeout(play_helper, this.del*1000, this);
    }
}
function play_helper(node) {
//    console.log("HELPER")

    var osc = new p5.Oscillator();
    osc.start(0, node.freq);
    osc.stop(node.len)
}
