const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

function initializeGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let fillStyle = '#ccc';

            if (i === start.y && j === start.x) {
            fillStyle = 'blue';
            } else if (i === end.y && j === end.x) {
            fillStyle = 'red';
            } else if (obstacles.has(`${j},${i}`)) {
            fillStyle = 'black';
            }

            renderCell(j, i, fillStyle);
        }
    }
}

function renderCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    
    ctx.fillStyle = '#1a234e';
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
}