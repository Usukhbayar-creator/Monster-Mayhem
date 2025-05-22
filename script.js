const board = document.getElementById('board');

for (let i = 0; i < 100; i++) {
  const hex = document.createElement('div');
  hex.className = 'hex';

  hex.addEventListener('click', () => {
    // Toggle selected state
    hex.classList.toggle('selected');
  });

  board.appendChild(hex);
}
