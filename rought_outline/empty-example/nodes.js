"use strict"
class Node {
    constructor(x, y, len, del, freq) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.del = del;
        this.freq = freq;
        this.IS_PLAYING = true;
    }
    play() {
        var osc = new p5.Oscillator();
        osc.freq = this.freq;
        var del = this.del
        //console.log(this.IS_PLAYING);
        if (this.IS_PLAYING) {
            setTimeout(play_helper, this.del*1000, this);
        };
    }
    stop_playback() {
        this.IS_PLAYING = false;
    }
}
function play_helper(node) {
    var osc = new p5.Oscillator();
    osc.start(0, node.freq);
    osc.stop(node.len)
}
