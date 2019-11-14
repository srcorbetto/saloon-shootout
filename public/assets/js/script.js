const gun = document.getElementById('gun');
const flash = document.getElementById('flash');
const classname = document.getElementsByClassName('balloon');
const sceneElement = document.querySelector('a-scene');

const createBalloon = () => {
    const balloonElement = document.createElement('a-gltf-model');
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
        }
    ];
    console.log(balloonAnimations[0]);
    sceneElement.appendChild(balloonElement);
    balloonElement.addEventListener('loaded', e => {
        balloonElement.setAttribute('id', balloonAnimations[0].id);
        balloonElement.setAttribute('class', balloonAnimations[0].class);
        balloonElement.setAttribute('position', balloonAnimations[0].position);
        balloonElement.setAttribute('src', balloonAnimations[0].src);
        balloonElement.setAttribute('scale', balloonAnimations[0].scale);
        balloonElement.setAttribute('animation', balloonAnimations[0].animation);
        balloonElement.addEventListener('mouseenter', shootBalloon, false);
        console.log(e);
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
};

createBalloon();

// for (let i = 0; i < classname.length; i++) {
//     classname[i].addEventListener('mouseenter', shootBalloon, false);
// }