
let lastRenderTime = 0
const snakeSpeed = 5
const snakeBody = [{x: 11, y:11}]
const grid = document.getElementById('grid')
let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}
let food = {x:0, y:0}
const growRate = 1
let newSegments = 0








// main game state
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


function draw(){
  grid.innerHTML = ''
  drawSnake(grid)
  drawFood(grid)
}

function update(){
  updateSnake()
  updateFood()
}


// snake
function updateSnake() {
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}


function drawSnake(grid) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    grid.appendChild(snakeElement)
  })
}

function growSnake(amount) {
  newSegments += amount
}

function onSnake(position) {
  return snakeBody.some(segment => {
    return equalPositions(segment, position)
  })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

// inputs
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = {x: 0, y: -1}
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = {x: 0, y: 1}
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = {x: -1, y: 0}
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = {x: 1, y: 0}
      break          
  }
})

function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}

// apple

function updateFood(){
  if (onSnake(food)) {
    growSnake(growRate)
    food = {x: 20, y: 10}
  }
}

function drawFood(grid) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    grid.appendChild(foodElement)
  }