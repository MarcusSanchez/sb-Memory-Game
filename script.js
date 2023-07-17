// <div className="container">
//   <div className="color"></div>
// </div>

let matches = 0;
let score = 0;
let lowestScore = localStorage.getItem('lowestScore') || 0;
document.querySelector('#lowest-score').innerHTML = `Lowest Score: ${lowestScore.toString()}`;
let openedColors = [];

let colors = []

function start(e) {
  e.preventDefault();
  const boardSize = document.querySelector('#board-size').value.trim();
  const num = parseInt(boardSize, 10);

  if (boardSize !== '' && !isNaN(boardSize)) {
    if (num % 2 === 1 || num < 4) {
      alert('Board size must be even and at least 4!');
      return;
    }
    populateBoard(num);
  }

  matches = num / 2;

  for (let i = 0; i < matches; i++) {
    let color = generateRGB();
    colors.push(color, color);
  }
  colors = shuffle(colors);

  const colorBoxes = document.querySelectorAll('.color');
  for (let colorBox of colorBoxes) {
    colorBox.setAttribute('data-color', colors.pop());
    colorBox.addEventListener('click', handler)

    function handler() {
      if (openedColors.length === 1 && colorBox === openedColors[0].colorBox) {
        return;
      }
      let color = colorBox.getAttribute('data-color');
      score++;
      document.querySelector('#score').innerHTML = `Score: ${score.toString()}`;
      if (openedColors.length === 0) {
        colorBox.style.backgroundColor = color;
        openedColors.push({colorBox, color})
      } else if (openedColors.length === 1) {
        colorBox.style.backgroundColor = color;
        let prevColor = openedColors.pop();
        if (!(prevColor.color === color)) {
          setTimeout(() => {
            prevColor.colorBox.style.backgroundColor = '#beb3b3';
            colorBox.style.backgroundColor = '#beb3b3';
          }, 500);
          return;
        }
        matches--;
        colorBox.removeEventListener('click', handler);
        prevColor.colorBox.removeEventListener('click', handler);
        if (matches === 0) {
          alert(`You won with a score of ${score}!`);
          if (lowestScore > score) {
            localStorage.setItem('lowestScore', score);
            document.querySelector('#lowest-score').innerHTML = `Lowest Score: ${score.toString()}`;
          }
        }
      }
    }
  }
  const startButton = document.querySelector('#start-button');
  startButton.removeEventListener('click', start);
  startButton.addEventListener('click', restart);
  startButton.innerText = 'Restart';
}

function restart(e) {
  const game = document.querySelector('#game');
  game.innerHTML = '';
  colors = [];
  openedColors = [];
  matches = 0;
  score = 0;
  document.querySelector('#score').innerText = `Score: ${score.toString()}`;
  start(e);
}

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', start);


function generateRGB() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return `rgb(${r}, ${g}, ${b})`
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function populateBoard(n) {
  let gameBoard = document.getElementById('game');
  let [rows, cols] = closestMultipliers(n);
  let rowWidth = Math.floor(100 / rows)
  let colWidth = Math.floor(100 / cols)
  for (let i = 0; i < n; i++) {
    let container = document.createElement('div');
    container.classList.add('container');
    container.style.width = `${rowWidth}%`;
    container.style.height = `${colWidth}vh`;

    let colorBox = document.createElement('div');
    colorBox.classList.add('color');
    container.appendChild(colorBox);
    gameBoard.appendChild(container);
  }
}

function closestMultipliers(n) {
  const sqrtN = Math.floor(Math.sqrt(n));
  if (sqrtN * sqrtN === n) {
    return [sqrtN, sqrtN];
  }

  let lower = sqrtN;
  let upper = sqrtN + 1;

  let product = lower * upper;

  while (product !== n) {
    console.log('running');
    if (product < n) {
      upper++;
    } else {
      lower--;
    }
    product = lower * upper;
  }

  return [lower, upper];
}