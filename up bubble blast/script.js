document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let lives = 3;
    let gameInterval, bubbleInterval;
    let gameOver = false;
    let bubbleSpeed = 1000;
    let usedPositions = [];

    const scoreDisplay = document.getElementById('score');
    const livesDisplay = document.getElementById('lives');
    const bubblesContainer = document.getElementById('bubbles-container');
    const gameOverDisplay = document.getElementById('game-over');
    const finalScore = document.getElementById('final-score');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const gameContainer = document.getElementById('game-container');

    function getRandomPosition() {
        const container = gameContainer.getBoundingClientRect();
        let x, y, valid = false;
        
        while (!valid) {
            x = Math.random() * (container.width - 50);
            y = Math.random() * (container.height - 50);
            
            valid = !usedPositions.some(pos => Math.abs(pos.x - x) < 50 && Math.abs(pos.y - y) < 50);
        }

        usedPositions.push({ x, y });
        return { x, y };
    }

    function createBubble() {
        if (gameOver) return;
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const { x, y } = getRandomPosition();
        bubble.style.left = `${x}px`;  // ✅ Fixed
        bubble.style.top = `${y}px`;   // ✅ Fixed
        bubble.addEventListener('click', () => blastBubble(bubble));
        bubblesContainer.appendChild(bubble);
    }

    function createStone() {
        if (gameOver) return;
        const stone = document.createElement('div');
        stone.classList.add('stone');
        const { x, y } = getRandomPosition();
        stone.style.left = `${x}px`;  // ✅ Fixed
        stone.style.top = `${y}px`;   // ✅ Fixed
        stone.addEventListener('click', () => loseLife(stone));
        bubblesContainer.appendChild(stone);
    }

    function blastBubble(bubble) {
        bubble.classList.add('bubble-blast');
        score++;
        updateScore();
        setTimeout(() => bubble.remove(), 300);
    }

    function loseLife(stone) {
        if (gameOver) return;

        stone.classList.add('stone-blast');
        lives--;
        updateScore();

        breakStone(stone, stone.style.left, stone.style.top); // Pass stone position

        if (lives <= 0) {
            endGame();
        }

        setTimeout(() => {
            stone.remove();
        }, 300);
    }

    function breakStone(stone, x, y) {
        for (let i = 0; i < 5; i++) {
            let fragment = document.createElement('div');
            fragment.classList.add('stone-piece');

            fragment.style.left = `${parseFloat(x) + Math.random() * 30 - 15}px`;  // ✅ Fixed
            fragment.style.top = `${parseFloat(y) + Math.random() * 30 - 15}px`;   // ✅ Fixed
            fragment.style.animationDelay = `${Math.random() * 0.2}s`;  // ✅ Fixed

            gameContainer.appendChild(fragment);

            setTimeout(() => fragment.remove(), 600);
        }
    }

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score} | Lives: ${lives}`;  // ✅ Fixed
        livesDisplay.textContent = lives;
    }

    function increaseSpeed() {
        if (bubbleSpeed > 200) {
            bubbleSpeed -= Math.max(50, bubbleSpeed * 0.1);
            clearInterval(bubbleInterval);
            bubbleInterval = setInterval(createBubble, bubbleSpeed);
        }
    }

    function startGame() {
        score = 0;
        lives = 3;
        gameOver = false;
        bubbleSpeed = 1000;
        usedPositions = [];

        updateScore();
        gameOverDisplay.style.display = 'none';
        gameOverDisplay.style.opacity = '1';
        bubblesContainer.innerHTML = '';
        document.body.classList.remove("game-over-active");

        bubbleInterval = setInterval(createBubble, bubbleSpeed);
        gameInterval = setInterval(createStone, 5000);
        setInterval(increaseSpeed, 10000);

        startBtn.style.display = 'none';
    }

    function endGame() {
        gameOver = true;
        finalScore.textContent = score;
        gameOverDisplay.style.display = 'block';
        gameOverDisplay.style.opacity = '1';

        document.body.classList.add("game-over-active");

        clearInterval(bubbleInterval);
        clearInterval(gameInterval);
    }

    restartBtn.addEventListener('click', () => {
        gameOverDisplay.style.display = 'none';
        startGame();
    });

    startBtn.addEventListener('click', startGame);
});

