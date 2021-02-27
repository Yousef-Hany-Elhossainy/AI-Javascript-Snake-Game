import {
  SNAKE_SPEED,
  update as snake_update,
  draw as snake_draw,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as food_update, draw as food_draw } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
let gameOver = false;

function main(currenTime) {
  if (gameOver) {
    if (confirm("YOU LOSE")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currenTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currenTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  snake_update();
  food_update();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  snake_draw(gameBoard);
  food_draw(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
