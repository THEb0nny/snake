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
        GenerFoodPos()
    } else {
        // Удаляем конец хвоста
        snakeX.shift()
        snakeY.shift()
    }
}
function GenerFoodPos () {
    while (true) {
        startFoodPosX = randint(0, 4)
        startFoodPosY = randint(0, 4)
        for (let index = 0; index <= snakeX.length; index++) {
            if (snakeX[index] != startFoodPosX && snakeY[index] != startFoodPosY) {
                generFoodFlag = true
            }
        }
        if (generFoodFlag) {
            break;
        }
    }
    food = [startFoodPosX, startFoodPosY]
}
function Draw () {
    basic.clearScreen()
    led.plot(food[0], food[1])
    for (let index2 = 0; index2 <= snakeX.length - 1; index2++) {
        led.plot(snakeX[index2], snakeY[index2])
    }
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
let generFoodFlag = false
let startFoodPosY = 0
let startFoodPosX = 0
let newSnakeHeadY = 0
let newSnakeHeadX = 0
let dir = ""
let food: number[] = []
let snakeY: number[] = []
let snakeX: number[] = []
snakeX = [2]
snakeY = [2]
food = [0, 0]
dir = "up"
GenerFoodPos()
while (true) {
    Draw()
    Update()
    basic.pause(500)
}
