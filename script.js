//select random cell next to cell
//connect them together
//at dead end backtrack until a cell able to connect with cells next to it is found

let ratioY, ratioX
let mazeSize = document.getElementById("complexity").value;;


document.getElementById("regenerate").addEventListener("click", setupMaze);
document.getElementById("complexity").addEventListener("change",() => {
    mazeSize = document.getElementById("complexity").value;
})

// Can use wasd to move a sqaure around, commented out because theres no goal
// To enable uncomment player code
// let player = {
//     x: 0,
//     y: 0
//   }
  
class Cell {
    constructor(y, x) {
        this.y = y
        this.x = x
        this.connected = []
    }
}

function createMaze(sizeX, sizeY) { // Creates an empty grid of cells
    let result = []
    for (let y = 0; y < sizeY; y++) {
        let toAdd = []
        for (let x = 0; x < sizeX; x++) {
        toAdd.push(new Cell(y, x))
        }
        result.push(toAdd)
    }
    return result
}

function getNextCell(cell) {
    let dir = []
    if (cell.y > 0) {
        dir.push([maze[cell.y - 1][cell.x], -1]) // up
    }
    if (cell.y < maze[0].length - 1) {
        dir.push([maze[cell.y + 1][cell.x], 1]) // down
    }
    if (cell.x > 0) {
        dir.push([maze[cell.y][cell.x - 1], -2]) // left
    }
    if (cell.x < maze.length - 1) {
        dir.push([maze[cell.y][cell.x + 1], 2]) // right
    }
    let temp = []
    for (let i of dir) {
        temp.push(i)
    }
    for (let c of temp) {
        if (c[0].connected.length > 0) {
        dir.splice(dir.indexOf(c), 1)
        }
    }
    if (dir.length === 0) {
        return false
    }
    return dir[int(random(dir.length))]
}


function setup() {
    //randomSeed(236543265219)
    let black = false
    let smallest = min(windowWidth, windowHeight)
    createCanvas(smallest, smallest)
    setupMaze();
}

function setupMaze() { 
    ratioX = width / mazeSize
    ratioY = height / mazeSize
    let bgColour = 255;
    background(bgColour)
    maze = createMaze(mazeSize, mazeSize)
    let ends = []
    let i = []
    start = maze[int(random(maze.length))][int(random(maze[0].length))]
    // player.x = int(random(maze.length))
    // player.y = int(random(maze.length))
    let order = [start]
    while (true) {
        if (order.length === 0) {
        break
        }
        let current = order[order.length - 1]
        let nextCell = getNextCell(current)
        if (!nextCell) {
        black = true
        order.pop()
        i.push(current)
        continue
        } else {
        if (i.length > 0) {
            ends.push(i)
            i = []
        }
        black = false
        current.connected.push(nextCell[1])
        nextCell[0].connected.push(nextCell[1] * -1)
        order.push(nextCell[0])
        }   
    }
    drawMaze();
}



function drawMaze() { // The generation algorithm
    for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
            let current = maze[y][x]
            stroke(255);
            rect(x * ratioX, y * ratioY, ratioX, ratioY)
            stroke(0)
            if (!current.connected.includes(2)) {
                line(x * ratioX + ratioX, y * ratioY, x * ratioX + ratioX, y * ratioY + ratioY) // top right to bottom right
            }
            if (!current.connected.includes(-2)) {
                line(x * ratioX, y * ratioY, x * ratioX, y * ratioY + ratioY) // top left to buttom left
            }
            if (!current.connected.includes(1)) {
                line(x * ratioX, y * ratioY + ratioY, x * ratioX + ratioX, y * ratioY + ratioY) // bottom left to bottom right
            }
            if (!current.connected.includes(-1)) {
                line(x * ratioX, y * ratioY, x * ratioX + ratioX, y * ratioY) // top left to top right
            }
            // if (player.y === y && player.x === x) {
            //   noStroke()
            //   fill(255, 0, 0)
            //   rect((x * ratioX) + ratioX * 0.1, (y * ratioY) + ratioY * 0.1, ratioX - ratioX * 0.2, ratioY - ratioY * 0.2)
            // }

        }
    }

}
  
//   function keyPressed() {
//     let dir = 0
//     if (keyCode === 65) {
//       dir = -2
//     } else if (keyCode === 68) {
//       dir = 2
//     } else if (keyCode === 87) {
//       dir = -1
//     } else if (keyCode === 83) {
//       dir = 1
//     }
//     if (maze[player.y][player.x].connected.includes(dir)) {
//       switch (dir) {
//         case 2:
//           player.x++
//           break
//         case -2:
//           player.x--
//           break
//         case 1:
//           player.y++
//           break
//         case -1:
//           player.y--
//           break
//       }
//     }
//   }