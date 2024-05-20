let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let moleInterval;
let plantInterval;
let pause = false;

window.onload = function() {
    setGame();
}

function setGame() {
    document.getElementById("board").innerHTML = ""; // Clear the board
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    startGameTimers();
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();
    document.getElementById("gameOverMessage").style.display = "none";
}

function startGameTimers() {
    moleInterval = setInterval(setMole, 600);
    plantInterval = setInterval(setPlant, 900);
}

function stopGameTimers() {
    clearInterval(moleInterval);
    clearInterval(plantInterval);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (!pause && !gameOver) {
        if (currMoleTile) {
            currMoleTile.innerHTML = "";
        }
        let mole = document.createElement("img");
        mole.src = "./cat.png";
        mole.style.width = "125px";
    
        let num = getRandomTile();
        if (currPlantTile && currPlantTile.id == num) {
            return;
        }
        currMoleTile = document.getElementById(num);
        currMoleTile.appendChild(mole);
    }
}

function setPlant() {
    if (!pause && !gameOver) {
        if (currPlantTile) {
            currPlantTile.innerHTML = "";
        }
        let plant = document.createElement("img");
        plant.src = "./dog.png";
        plant.style.width = "170px";
    
        let num = getRandomTile();
        if (currMoleTile && currMoleTile.id == num) {
            return;
        }
        currPlantTile = document.getElementById(num);
        currPlantTile.appendChild(plant);
    }
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        currMoleTile.innerHTML = "";
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currPlantTile) {
        let finalScore = score.toString();
        let gameOverMessage = document.getElementById("gameOverMessage");
        gameOverMessage.innerText = "GAME OVER!" + "\nScore: " + finalScore + "\n Click this message to start a new game";
        gameOverMessage.style.display = "block";
        gameOverMessage.addEventListener("click", function() {
            resetGame(); 
        }, { once: true }); // Ensure the event is only added once
        stopGameTimers();
        gameOver = true;
    }
}

function resetGame() {
    currMoleTile = null;
    currPlantTile = null;
    score = 0;
    gameOver = false;
    setGame();
}

function togglePause() {
    pause = !pause;
    let pauseMessage = document.getElementById("pauseMessage");
    if (pause) {
        stopGameTimers();
        pauseMessage.style.display = "block";
        document.getElementById("pauseBtn").innerText = "Resume";
    } else {
        startGameTimers();
        pauseMessage.style.display = "none";
        document.getElementById("pauseBtn").innerText = "Pause";
    }
}

function displayInstructions() {
    let instructionsMessage = document.getElementById("instructionsMessage");
    if (instructionsMessage.style.display === "block") {
        instructionsMessage.style.display = "none";
    } else {
        instructionsMessage.style.display = "block";
    }
}
