"use strict"

class Shape {
    constructor(start_freq) {
        this.nodes = [];
        this.start_freq = start_freq;
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
    append(n){
        this.nodes.push(n);
    }
}