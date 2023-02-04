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
    item.style.backgroundColor = getRandomColor();
  });
}

setRandomColors(cols);