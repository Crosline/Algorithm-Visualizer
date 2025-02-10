

let isDraggingStart = false;
let isDraggingEnd = false;


canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);

  
  if (x === start.x && y === start.y) {
    isDraggingStart = true;
  } else if (x === end.x && y === end.y) {
    isDraggingEnd = true;
  }
});


canvas.addEventListener('mousemove', (e) => {
  if (isDraggingStart || isDraggingEnd) {
    console.log('dragging');
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);

    
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize && !obstacles.has(`${x},${y}`)) {
      if (isDraggingStart) {
        start.x = x;
        start.y = y;
      } else if (isDraggingEnd) {
        end.x = x;
        end.y = y;
      }

      
      drawGrid();
    }
  }
});


canvas.addEventListener('mouseup', () => {
  isDraggingStart = false;
  isDraggingEnd = false;
});


canvas.addEventListener('mouseleave', () => {
  isDraggingStart = false;
  isDraggingEnd = false;
});

let touchStartX = null;
let touchStartY = null;


canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); 
  const touch = e.touches[0]; 
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((touch.clientX - rect.left) / cellSize);
  const y = Math.floor((touch.clientY - rect.top) / cellSize);

  
  if (x === start.x && y === start.y) {
    isDraggingStart = true;
  } else if (x === end.x && y === end.y) {
    isDraggingEnd = true;
  } else {
    
    const key = `${x},${y}`;
    if (obstacles.has(key)) {
      obstacles.delete(key);
    } else {
      obstacles.add(key);
    }
    drawGrid();
  }

  
  touchStartX = x;
  touchStartY = y;
});


canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); 
  if (isDraggingStart || isDraggingEnd) {
    const touch = e.touches[0]; 
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((touch.clientX - rect.left) / cellSize);
    const y = Math.floor((touch.clientY - rect.top) / cellSize);

    
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize && !obstacles.has(`${x},${y}`)) {
      if (isDraggingStart) {
        start.x = x;
        start.y = y;
      } else if (isDraggingEnd) {
        end.x = x;
        end.y = y;
      }

      
      drawGrid();
    }
  }
});


canvas.addEventListener('touchend', () => {
  isDraggingStart = false;
  isDraggingEnd = false;
});


canvas.addEventListener('touchcancel', () => {
  isDraggingStart = false;
  isDraggingEnd = false;
});