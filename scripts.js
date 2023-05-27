const gameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const createContent = () => {
        let HTMLBoard = "";
        gameBoard.forEach((square, index) => {
            HTMLBoard += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.querySelector("#game-board").innerHTML = HTMLBoard;
    }

    return {
        createContent,
    }
})();

gameBoard.createContent();

