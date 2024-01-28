package com.js.carpenter.model;

public class RequiredItem implements Comparable<RequiredItem>{
    private int length;
    private int num;
    private int numLeft;

    public int getNumLeft() {
        return numLeft;
    }

    public void setNumLeft(int numLeft) {
        this.numLeft = numLeft;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
        this.numLeft=this.num;
    }

    public int getTotalLength(){
        return this.length * this.num;
    }


    @Override
    public int compareTo(RequiredItem o) {
        if(o.length > this.length){
            return 1;
        }else if(o.length<this.length){
            return -1;
        }else{
            return 0;
        }
    }
}
