'use strict';

// We get the columns
const cols = document.querySelectorAll('.col');

function getRandomColor() {
  const hex = '123456789ABCDEF';
  let color = '';

  for(let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }

  return `#${color}`;
}

function setRandomColors(node) {
  node.forEach(item => {
    const color = getRandomColor();
    const text = item.querySelector('.col__title');
    const lock = item.querySelector('.col__lock-icon');
    
    text.textContent = color;
    item.style.backgroundColor = color;
  
    setTextColor(text, color);
    setTextColor(lock, color);
  });
}

function setTextColor(node, color) {
  const luminance = chroma(color).luminance();

  node.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors(cols);

// Change background color when we clicked 'Space' key
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    setRandomColors(cols);
  }
});