// JavaScript for Tic-Tac-Toe Game

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const aiButton = document.getElementById('aiButton');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let aiMode = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game
function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    aiButton.addEventListener('click', toggleAIMode);
    updateMessage(`${currentPlayer}'s turn`);
}

// Handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (board[cellIndex] === '' && isGameActive) {
        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkResult();
        togglePlayer();
        if (aiMode && isGameActive) {
            handleAIMove();
        }
    }
}

// Check the game result
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateMessage(`${currentPlayer} wins!`);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        updateMessage("It's a tie!");
        isGameActive = false;
    }
}

// Toggle player
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isGameActive) updateMessage(`${currentPlayer}'s turn`);
}

// Handle AI move
function handleAIMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;
        checkResult();
        togglePlayer();
    }
}

// Update message
function updateMessage(message) {
    messageElement.textContent = message;
}

// Restart game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    updateMessage(`${currentPlayer}'s turn`);
}

// Toggle AI mode
function toggleAIMode() {
    aiMode = !aiMode;
    aiButton.textContent = aiMode ? 'Play Against Human' : 'Play Against AI';
    restartGame();
}

// Initialize the game when the page loads
initializeGame();
