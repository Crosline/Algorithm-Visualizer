  function generateMazeRecursiveBacktracking(start, end) {
    const obstacles = new Set();
    const visited = new Set();
  
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (i % 2 === 1 || j % 2 === 1) {
          obstacles.add(`${j},${i}`); 
        }
      }
    }
  
    
    obstacles.delete(`${start.x},${start.y}`);
    obstacles.delete(`${end.x},${end.y}`);
  
    
    function carve(x, y) {
      const directions = [
        { dx: 2, dy: 0 }, 
        { dx: -2, dy: 0 }, 
        { dx: 0, dy: 2 }, 
        { dx: 0, dy: -2 }, 
      ];
  
      
      directions.sort(() => Math.random() - 0.5);
  
      for (const dir of directions) {
        const newX = x + dir.dx;
        const newY = y + dir.dy;
  
        if (
          newX >= 0 &&
          newX < gridSize &&
          newY >= 0 &&
          newY < gridSize &&
          !visited.has(`${newX},${newY}`)
        ) {
          
          const wallX = x + dir.dx / 2;
          const wallY = y + dir.dy / 2;
          obstacles.delete(`${wallX},${wallY}`);
          obstacles.delete(`${newX},${newY}`);
  
          visited.add(`${newX},${newY}`);
          carve(newX, newY);
        }
      }
    }
  
    
    visited.add(`${start.x},${start.y}`);
    carve(start.x, start.y);
  
    return obstacles;
  }