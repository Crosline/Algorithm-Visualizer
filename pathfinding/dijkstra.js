
async function dijkstra(speed) {
    const openSet = new PriorityQueue(); 
    const closedSet = new Set(); 
    const gScore = new Map(); 
  
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        gScore.set(`${j},${i}`, Infinity);
      }
    }
  
    
    const startKey = `${start.x},${start.y}`;
    gScore.set(startKey, 0);
    openSet.enqueue(start, gScore.get(startKey));
  
    
    while (!openSet.isEmpty()) {
      const current = openSet.dequeue(); 
      const currentKey = `${current.x},${current.y}`;
  
      
      if (current.x === end.x && current.y === end.y) {
        reconstructPath(current);
        isRunning = false;
        return;
      }
  
      closedSet.add(currentKey);
  
      
      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
  
        if (closedSet.has(neighborKey) || obstacles.has(neighborKey)) {
          continue; 
        }
  
        
        const tentativeGScore = gScore.get(currentKey) + 1;
  
        if (tentativeGScore < gScore.get(neighborKey)) {
          
          gScore.set(neighborKey, tentativeGScore);
  
          
          neighbor.previous = current;
  
          if (!openSet.contains(neighbor)) {
            openSet.enqueue(neighbor, gScore.get(neighborKey));
          }
        }
      }
  
      
      await visualizePath(current, 'visited', speed);
    }
  
    
    isRunning = false;
    alert("No path found!");
  }