
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

const sleep = ms => new Promise(res => setTimeout(res, ms * 50));

const gridSize = 20; 
const cellSize = 25; 
canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

let grid = createGrid(gridSize);
let start = { x: 0, y: 0 };
let end = { x: gridSize - 2, y: gridSize - 2 };
let obstacles = new Set();
function createGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      ctx.strokeStyle = '#ccc';
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);

      if (i === start.y && j === start.x) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      } else if (i === end.y && j === end.x) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      } else if (obstacles.has(`${j},${i}`)) {
        ctx.fillStyle = 'black';
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);

  if ((x !== start.x || y !== start.y) && (x !== end.x || y !== end.y)) {
    const key = `${x},${y}`;
    if (obstacles.has(key)) {
      obstacles.delete(key);
    } else {
      obstacles.add(key);
    }
    drawGrid();
  }
});
document.getElementById('start-button').addEventListener('click', () => {
  drawGrid();
  const algorithm = document.getElementById('algorithm-select').value;
  const speed = document.getElementById('speed-slider').value;
  switch (algorithm) {
    case 'dijkstra':
      dijkstra(speed);
      break;
    case 'astar':
      astar(speed);
      break;
    case 'bfs':
      bfs(speed);
      break;
    case 'dfs':
      dfs(speed);
      break;
  }
});

document.getElementById('clear-button').addEventListener('click', () => {
  obstacles.clear();
  drawGrid();
});
document.getElementById('labyrinth-button').addEventListener('click', () => {
  obstacles.clear();

  obstacles = generateMazeRecursiveBacktracking(start, end);
  drawGrid();
});
drawGrid();