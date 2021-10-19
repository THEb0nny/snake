/**
 * https://www.cameronmacleod.com/blog/microbit-snake
 */
function Update () {
    Incline()
    newSnakeHeadX = snakeX[snakeX.length - 1]
    newSnakeHeadY = snakeY[snakeY.length - 1]
    if (dir == "up") {
        newSnakeHeadY += -1
    } else if (dir == "down") {
        newSnakeHeadY += 1
    } else if (dir == "left") {
        newSnakeHeadX += -1
    } else if (dir == "right") {
        newSnakeHeadX += 1
    }
    control.waitMicros(1)
    if (newSnakeHeadX > 4) {
        newSnakeHeadX = 0
    } else if (newSnakeHeadX < 0) {
        newSnakeHeadX = 4
    }
    if (newSnakeHeadY > 4) {
        newSnakeHeadY = 0
    } else if (newSnakeHeadY < 0) {
        newSnakeHeadY = 4
    }
    // Добавляем новую позицию головы
    snakeX.push(newSnakeHeadX)
    snakeY.push(newSnakeHeadY)
    if (newSnakeHeadX == food[0] && newSnakeHeadY == food[1]) {
        GenerStartFood()
    } else {
        // Удаляем конец хвоста
        snakeX.shift()
        snakeY.shift()
    }
}
function Draw () {
    basic.clearScreen()
    led.plot(food[0], food[1])
    for (let index = 0; index <= snakeX.length - 1; index++) {
        led.plot(snakeX[index], snakeY[index])
    }
}
function GenerStartFood () {
    startFoodPos = [randint(0, 4), randint(0, 4)]
    while (true) {
        if (startFoodPos[0] != 2 && startFoodPos[1] != 2) {
            break;
        }
    }
    food = startFoodPos
}
function Incline () {
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    if (Math.abs(x) > Math.abs(y)) {
        if (x < 0) {
            dir = "left"
        } else {
            dir = "right"
        }
    } else {
        if (y < 0) {
            dir = "up"
        } else {
            dir = "down"
        }
    }
}
let y = 0
let x = 0
let food: number[] = []
let newSnakeHeadY = 0
let newSnakeHeadX = 0
let snakeY: number[] = []
let snakeX: number[] = []
let dir = ""
let startFoodPos: number[] = []
startFoodPos = []
dir = "up"
snakeX = [2]
snakeY = [2]
GenerStartFood()
while (true) {
    Draw()
    Update()
    basic.pause(500)
}
