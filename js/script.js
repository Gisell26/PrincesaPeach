const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameover = document.querySelector('.gameover');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');

let score = 0;
let lives = 3;

const jump = () => {
    mario.classList.add('jump'); 

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images.mario/game-over.png';
        mario.style.width = '60px';
        mario.style.marginLeft = '50px';

        gameover.style.left = '16%';
        
        // Restar vida y verificar si el juego debe terminar
        lives--;
        livesElement.textContent = lives;

        if (lives <= 0) {
            clearInterval(loop); // Detener el juego
            gameover.style.visibility = 'visible'; // Mostrar el mensaje de game over
        } else {
            // Resetear la posición del tubo y continuar el juego
            resetGame();
        }
    } else {
        // Aumentar puntaje
        score++;
        scoreElement.textContent = score;
    }
}, 1000);

const resetGame = () => {
    // Resetear la posición del tubo
    pipe.style.animation = 'pipe-animation 2s infinite linear';
    pipe.style.left = '100%';

    // Resetear la posición y el estado de Mario
    mario.src = './images.mario/mario.gif';
    mario.style.width = '120px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px';
}

document.addEventListener('keydown', jump);
