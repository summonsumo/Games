let gameContainer = document.querySelector(".game-container")
let scoreContainer = document.querySelector(".score-container");

//TODO: While (no key pressed) stop render -> Start render - DONE
//TODO: SnakeSkin corrected - DONE
//TODO: Audio
//TODO: Score == 200 , finish - DONE
//TODO: Snake sprite (See why there's an override)

let foodX,foodY;
let headX = 10,headY = 10;
let velocityX=0,velocityY=0;
let snakeBody = [];
let score = 0;
let gamestate = 0;
let timeinterval = 110;
let snakeSkintemp =[];
let snakeSkin = [];
let snakeHead = document.querySelector(".snake-head");
let headPos;

SnakeStart();

function SnakeStart(){
//Initial Size: 20
    for (let i=0; i < 20; i++){
        snakeBody.push([headX + i, headY])
    }
}

function generateFood(){
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
    for(let i=0;i<snakeBody.length;i++){
        if(snakeBody[i][1] == foodY && snakeBody[i][0] == foodX){
            generateFood();
        }
    }
}


function gameOver(){
    if (score == 200){
        alert("You Win!")
    }
    headX = 12;
    headY = 12;
    generateFood();
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    SnakeStart();
    alert("Game Over. Your score was: " + score);
    score = 0;
    scoreContainer.innerHTML = "Score : " + score
    snakeSkintemp = [];
}


function renderGame(){
    if (gamestate === 0){
        return
    }
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    if(foodX == headX && headY == foodY){
        snakeSkintemp.push([...snakeBody[snakeBody.length - 1]]);
        snakeBody.pop();
        snakeSkin = `<div class="snake-skin" style="grid-area: ${snakeSkintemp[snakeSkintemp.length - 1][1]}/${snakeSkintemp[snakeSkintemp.length - 1][0]};"></div>`;
        console.log(snakeSkintemp[snakeSkintemp.length-1])
        generateFood();
        score+=10;
        scoreContainer.innerHTML = "Score : " + score
    }

    snakeBody.pop();
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);
    if(headX == 0 || headY == 0 || headX == 31 || headY == 31){
        gameOver();
        gamestate = 0;
    }
    for(let i=1;i<snakeBody.length;i++){
        if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            gameOver();
            gamestate = 0;
        }

    for (let i = 0; i < snakeSkintemp.length; i++) {
        if (headX == snakeSkintemp[i][0] && headY == snakeSkintemp[i][1]) {
            gameOver();
            gamestate = 0;
        }
    }

    if (score >= 200){
        gameOver();
        gamestate = 0;
    }
    }

    let headRotation = "rotate(0deg)";
    let headScale = "";
    if (velocityX === 1) {
        headScale = "scaleX(-1)";
    } else if (velocityX === -1) {
        headRotation = "rotate(0deg)";
    } else if (velocityY === -1) {
        headRotation = "rotate(90deg)";
    } else if (velocityY === 1) {
        headRotation = "rotate(-90deg)"
        headScale = "scaleY(-1)";
    }

    updatedGame += `<img src="SnakeHead.gif" class="snake-head" style="grid-area: ${headY}/${headX}; width: 100%; height: 100%; transform: ${headRotation + headScale}">`;

    for(let i = 0; i < snakeBody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }
    for (let i = 0; i < snakeSkintemp.length; i++) {
        updatedGame += `<div class="snake-skin" style="grid-area: ${snakeSkintemp[i][1]}/${snakeSkintemp[i][0]};"></div>`;
    }

    gameContainer.innerHTML = updatedGame + snakeSkin;

}

generateFood();
setInterval(renderGame,timeinterval);

document.addEventListener("keydown",function(e){
    let key = e.key;
    
    if(key == "ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
        gamestate = 1;
        snakeHead.style.transform = 'rotate(90deg)';
    }else if(key == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
        gamestate = 1;
    }else if(key == "ArrowLeft" && velocityX!=1){
        velocityY = 0;
        velocityX = -1;
        gamestate = 1;
    }else if(key == "ArrowRight" && velocityX!=-1){
        velocityY = 0;
        velocityX = 1;
        gamestate = 1;
    }
})