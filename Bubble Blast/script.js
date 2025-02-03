let score = 0;
let gameInterval;
let bubbleInterval;
let gameOver = false;
let bubbleSpeed = 1000; // Starting speed for creating bubbles (in ms)

// DOM elements
const scoreDisplay = document.getElementById('score');
const bubblesContainer = document.getElementById('bubbles-container');
const gameOverDisplay = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');

// Function to generate random positions
function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 100); // Random X
  const y = Math.random() * (window.innerHeight - 100); // Random Y
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

  // Add event listener for the bubble click/tap
  bubble.addEventListener('click', () => blastBubble(bubble));

  // Append to container
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

  // Add event listener for the stone click/tap (Game Over)
  stone.addEventListener('click', () => endGame(stone));

  // Append to container
  bubblesContainer.appendChild(stone);
}

// Function to handle the bubble blast (increase score)
function blastBubble(bubble) {
  bubble.classList.add('bubble-blast');
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  
  // Remove the bubble after animation
  setTimeout(() => {
    bubble.remove();
  }, 300); // Time for animation to complete
}

// Function to handle the stone blast (game over)
function endGame(stone) {
  stone.classList.add('stone-blast');
  finalScore.textContent = score;
  gameOver = true;
  
  // Show game over message
  gameOverDisplay.style.display = 'block';

  // Stop the game intervals
  clearInterval(bubbleInterval);
  clearInterval(gameInterval);
  
  // Remove any remaining bubbles or stones
  setTimeout(() => {
    stone.remove();
    bubblesContainer.innerHTML = ''; // Clear all bubbles and stones
  }, 300); // Time for animation to complete
}

// Function to gradually increase bubble speed
function increaseSpeed() {
  if (bubbleSpeed > 200) {
    bubbleSpeed -= 100; // Speed up the game
    clearInterval(bubbleInterval);
    bubbleInterval = setInterval(createBubble, bubbleSpeed); // Restart bubble creation with faster interval
  }
}

// Function to start the game
function startGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameOver = false;
  gameOverDisplay.style.display = 'none'; // Hide game over message
  
  // Create a bubble every 'bubbleSpeed' ms
  bubbleInterval = setInterval(createBubble, bubbleSpeed);

  // Create a stone randomly every 5 seconds
  gameInterval = setInterval(createStone, 5000);

  // Gradually increase the speed of bubble creation
  setInterval(increaseSpeed, 10000); // Every 10 seconds
}
// DOM elements
const restartButton = document.getElementById('restart-button');

// Function to restart the game
function restartGame() {
  // Reset the game variables
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameOver = false;
  
  // Hide the game over screen and restart button
  gameOverDisplay.style.display = 'none';
  restartButton.classList.add('hidden'); // Hide the restart button
  
  // Clear remaining intervals
  clearInterval(bubbleInterval);
  clearInterval(gameInterval);

  // Clear the bubbles container
  bubblesContainer.innerHTML = '';

  // Restart the game
  startGame();
}

// Event listener for the restart button
restartButton.addEventListener('click', restartGame);

// Update the endGame function to show the restart button
function endGame(stone) {
  stone.classList.add('stone-blast');
  finalScore.textContent = score;
  gameOver = true;

  gameOverDisplay.style.display = 'block';  // Show game over message
  restartButton.classList.remove('hidden'); // Show restart button

  // Stop the game intervals
  clearInterval(bubbleInterval);
  clearInterval(gameInterval);

  setTimeout(() => {
    stone.remove();
    bubblesContainer.innerHTML = ''; // Clear all bubbles and stones
  }, 300); // Time for animation to complete
}

