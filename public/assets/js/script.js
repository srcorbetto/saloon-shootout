const vrButton = document.querySelector('.a-enter-vr-button');
const timerElement = document.querySelector('.timer');
const sceneElement = document.querySelector('a-scene');
const camera = document.getElementById('my-camera');
const gun = document.getElementById('gun');
const flash = document.getElementById('flash');
let score = 0;
let lives = 3;
let timer = 10;
let ammo = 6;
let lifeTimer;
let gameStart = false;

const startGame = () => {
    const badGuy = document.getElementById('bad-guy');

    badGuy.addEventListener('mouseenter', e => {
        if (gameStart === false) {
            gameStart = true;
            createBalloon();
            lifeTimer = setInterval(() => {
                 timer--;
                 timerElement.innerHTML = timer;
                 console.log(`timer: ${timer}`);
                 if (timer === 0) {
                     lives--;
                     displayHearts();
                     console.log(`lives: ${lives}`)
                     timer = 10;
                     timerElement.innerHTML = timer;
                     if (lives === 0) {
                        console.log('Game Over');
                        clearInterval(lifeTimer);
                        restartGame();
                     };
                };
                //  console.log(`Lives: ${lives}`);
         }, 1000);
        }
    });
}

const restartGame = () => {
    gameStart = false;
    score = 0;
    lives = 3;
    timer = 10;
    ammo = 6;

    const remainingBaloons = sceneElement.querySelectorAll('.balloon');
    for (let i = 0; i < remainingBaloons.length; i++) {
        remainingBaloons[i].parentNode.removeChild(remainingBaloons[i]);
    }
}

const createBalloon = () => {
    // Balloon animations go here if there's an issue...
    const balloonElement = document.createElement('a-gltf-model');
    const arrayLenth = balloonAnimations.length - 1;
    const randomNumber = Math.floor(Math.random() * (arrayLenth - 0 + 1)) + 0; //The maximum is inclusive and the minimum is inclusive

    sceneElement.appendChild(balloonElement);
    balloonElement.addEventListener('loaded', e => {
        balloonElement.setAttribute('id', balloonAnimations[randomNumber].id);
        balloonElement.setAttribute('class', balloonAnimations[randomNumber].class);
        balloonElement.setAttribute('position', balloonAnimations[randomNumber].position);
        balloonElement.setAttribute('src', balloonAnimations[randomNumber].src);
        balloonElement.setAttribute('scale', balloonAnimations[randomNumber].scale);
        balloonElement.setAttribute('animation', balloonAnimations[randomNumber].animation);
        balloonElement.addEventListener('mouseenter', shootBalloon, false);
    });
}

const gunShot = () => {
    ammo--;
    console.log(ammo);
    gun.setAttribute('animation__recoil', {
        property: 'rotation',
        to: '-11 183 0',
        dur: 50
    });
    gun.setAttribute('animation__reset', {
        property: 'rotation',
        to: '0 183 0',
        dur: 200,
        delay: 100
    });
    flash.setAttribute('scale', '1.25 1.25 1.25');
    setTimeout(() => {
        flash.setAttribute('scale', '0 0 0');
    }, 150);
    setTimeout(() => {
        gun.removeAttribute('animation__recoil');
        gun.removeAttribute('animation__reset');
    }, 400);
}

const shootBalloon = e => {
    if (ammo > 0) {
        const targetBaloon = document.getElementById(e.target.id);
        gunShot();
        targetBaloon.parentNode.removeChild(targetBaloon);
        score++;
        timer = 10;
        timerElement.innerHTML = timer;
        console.log(`Score: ${score}`)
        setTimeout(() => {
            createBalloon();
        }, 1000);
    }
};

const displayHearts = () => {
    const heartElements = document.querySelectorAll('.heart');
    const loopNumber = 3 - lives; // 3 - 2 = 1
    if (lives === 2) {
        for (let i = 0; i < 1; i++) {
            heartElements[i].classList.add('opacity-half');
        }
    } else if (lives === 1) {
        for (let i = 0; i < 2; i++) {
            heartElements[i].classList.add('opacity-half');
        }
    } else if (lives === 0) {
        for (let i = 0; i < 2; i++) {
            heartElements[i].classList.add('opacity-half');
        }
    }
}

const windowResize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // console.log(window.innerWidth,window.innerHeight)
    if (screenWidth <= 414) {
        gun.setAttribute('position', '.3 -1 -1.4')
    }
}

// Game start
// ================================================================
// vrButton.remove();
window.addEventListener('resize', windowResize);
startGame();
