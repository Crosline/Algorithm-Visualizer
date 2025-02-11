const sleep = ms => new Promise(res => setTimeout(res, ms * 50));

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

async function reconstructPath(node) {
  const path = [];
  while (node) {
    path.push(node);
    node = node.previous; 
  }

  
  for (const p of path.reverse()) {
    await visualizePath(p, 'path');
  }
}
async function visualizePath(node, type, speed = 1) {
  if (isStartNode(node) || isEndNode(node)) {
    return;
  }

  const color = type === 'visited' ? 'rgba(25, 25, 25, 0.5)' : 'green';
  renderCell(node.x, node.y, color);
  await sleep(1/speed);
}

function isStartNode(node) {
  return node.x === start.x && node.y === start.y;
}
function isEndNode(node) {
  return node.x === end.x && node.y === end.y;
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