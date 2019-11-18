const vrButton = document.querySelector('.a-enter-vr');
const timerElement = document.querySelector('.timer');
const scoreElement = document.querySelector('.score');
const bloodScreen = document.querySelector('.blood-screen');
const sceneElement = document.querySelector('a-scene');
const camera = document.getElementById('my-camera');
const gun = document.getElementById('revolver');
const flash = document.getElementById('flash');
let score = 0;
let lives = 3;
let timer = 5;
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
                    //  bloodScreen.classList.remove('hide');
                    //  setTimeout(() => {
                    //     bloodScreen.classList.add('hide');  
                    //  }, 200);
                     displayHearts();
                     console.log(`lives: ${lives}`)
                     timer = 5;
                     timerElement.innerHTML = timer;
                     if (lives === 0) {
                        console.log('Game Over');
                        clearInterval(lifeTimer);
                        restartGame();
                     };
                };
         }, 1000);
        }
    });
}

const restartGame = () => {
    gameStart = false;
    score = 0;
    lives = 3;
    timer = 5;
    ammo = 6;

    displayAmmo();
    displayHearts();

    const remainingBaloons = sceneElement.querySelectorAll('.balloon');
    for (let i = 0; i < remainingBaloons.length; i++) {
        remainingBaloons[i].parentNode.removeChild(remainingBaloons[i]);
    }
}

const createBalloon = () => {
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
    displayAmmo();
    console.log(ammo);
    gun.setAttribute('rotation', '-17.745 177.553 0.746');
    gun.setAttribute('position', '-1.269 -3.051 -4.641');
    flash.setAttribute('scale', '1.25 1.25 1.25');
    setTimeout(() => {
        flash.setAttribute('scale', '0 0 0');
    }, 150);
    setTimeout(() => {
        gun.setAttribute('rotation', '-180 -2.33 -180');
        gun.setAttribute('position', '-1.269 -4.167 -3.682');
    }, 200);
}

const shootBalloon = e => {
    if (ammo > 0) {
        const targetBaloon = document.getElementById(e.target.id);
        gunShot();
        targetBaloon.parentNode.removeChild(targetBaloon);
        score++;
        scoreElement.innerHTML = score;
        timer = 5;
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
    } else {
        heartElements.forEach(heart => {
            heart.classList.remove('opacity-half')
        });
    }
}

const displayAmmo = () => {
    const bulletElements = document.querySelectorAll('.bullet');
    const loopNumber = 3 - lives; // 3 - 2 = 1
    if (ammo === 5) {
        for (let i = 0; i < 1; i++) {
            bulletElements[i].classList.add('opacity-half');
        }
    } else if (ammo === 4) {
        for (let i = 0; i < 2; i++) {
            bulletElements[i].classList.add('opacity-half');
        }
    } else if (ammo === 3) {
        for (let i = 0; i < 3; i++) {
            bulletElements[i].classList.add('opacity-half');
        }
    } else if (ammo === 2) {
        for (let i = 0; i < 4; i++) {
            bulletElements[i].classList.add('opacity-half');
        }
    } else if (ammo === 1) {
        for (let i = 0; i < 5; i++) {
            bulletElements[i].classList.add('opacity-half');
        }
    } else if (ammo === 0) {
        bulletElements.forEach(bullet => {
            bullet.classList.add('opacity-half');
        });
        reload(bulletElements);
    } else {
        bulletElements.forEach(bullet => {
            bullet.classList.remove('opacity-half');
        });
    }
}

const reload = bulletArray => {
    const reloadText = document.querySelector('.reloading');
    reloadText.classList.remove('hide');
    reloadText.classList.add('pulse-animation');
    setTimeout(() => {
        ammo = 6;
        reloadText.classList.add('hide');
        reloadText.classList.remove('pulse-animation');
        displayAmmo();
    }, 2000);
}

// Game start
// ================================================================
// vrButton.remove();
startGame();
