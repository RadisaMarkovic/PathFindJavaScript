let canvas = document.querySelector("canvas");
let gridWindow = document.querySelector("#window-grid");
let form = document.querySelector('form');
let nodeSize = 24;

// setting up the width and height of canvas  to fit the remaining screen space
canvas.width = gridWindow.offsetWidth-nodeSize;
canvas.height = window.innerHeight-nodeSize;


let gc = canvas.getContext("2d");

// generating grid with width and height of canvas and setting node size
let grid = new Grid(canvas.width,canvas.height,nodeSize);
// providing canvas context to draw grid
grid.draw(gc);


window.addEventListener('resize', resizeWindow);

// when window is resized than regenerate grid width new width and height
function resizeWindow() {
    canvas.width = gridWindow.offsetWidth-nodeSize;
    canvas.height = window.innerHeight-nodeSize;
    grid = new Grid(canvas.width,canvas.height,nodeSize);
    grid.draw(gc);
    
}



canvas.addEventListener("click", canvasClick);

// when is clicked on canvas take the position where is clicked and set node to obstacle
function canvasClick(event){
    let x = Math.floor(event.pageX/nodeSize);
    let y = Math.floor(event.pageY/nodeSize);
    let node = grid.getNodeAt(x, y);
    console.log(`x:${x} y:${y}`)
    node.setAsObstacle();

    console.log(node);


}

let startNodeX = null;
let startNodeY = null;

let endNodeX = null;
let endNodeY = null;

document.querySelector('#btnSetNodes').addEventListener('click', event => {
    startNodeX = form.startNodeX.value;
    startNodeY = form.startNodeY.value;

    endNodeX = form.endNodeX.value;
    endNodeY = form.endNodeY.value;

    grid.getNodeAt(startNodeX, startNodeY).setAsStartNode();
    grid.getNodeAt(endNodeX, endNodeY).setAsEndNode();

    

});

//when is clicked on generate path draw the nodes that are closest to end goal
document.querySelector('#btnGeneratePath').addEventListener('click', event => {

    // return path and iterate over each node that is in path and redraw it with green color
    
    let path = findPath({x: startNodeX, y: startNodeY}, {x: endNodeX, y: endNodeY}, grid);

    for(let node of path) {
        node.drawAsPath();
    }

});








