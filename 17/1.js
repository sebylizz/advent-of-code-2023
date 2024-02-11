const fs = require('fs');
fs.readFile('input.txt', (err, input) => {
    class PriorityQueue {
        constructor() {
          this.heap = [];
        }
      
        enqueue(element, priority) {
          this.heap.push({ element, priority });
          this.bubbleUp();
        }
      
        dequeue() {
          const min = this.heap[0];
          const last = this.heap.pop();
          if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown();
          }
          return min;
        }
      
        bubbleUp() {
          let index = this.heap.length - 1;
          while (index > 0) {
            const element = this.heap[index];
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
      
            if (element.priority >= parent.priority) {
              break;
            }
      
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
          }
        }
      
        bubbleDown() {
          let index = 0;
          const length = this.heap.length;
          const element = this.heap[0];
      
          while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
      
            if (leftChildIndex < length) {
              leftChild = this.heap[leftChildIndex];
              if (leftChild.priority < element.priority) {
                swap = leftChildIndex;
              }
            }
      
            if (rightChildIndex < length) {
              rightChild = this.heap[rightChildIndex];
              if (
                (swap === null && rightChild.priority < element.priority) ||
                (swap !== null && rightChild.priority < leftChild.priority)
              ) {
                swap = rightChildIndex;
              }
            }
      
            if (swap === null) {
              break;
            }
      
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
          }
        }
      
        isEmpty() {
          return this.heap.length === 0;
        }
      }
      
      function dijkstraWithDirectionRestriction(graph) {
        const rows = graph.length;
        const cols = graph[0].length;
      
        const distances = new Array(rows * cols).fill(Number.POSITIVE_INFINITY);
        const visited = new Array(rows * cols).fill(false);
        const consecutiveSteps = new Array(rows * cols).fill(0);
      
        const start = 0;
        const end = rows * cols - 1;
      
        distances[start] = graph[0][0];
      
        const priorityQueue = new PriorityQueue();
        priorityQueue.enqueue({ element: start, consecutiveSteps: 0 }, graph[0][0]);
      
        while (!priorityQueue.isEmpty()) {
          const { element: current, consecutiveSteps: currentConsecutiveSteps } = priorityQueue.dequeue();
      
          if (visited[current]) {
            continue;
          }
      
          visited[current] = true;
      
          const row = Math.floor(current / cols);
          const col = current % cols;
      
          // Check neighbors
          const neighbors = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
          ];
      
          for (const [neighborRow, neighborCol] of neighbors) {
            if (
              neighborRow >= 0 &&
              neighborRow < rows &&
              neighborCol >= 0 &&
              neighborCol < cols
            ) {
              const neighborIndex = neighborRow * cols + neighborCol;
              const newConsecutiveSteps = graph[row][col] === graph[neighborRow][neighborCol]
                ? currentConsecutiveSteps + 1
                : 1;
      
              if (newConsecutiveSteps <= 3) {
                const newDistance = distances[current] + graph[neighborRow][neighborCol];
      
                if (newDistance < distances[neighborIndex]) {
                  distances[neighborIndex] = newDistance;
                  priorityQueue.enqueue({ element: neighborIndex, consecutiveSteps: newConsecutiveSteps }, newDistance);
                }
              }
            }
          }
        }
      
        return distances[end];
      }
      
      // Parse input into a 2D array
      const graph = input.toString()
        .trim()
        .split('\n')
        .map(row => row.trim().split('').map(Number));
      
      // Find the shortest path using Dijkstra's algorithm
      const shortestPath = dijkstraWithDirectionRestriction(graph);
      
      console.log('Shortest Path:', shortestPath);
      
})