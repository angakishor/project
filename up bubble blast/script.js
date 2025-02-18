let score = 0;
let lives = 3;
let gameInterval;
let bubbleInterval;
let gameOver = false;
let bubbleSpeed = 1000;

const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const bubblesContainer = document.getElementById('bubbles-container');
const gameOverDisplay = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Function to generate random positions
function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    return { x, y };
}

// Function to create a bubble
function createBubble() {
    if (gameOver) return;

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const { x, y } = getRandomPosition();
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    bubble.addEventListener('click', () => blastBubble(bubble));

    bubblesContainer.appendChild(bubble);
}

// Function to create a stone
function createStone() {
    if (gameOver) return;

    const stone = document.createElement('div');
    stone.classList.add('stone');
    const { x, y } = getRandomPosition();
    stone.style.left = `${x}px`;
    stone.style.top = `${y}px`;

    stone.addEventListener('click', () => loseLife(stone));

    bubblesContainer.appendChild(stone);
}

// Function to handle bubble blast
function blastBubble(bubble) {
    bubble.classList.add('bubble-blast');
    score++;
    scoreDisplay.textContent = `Score: ${score} | Lives: ${lives}`;

    setTimeout(() => {
        bubble.remove();
    }, 300);
}

// Function to handle losing a life
function loseLife(stone) {
    if (gameOver) return;

    stone.classList.add('stone-blast');
    lives--;
    livesDisplay.textContent = `Lives: ${lives}`;

    breakStone(stone); // Call function to break stone into pieces

    if (lives <= 0) {
        endGame();
    }

    setTimeout(() => {
        stone.remove();
    }, 300);
}

// Function to break stone into fragments
function breakStone(stone) {
    const { left, top } = stone.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
        let fragment = document.createElement('div');
        fragment.classList.add('stone-piece');

        fragment.style.left = `${left + Math.random() * 30 - 15}px`;
        fragment.style.top = `${top + Math.random() * 30 - 15}px`;
        fragment.style.animationDelay = `${Math.random() * 0.2}s`;

        document.body.appendChild(fragment);

        setTimeout(() => fragment.remove(), 600);
    }
}

// Function to end the game
function endGame() {
    gameOver = true;
    finalScore.textContent = score;
    gameOverDisplay.style.display = 'block';

    // Stop game
    clearInterval(bubbleInterval);
    clearInterval(gameInterval);
}
   
// Function to gradually increase bubble speed
function increaseSpeed() {
    if (bubbleSpeed > 200) {
        bubbleSpeed -= 100;
        clearInterval(bubbleInterval);
        bubbleInterval = setInterval(createBubble, bubbleSpeed);
    }
}

// Function to start the game
function startGame() {
    score = 0;
    lives = 3;
    gameOver = false;
    bubbleSpeed = 1000;

    scoreDisplay.textContent = `Score: ${score} | Lives: ${lives}`;
    livesDisplay.textContent = `Lives: ${lives}`;
    gameOverDisplay.style.display = 'none';
    
    bubblesContainer.innerHTML = ''; // Clear existing bubbles and stones

    bubbleInterval = setInterval(createBubble, bubbleSpeed);
    gameInterval = setInterval(createStone, 5000);
    setInterval(increaseSpeed, 10000);

    startBtn.style.display = 'none';
}

// Attach event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => {
    gameOverDisplay.style.display = 'none';
    startGame();
});
