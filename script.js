let matches = 15;
let score = 0;
let openedColors = [];

let colors = []
for (let i = 0; i < 15; i++) {
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
          prevColor.colorBox.style.backgroundColor = 'grey';
          colorBox.style.backgroundColor = 'grey';
        }, 500);
        return;
      }
      matches--;
      colorBox.removeEventListener('click', handler);
      prevColor.colorBox.removeEventListener('click', handler);
      if (matches === 0) {
        alert(`You won with a score of ${score}!`);
        location.reload();
      }
    }
  }
}

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

console.log(colors);