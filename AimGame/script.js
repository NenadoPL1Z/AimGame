const start = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeBoard = document.querySelector("#time-board");
let time = 20;
const timeEl = document.querySelector("#time");
const board = document.querySelector(".board");
let point = 0;

start.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeBoard.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("time-btn")) {
    time = +e.target.getAttribute("data-time");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("circle")) {
    point++;
    board.innerHTML = "";
    console.log(board);
    createRandomCircle();
  }
});

function startGame() {
  screens[1].classList.add("up");
  createRandomCircle();
  setInterval(decreaseTime, 1000);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    --time;
    if (time < 10) {
      timeEl.textContent = `00:0${time}`;
      return;
    }
    timeEl.textContent = `00:${time}`;
  }
}

function finishGame() {
  board.innerHTML = `<h1>Ваш счёт: <span class="primary">${point}</span></h1>`;
  timeEl.parentNode.classList.add("hide");
}

function createRandomCircle() {
  const colors = ["#d91a3d", "#5ab51d", "#189cba", "#41054d", "#2e2e2e"];
  const circle = document.createElement("div");
  const { width, height } = board.getBoundingClientRect();
  const randomSize = getRandomNumber(10, 60);
  const x = getRandomNumber(0, width - randomSize);
  const y = getRandomNumber(0, height - randomSize);

  circle.classList.add("circle");
  circle.style.width = `${randomSize}px`;
  circle.style.height = `${randomSize}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  board.append(circle);
  document.querySelector(".circle").style.background = `${colors[Math.floor(Math.random() * colors.length - 1)]}`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
