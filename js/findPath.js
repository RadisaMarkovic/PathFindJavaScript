function findPath(startPos, endPos, grid){
    let startNode = grid.getNodeAt(startPos.x, startPos.y);
    let endNode = grid.getNodeAt(endPos.x, endPos.y);
    
    console.log(startNode);
    console.log(endNode);

    let openList = [];
    let closedList = [];

    openList.push(startNode);

   while(openList.length > 0) {

        
        let currentNode = openList[0];

        

        //searching currentNode to evaluate
        for(let i = 1; i < openList.length; i++) {

            //if total distance from that node to end node is less than the current node
            // or if total distance is equal choose the one that is closer to the end node
            if(openList[i].getFCost() < currentNode.getFCost() 
                || openList[i].getFCost() === currentNode.getFCost()
                && openList[i].hCost < currentNode.hCost) {
                    currentNode = openList[i];
                }  
        }
       
        openList = openList.filter((node) => {return Object.is(node, currentNode) === false});
    
        closedList.push(currentNode);

        if(Object.is(currentNode, endNode) === true){
           
            return retracePath(startNode, endNode);
        }
            
        for(let adjacentNode of grid.getAdjacentNodesAt(currentNode.x, currentNode.y)){
            if(adjacentNode.isObstacle || isInList(closedList, adjacentNode)===true)
                continue;

            let movementCostToAdjacent = currentNode.gCost + getDistance({x: currentNode.x, y: currentNode.y}, 
                                                                         {x: adjacentNode.x, y: adjacentNode.y}, grid)
            
            if(movementCostToAdjacent < adjacentNode.gCost || isInList(openList, adjacentNode) === false){
                adjacentNode.gCost =  movementCostToAdjacent;
                adjacentNode.hCost = getDistance({x: adjacentNode.x, y: adjacentNode.y}, 
                                                 {x: endNode.x, y: endNode.y}, grid);
                adjacentNode.parent = currentNode;
                
                if(isInList(openList, adjacentNode) === false)
                    openList.push(adjacentNode);

            }                                                             
        }
    }

}



//Caclulating the distance between two nodes
function getDistance(nodeAPos, nodeBPos, grid){
   
    nodeAPos.x = Math.floor(nodeAPos.x / grid.nodeSize); 
    nodeAPos.y = Math.floor(nodeAPos.y / grid.nodeSize);

    nodeBPos.x = Math.floor(nodeBPos.x / grid.nodeSize); 
    nodeBPos.y = Math.floor(nodeBPos.y / grid.nodeSize);

    let distanceX = Math.abs(nodeAPos.x - nodeBPos.x);
    let distanceY = Math.abs(nodeAPos.y - nodeBPos.y);
    let diagonalDistance = Math.round(Math.sqrt((grid.nodeSize * grid.nodeSize) 
                                                + (grid.nodeSize * grid.nodeSize)));
    
    if(distanceX > distanceY){
        return diagonalDistance * distanceY + grid.nodeSize * (distanceX - distanceY);
    }

    return diagonalDistance * distanceX + grid.nodeSize * (distanceY - distanceX);
}

function isInList(list, currentNode) {
    return list.filter(node => Object.is(node, currentNode)).length >= 1 ? true : false;
}

/*function retracePath(startNode, endNode){
    let currentNode = endNode;
    let path = [];
    while(!Object.is(currentNode, startNode)){
        
        path.push(currentNode);
        currentNode = currentNode.parent;
    }

    return path;
}*/

function retracePath(startNode, endNode) {
    const path = [];
    let currentNode = endNode;
   
    while(Object.is(currentNode, startNode) === false) {
        path.push(currentNode);
        currentNode = currentNode.parent;
   }
    path.push(startNode);
    return path.reverse();
}