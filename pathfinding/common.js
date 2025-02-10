

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function getNeighbors(node) {
  const neighbors = [];
  const directions = [
    { x: 1, y: 0 }, 
    { x: -1, y: 0 }, 
    { x: 0, y: 1 }, 
    { x: 0, y: -1 }, 
  ];

  for (const dir of directions) {
    const x = node.x + dir.x;
    const y = node.y + dir.y;

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      neighbors.push({ x, y, previous: null }); 
    }
  }

  return neighbors;
}
function reconstructPath(node) {
  const path = [];
  while (node) {
    path.push(node);
    node = node.previous; 
  }

  
  for (const p of path.reverse()) {
    visualizeNode(p, 'path');
  }
}
async function visualizeNode(node, type, speed = 1) {
  if (node.x === start.x && node.y === start.y) {
    return;
  } else if (node.x === end.x && node.y === end.y) {
    return;
  }

  const color = type === 'visited' ? 'rgba(25, 25, 25, 0.5)' : 'green';
  ctx.fillStyle = color;
  ctx.fillRect(node.x * cellSize, node.y * cellSize, cellSize, cellSize);

  
  ctx.strokeStyle = '#ccc';
  ctx.strokeRect(node.x * cellSize, node.y * cellSize, cellSize, cellSize);

  await sleep(1/speed);
}
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift().element;
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  contains(element) {
    return this.elements.some((e) => e.element.x === element.x && e.element.y === element.y);
  }
}