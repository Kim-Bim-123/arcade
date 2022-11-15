const gameBoard = document.getElementById("board");
const contxt = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const resetButton = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
const boardBackground = "lightgrey";
const foodColor = "red";
const snakeColor = "blue";
let running = false;
let xSpeed = unitSize;
let ySpeed = 0;
let foodx;
let foody;
let score = 0;
let snake = [
  {x: unitSize * 4, y:0},
  {x: unitSize * 3, y:0},
  {x: unitSize * 2, y:0},
  {x: unitSize, y:0},
  {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();






function gameStart(){ 
  running = true;
  score.textContent = score;
  createFood();
  drawFood();
  nextTick();
};

function nextTick(){
  if(running){
    setTimeout(()=>{
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else{
    displayGameOver();
  }
};

function clearBoard(){
  contxt.fillStyle =  boardBackground;
  contxt.fillRect(0, 0, gameWidth, gameHeight);
};


function createFood(){
  function randomFood(min,max){
    const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodx = randomFood(0, gameWidth - unitSize);
  foody = randomFood(0, gameWidth - unitSize);
};

function drawFood(){
    contxt.fillStyle = foodColor;
    contxt.fillRect(foodx, foody, unitSize, unitSize);
};

function moveSnake(){
  const head = {x: snake[0].x + xSpeed, y: snake[0].y + ySpeed};
  
  snake.unshift(head);

  if(snake[0].x == foodx && snake[0].y == foody){
    score+=1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
};

function drawSnake(){
  contxt.fillStyle = snakeColor;
  snake.forEach(snakeSegment => {
    contxt.fillRect(snakeSegment.x, snakeSegment.y, unitSize, unitSize)
  }) 
  };

function changeDirection(event){
  const keyPressesd = event.keyCode;
  const left = 65;
  const right = 68;
  const up = 87;
  const down = 83;

  const upMove = (ySpeed == -unitSize);
  const downMove = (ySpeed == unitSize);
  const rightMove = (xSpeed == unitSize);
  const leftMove = (xSpeed == -unitSize);

  switch(true){
    case(keyPressesd == left && !rightMove):
      xSpeed = -unitSize;
      ySpeed = 0;
      break;
    case(keyPressesd == right && !leftMove):
      xSpeed = unitSize;
      ySpeed = 0;
      break;
    case(keyPressesd == up && !downMove):
      xSpeed = 0;
      ySpeed = -unitSize;
      break; 
    case(keyPressesd == down && !upMove):
      xSpeed = 0;
      ySpeed = unitSize;
      break;       
  }
};
function checkGameOver(){
  switch(true){
    case (snake[0].x < 0):
      running = false;
      break;
    case (snake[0].x >= gameWidth):
      running = false;
      break;
    case (snake[0].y < 0):
      running = false;
      break;
    case (snake[0].y >= gameHeight):
      running = false;
      break;
  }
  for(let i = 1; i < snake.length; i++) {
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
      running = false;
    }
  }
};

function displayGameOver(){
  contxt.font = "25px courier-prime";
  contxt.fillStyle = "black";
  contxt.textAlign = "center";
  contxt.fillText("GAME OVER! Try Again!", gameWidth / 2, gameHeight / 2);
  running = false;
};

function resetGame(){
    score = 0;
    xSpeed = unitSize;
    ySpeed = 0;
    snake = [
      {x: unitSize * 4, y:0},
      {x: unitSize * 3, y:0},
      {x: unitSize * 2, y:0},
      {x: unitSize, y:0},
      {x:0, y:0}
    ];
    gameStart();
};
