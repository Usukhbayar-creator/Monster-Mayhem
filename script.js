const board = document.getElementById('board');

const rows = 10;
const cols = 10;

// Example characters on the board with positions and colors
const characters = [
  {row: 0, col: 0, color: 'blue'},
  {row: 9, col: 9, color: 'red'},
];

let selectedPiece = null;

// Helper: get neighboring hex coordinates
function getNeighbors(row, col) {
  // Adjust neighbors for hex grid (pointy topped, offset rows)
  const evenRow = row % 2 === 0;

  const neighbors = evenRow ? [
    [row-1, col], [row-1, col+1],
    [row, col-1], [row, col+1],
    [row+1, col], [row+1, col+1]
  ] : [
    [row-1, col-1], [row-1, col],
    [row, col-1], [row, col+1],
    [row+1, col-1], [row+1, col]
  ];

  return neighbors.filter(([r,c]) => r >= 0 && r < rows && c >= 0 && c < cols);
}

function clearHighlights() {
  board.querySelectorAll('.hex.highlight').forEach(h => h.classList.remove('highlight'));
}

function highlightMoves(hex) {
  const row = Number(hex.dataset.row);
  const col = Number(hex.dataset.col);
  const neighbors = getNeighbors(row, col);

  neighbors.forEach(([r,c]) => {
    const neighborHex = board.querySelector(`.hex[data-row='${r}'][data-col='${c}']`);
    if (neighborHex && !neighborHex.querySelector('.character')) {
      neighborHex.classList.add('highlight');
    }
  });
}

function moveCharacter(fromHex, toHex) {
  const char = fromHex.querySelector('.character');
  if (char) {
    fromHex.removeChild(char);
    toHex.appendChild(char);
  }
}

// Build the board
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const hex = document.createElement('div');
    hex.classList.add('hex');

    if (r % 2 === 1) {
      hex.classList.add('row-offset');
    }

    hex.dataset.row = r;
    hex.dataset.col = c;

    // Add character if present
    const characterHere = characters.find(ch => ch.row === r && ch.col === c);
    if (characterHere) {
      const charElem = document.createElement('div');
      charElem.classList.add('character');
      charElem.style.backgroundColor = characterHere.color;
      hex.appendChild(charElem);
    }

    // Click logic for selecting and moving
    hex.addEventListener('click', () => {
      if (hex.querySelector('.character')) {
        // Select this character piece
        clearHighlights();
        selectedPiece = hex;
        highlightMoves(hex);
      } else if (hex.classList.contains('highlight') && selectedPiece) {
        // Move selected piece here
        moveCharacter(selectedPiece, hex);
        clearHighlights();
        selectedPiece = null;
      } else {
        // Click elsewhere clears selection/highlights
        clearHighlights();
        selectedPiece = null;
      }
    });

    board.appendChild(hex);
  }
}
