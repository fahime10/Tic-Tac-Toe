// this is to create the HTML for the game board and update accordingly
const gameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const createContent = () => {
        let HTMLBoard = "";
        gameBoard.forEach((box, index) => {
            HTMLBoard += `<div class="box" id="box-${index}">${box}</div>`;
        });
        document.querySelector("#game-board").innerHTML = HTMLBoard;
        document.querySelector("#game-board").style.display = "grid";
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            box.addEventListener("click", game.placeMarker);
        });
    }

    // allows to put the player's marker on clicked box index
    // and re-render the HTML
    const updateContent = (index, value) => {
        gameBoard[index] = value;
        createContent();
    }

    const getGameBoardIndex = (index) => {
        return gameBoard[index];
    }

    // check the whether the gameboard at that index has a value in it
    const checkValue = function(value) {
        if (value !== "") {
            return false;
        } else {
            return true;
        }
    } 

    // this is necessary to be able to use the functions outside of the const
    return {
        createContent,
        updateContent,
        getGameBoardIndex,
        checkValue
    }
})();

// createPlayer factory function
const createPlayer = (name, marker) => {
    return {
        name, 
        marker
    }
}

// this is to keep track of the game flow
const game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const startGame = () => {
        if (document.querySelector("#player-1").value !== "" && 
            document.querySelector("#player-2").value !== "") {
                players = [
                    createPlayer(document.querySelector("#player-1").value, "X"),
                    createPlayer(document.querySelector("#player-2").value, "O")
                ];
        
                currentPlayerIndex = 0;
                gameOver = false;
                gameBoard.createContent();
                const boxes = document.querySelectorAll(".box");
                boxes.forEach((box) => {
                    box.addEventListener("click", placeMarker);
                });
                document.querySelector("#start-game-btn").disabled = true;
                document.querySelector("#reset-game-btn").disabled = false;
                document.querySelector("#prompt").style.display = "none";
                document.querySelector("#player-1").disabled = true;
                document.querySelector("#player-2").disabled = true;
        }
    }

    const placeMarker = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        let value = gameBoard.getGameBoardIndex(index);

        if (gameBoard.checkValue(value)) {
            gameBoard.updateContent(index, players[currentPlayerIndex].marker);
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }
    }

    const resetGame = () => {
        for (let i = 0; i < 9; i ++) {
            gameBoard.updateContent(i, "");
        }

        document.querySelector("#game-board").style.display = "none";
        document.querySelector("#player-1").value = "";
        document.querySelector("#player-2").value = "";
        document.querySelector("#start-game-btn").disabled = false;
        document.querySelector("#reset-game-btn").disabled = true;
        document.querySelector("#player-1").disabled = false;
        document.querySelector("#player-2").disabled = false;
    }

    return {
        startGame,
        placeMarker,
        resetGame,
    }
})();

const startBtn = document.getElementById("start-game-btn");
startBtn.addEventListener("click", () => {
    game.startGame();
});

const resetBtn = document.getElementById("reset-game-btn");
resetBtn.addEventListener("click", () => {
    game.resetGame();
});
