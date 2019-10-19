class Grid {
    constructor(width, height, nodeSize){
        this.width = width;
        this.height = height;
        this.nodeSize =  nodeSize;
        this.nodes = [];
    }
    
    //Drawing the grid using canvas graphics context
   draw(gc){
       let numOfNodesInRow = Math.round(this.height / this.nodeSize);
       let numOfNodesInColumn = Math.round(this.width / this.nodeSize);

       //generate 2d array that represent grid so we can put nodes in them
       for(let y = 0; y < numOfNodesInRow; y++ ){
           this.nodes.push(new Array(numOfNodesInColumn));
       }

       //drawing each node and puting them into 2d array of nodes
       for(let y = 0; y < numOfNodesInRow; y++){
            
            for(let x = 0; x < numOfNodesInColumn; x++) {
                let node = new Node(x*this.nodeSize, y * this.nodeSize, this.nodeSize, this.nodeSize, gc);
                node.draw(gc);
                this.nodes[y][x] = node;
            }
       }
   }

   getNodeAt(xPos,yPos){
       if(xPos<grid.width && yPos < grid.width){
           return this.nodes[yPos][xPos];
       }
   }

   getAdjacentNodesAt(xPos,yPos){

       xPos = Math.floor(xPos / this.nodeSize);
       yPos = Math.floor(yPos / this.nodeSize);

       let adjacentNodes = [];
       let nodesInRow = Math.round(this.height / this.nodeSize);
       let nodesInColumn = Math.round(this.width / this.nodeSize);

       //Getting left and right adjacent nodes
        for(let i = -1; i <=1; i++){
            let xAdjacent = xPos + i;
            if(xAdjacent >= 0 && xAdjacent < nodesInColumn && i !== 0){
                adjacentNodes.push(this.getNodeAt(xAdjacent, yPos));
            }
        }

        //Getting top and bottom adjacent nodes
        for(let i = -1; i <=1; i++){
            let yAdjacent = yPos+i;
            if(yAdjacent >=0 && yAdjacent < nodesInRow && i !== 0){
                adjacentNodes.push(this.getNodeAt(xPos, yAdjacent));
            }
        }

        //Getting diagonal left and right adjacent nodes
        for(let i = -1; i<=1; i++){
           if(i == 0)
                continue;

            let xAdjacentL = xPos-1;
            let xAdjacentR = xPos+1
            let yAdjacent = yPos+i;
            
            if((xAdjacentL >=0 && yAdjacent >= 0) && (xAdjacentL < nodesInColumn && yAdjacent < nodesInRow)){
                //console.log(xAdjacentL + " " + yAdjacent);
                adjacentNodes.push(this.getNodeAt(xAdjacentL, yAdjacent));
            }

            if((xAdjacentR >=0 && yAdjacent >= 0) && (xAdjacentR < nodesInColumn && yAdjacent < nodesInRow)){
                //console.log(xAdjacentR + " " + yAdjacent);
                adjacentNodes.push(this.getNodeAt(xAdjacentR, yAdjacent));
            }
        }
        

        return adjacentNodes;
   }

   
}