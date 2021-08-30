const gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""],
}
const playerFactory = (name, symbol) => {
    const makeMove = (cell, symbol) =>
        cell.innerText = symbol;
    return { name, symbol, makeMove };
}

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");

let winner;
let nextTurn = player1.symbol
let isFinished = false;

function renderGameBoard() {

    for (let index = 0; index < 9; index++) {
        let cell = document.querySelector(`#cell${index}`)
        cell.innerHTML = gameBoard.board[index];
    }
}

function handleClicks() {
    for (let index = 0; index < 9; index++) {
        let cell = document.querySelector(`#cell${index}`);
        cell.addEventListener("click", () => {
            fillCell(cell, index);
            findWinner();
        })
    }
}

function addSign(index, cell, symbol) {
    gameBoard.board[index] = symbol;
    cell.innerHTML = gameBoard.board[index];
}

function changeTurn() {
    if (nextTurn == player1.symbol) {
        nextTurn = player2.symbol;
    } else {
        nextTurn = player1.symbol;
    }
}

function checkWinner(player) {
    if (gameBoard.board[0] === player && gameBoard.board[1] === player && gameBoard.board[2] === player ||
        gameBoard.board[0] === player && gameBoard.board[3] === player && gameBoard.board[6] === player ||
        gameBoard.board[6] === player && gameBoard.board[7] === player && gameBoard.board[8] === player ||
        gameBoard.board[2] === player && gameBoard.board[5] === player && gameBoard.board[8] === player ||
        gameBoard.board[3] === player && gameBoard.board[4] === player && gameBoard.board[5] === player ||
        gameBoard.board[1] === player && gameBoard.board[4] === player && gameBoard.board[7] === player ||
        gameBoard.board[2] === player && gameBoard.board[4] === player && gameBoard.board[6] === player ||
        gameBoard.board[0] === player && gameBoard.board[4] === player && gameBoard.board[8] === player) {
        winner = player;
        document.querySelector(".winner").innerHTML = `The winner is ${winner}`;
        isFinished = true;
    } else if (gameBoard.board.every(isNotEmpty) && !isFinished) {
        document.querySelector(".winner").innerHTML = `It's draw`;
        isFinished = true;
    }
    if (winner) return;
}

function fillCell(cell, index) {
    if (cell.innerHTML === "" && !isFinished) {
        addSign(index, cell, nextTurn);
        changeTurn();
    }
}

function findWinner() {
    checkWinner(player1.symbol);
    checkWinner(player2.symbol);

}

function playGame() {
    renderGameBoard();
    handleClicks();
}

function startNewGame() {
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    document.querySelector(".winner").innerHTML = "";

    isFinished = false;
    renderGameBoard();
    handleClicks();

}

function isNotEmpty(value) {
    return value != "";

}
playGame();
document.querySelector(".start-button").addEventListener("click", startNewGame)