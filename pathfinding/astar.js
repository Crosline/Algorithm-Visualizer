async function astar(speed) {
  const openSet = new PriorityQueue(); 
  const closedSet = new Set(); 
  const gScore = new Map(); 
  const fScore = new Map(); 

  
  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
      gScore.set(`${j},${i}`, Infinity);
      fScore.set(`${j},${i}`, Infinity);
      }
  }

  
  const startKey = `${start.x},${start.y}`;
  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(start, end));
  openSet.enqueue(start, fScore.get(startKey));

  
  while (!openSet.isEmpty()) {
      const current = openSet.dequeue(); 
      const currentKey = `${current.x},${current.y}`;

      
      if (current.x === end.x && current.y === end.y) {
      reconstructPath(current);
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
          fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, end));

          
          neighbor.previous = current;

          if (!openSet.contains(neighbor)) {
          openSet.enqueue(neighbor, fScore.get(neighborKey));
          }
      }
      }

      
      await visualizeNode(current, 'visited', speed);
  }

  
  alert("No path found!");
  }
