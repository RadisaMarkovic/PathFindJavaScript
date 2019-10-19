class Node {
    constructor(x,y, width, height, gc){
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.gCost = 0;
        this.hCost = 0;
        this.parent = null;
        this.isObstacle = false;
        this.isStartNode = false;
        this.isEndNode = false;

        this.gc = gc;
    }

    //Calculating the f cost combining how much it takes from start to current node(gCost) 
    //and how much it takes from current node to goal(hCost)
    getFCost(){
        return this.gCost + this.hCost;
    }

    //draw corresponding node
    draw(){

        //if it is not obstacle draw the normal rectangle without fill color
        if(this.gc && !this.isObstacle){
            this.gc.clearRect(this.x, this.y, this.width, this.height);
            this.gc.strokeRect(this.x, this.y, this.width, this.height);
        }
        
        //if it is a start node
         if(this.gc && this.isStartNode){
            this.gc.fillStyle = "blue",
            gc.clearRect(this.x, this.y, this.width, this.height)
            gc.fillRect(this.x, this.y, this.width, this.height);
            console.log("this node is red");
        }
        //if it is a end node
        if(this.gc && this.isEndNode){
            this.gc.fillStyle = "red",
            gc.clearRect(this.x, this.y, this.width, this.height)
            gc.fillRect(this.x, this.y, this.width, this.height);
            console.log("this node is orange");
        }
        
        
        //if it is obstacle draw node with fill color grey
         if(this.gc && this.isObstacle){
            this.gc.fillStyle = "grey";
            this.gc.clearRect(this.x, this.y, this.width, this.height);
            this.gc.fillRect(this.x, this.y,this.width, this.height)
        }
    }


    setAsObstacle(){
        if(!this.isStartNode && !this.isEndNode) {
            //if is obstacle false it will set it to true if obstacle is true it will set it to false
            this.isObstacle = !this.isObstacle;
            //redraw node
            this.draw()
        }
        
    }

    //method to set start node and redraw that specific node to change color
    setAsStartNode() {
        if(!this.isEndNode && !this.isObstacle) {
            this.isStartNode = true;
            this.draw();
        }
        
    }
//method to set end node and redraw that specific node to change color
    setAsEndNode(){
        if(!this.isStartNode && !this.isObstacle) {
            this.isEndNode = true;
            this.draw();
        }
        
    }

    // method to draw closest nodes to end path to green
    drawAsPath(){

            this.gc.fillStyle = "green";
            this.gc.clearRect(this.x, this.y, this.width, this.height);
            this.gc.fillRect(this.x, this.y,this.width, this.height)
        
    }



}