// var snake = snake || {};

// var gameInstance = 0;
// var snakeFill = [];

// var snakeBody = function() {
//   this.elm = null;

// }


let lastRenderTime = 0
const snakeSpeed = 2
const snakeBody = [{x: 11, y:11}]
const grid = document.getElementById('grid')


function main(currentTime){
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed){
    return
  };
  console.log('Render')
  lastRenderTime = currentTime

  update()
  draw()
}


window.requestAnimationFrame(main)

function update() {

}


function draw(grid) {
  snakeBody.forEach(segment =>{
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.x
    snakeElement.style.gridColumnStart = segment.y
    snakeElement.classList.add('snake')
    grid.appendChild(snakeElement)
  })
}