const gun = document.getElementById('gun');
const flash = document.getElementById('flash');
const classname = document.getElementsByClassName('balloon');

const createBalloon = () => {
    const balloonAnimations = [
        {
            id: 'balloonA',
            class: 'balloon',
            position: '0 3 0.5',
            scale: '3 3 3',
            animation: 'property: position; to: 0 4 0.5; loop: true; dur: 3000; dir: alternate',
            src: '#balloonGltf'
        },
        {
            id: 'balloonB',
            class: 'balloon',
            position: '-1.7 3 0.5',
            scale: '3 3 3',
            animation: 'property: position; to: -1.7 4 0.5; loop: true; dur: 3000; dir: alternate',
            src: '#balloonGltf'
        },
        {
            id: 'balloonC',
            class: 'balloon',
            position: '-3 3 0.5',
            scale: '3 3 3',
            animation: 'property: position; to: -3 4 0.5; loop: true; dur: 3000; dir: alternate',
            src: '#balloonGltf'
        },
        {
            id: 'balloonD',
            class: 'balloon',
            position: '5 3 0.5',
            scale: '3 3 3',
            animation: 'property: position; to: 5 4 0.5; loop: true; dur: 3000; dir: alternate',
            src: '#balloonGltf'
        }
    ];
    const sceneElement = document.querySelector('a-scene');
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
    })
}

const gunShot = () => {
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
    flash.setAttribute('opacity', 1);
    setTimeout(() => {
        flash.setAttribute('opacity', 0);
    }, 150);
    setTimeout(() => {
        gun.removeAttribute('animation__recoil');
        gun.removeAttribute('animation__reset');
    }, 400);
}

const shootBalloon = e => {
    const targetBaloon = document.getElementById(e.target.id);
    gunShot();
    targetBaloon.parentNode.removeChild(targetBaloon);
    setTimeout(() => {
        createBalloon();
    }, 1000);
};

createBalloon();
// for (let i = 0; i < classname.length; i++) {
//     classname[i].addEventListener('mouseenter', shootBalloon, false);
// }