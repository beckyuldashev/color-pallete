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

function setRandomColors(node, isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  node.forEach((item, index) => {
    const text = item.querySelector('.col__title');
    const lock = item.querySelector('.col__lock-icon');
    const isLocked = lock.classList.contains('ri-lock-fill');
    
    if(isLocked) {
      colors.push(text.textContent);
      return;
    };
    
    const color = isInitial ? colors[index] ? colors[index] : getRandomColor() : getRandomColor();

    if(!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    item.style.backgroundColor = color;
    
    setTextColor(text, color);
    setTextColor(lock, color);
  });

  setColorHash(colors);
}

function setTextColor(node, color) {
  const luminance = chroma(color).luminance();

  node.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function setColorHash(colors = []) {
  document.location.hash = colors.map(item => item.toString().substring(1)).join('-');
}

function getColorsFromHash() {
  if(document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(item => '#' + item);
  }
  return [];
}


// Change background color when we clicked 'Space' key
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.code === 'Space') {
    setRandomColors(cols);
  }
});

// Change icon of lock button through delegating event
document.addEventListener('click', (e) => {
  let target = e.target; 

  if (target.closest('[data-type="lock"]')) {
    const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.firstElementChild;
    
    node.classList.toggle('ri-lock-unlock-fill');
    node.classList.toggle('ri-lock-fill');
  }

  if(target.dataset.type === 'copy') {
    const copyNode = document.querySelector('.copy');

    copyClipboard(target.textContent)
      .then(() => {
        copyNode.textContent = `Скопирован цвет: ${target.textContent}`;
      })
      .catch(e => {
        copyNode.textContent = `Что-то пошло не так: ${e}`;
      });
  
    copyNode.classList.add('show');

  }
});


setRandomColors(cols, true);