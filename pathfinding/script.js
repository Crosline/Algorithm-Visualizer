const gridSize = 20; 
const cellSize = 25; 
canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

let isRunning = false;

let grid = createGrid(gridSize);
let start = { x: 0, y: 0 };
let end = { x: gridSize - 2, y: gridSize - 2 };
let obstacles = new Set();

function createGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(0));
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
    initializeGrid();
  }
});
document.getElementById('start-button').addEventListener('click', () => {
  if (isRunning){
    return;
  }
  isRunning = true;

  initializeGrid();
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
  initializeGrid();
});
document.getElementById('labyrinth-button').addEventListener('click', () => {
  obstacles.clear();

  obstacles = generateMazeRecursiveBacktracking(start, end);
  initializeGrid();
});


obstacles = generateMazeRecursiveBacktracking(start, end);
initializeGrid();