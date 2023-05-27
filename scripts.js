// this is to create the HTML for the game board
const gameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const createContent = () => {
        let HTMLBoard = "";
        gameBoard.forEach((box, index) => {
            HTMLBoard += `<div class="box" id="box-${index}">${box}</div>`;
        });
        document.querySelector("#game-board").innerHTML = HTMLBoard;
        document.querySelector("#game-board").style.display = "grid";
        const squares = document.querySelectorAll(".box");
        squares.forEach((square) => {
            square.addEventListener("click", game.placeMarker);
        });
    }

    // allows to put the player's marker on clicked square index
    // and re-render the HTML
    const updateContent = (index, value) => {
        gameBoard[index] = value;
        createContent();
    }

    // this is necessary to be able to use the functions outside of the const
    return {
        createContent,
        updateContent
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
        players = [
            createPlayer(document.querySelector("#player-1").value, "X"),
            createPlayer(document.querySelector("#player-2").value, "O")
        ];

        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.createContent();
        const squares = document.querySelectorAll(".box");
        squares.forEach((square) => {
            square.addEventListener("click", placeMarker);
        });
    }

    const placeMarker = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        gameBoard.updateContent(index, players[currentPlayerIndex].marker);

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return {
        startGame,
        placeMarker,
    }
})();

const startBtn = document.getElementById("start-game-btn");
startBtn.addEventListener("click", () => {
    game.startGame();
})
