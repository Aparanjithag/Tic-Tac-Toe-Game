let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let player1Score = 0;
let player2Score = 0;

const gameStatus = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const player1NameDisplay = document.getElementById('player1-name-display');
const player2NameDisplay = document.getElementById('player2-name-display');
const confettiContainer = document.getElementById('confetti-container');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

gameStatus.textContent = `Player ${currentPlayer}'s turn`;

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (board[clickedIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (currentPlayer === 'X') {
        clickedCell.classList.add('player1');
    } else {
        clickedCell.classList.add('player2');
    }

    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        displayWinner(currentPlayer);
        return;
    }

    if (!board.includes('')) {
        gameStatus.textContent = 'Game is a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

function displayWinner(winner) {
    const player1Name = player1NameInput.value || 'Player 1';
    const player2Name = player2NameInput.value || 'Player 2';

    if (winner === 'X') {
        player1Score++;
        player1ScoreDisplay.textContent = player1Score;
        gameStatus.textContent = `${player1Name} wins! 🎉`;
    } else {
        player2Score++;
        player2ScoreDisplay.textContent = player2Score;
        gameStatus.textContent = `${player2Name} wins! 🎉`;
    }

    playFireworks(); // Trigger firework animation
}


function playFireworks() {
    for (let i = 0; i < 10; i++) { // Number of fireworks
        const firework = document.createElement('div');
        firework.classList.add('firework');

        // Random position and color for each firework
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 10 + 10;
        const colors = ['#FF5733', '#FFBD33', '#75FF33', '#33FFBD', '#FF33F6'];

        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        document.getElementById('fireworks-container').appendChild(firework);

        // Remove firework after animation
        setTimeout(() => {
            firework.remove();
        }, 1500);
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player1', 'player2');
    });

    confettiContainer.innerHTML = ''; // Clear confetti
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick)); 
restartButton.addEventListener('click', restartGame);

player1NameInput.addEventListener('input', () => {
    player1NameDisplay.textContent = player1NameInput.value || 'Player 1';
});

player2NameInput.addEventListener('input', () => {
    player2NameDisplay.textContent = player2NameInput.value || 'Player 2';
});
