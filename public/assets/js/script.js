const gun = document.getElementById('gun');
let recoil = false;

document.getElementById('box').addEventListener('mouseenter', e => {
    gun.setAttribute('animation__recoil', {
        property: 'rotation',
        to: '-11 183 0',
        dur: 50
    });
    gun.setAttribute('animation__reset', {
        property: 'rotation',
        to: '0 183 0',
        dur: 75,
        delay: 75
    });
    setTimeout(() => {
        gun.removeAttribute('animation__recoil');
        gun.removeAttribute('animation__reset');
    }, 100)
});

// document.getElementById('my-camera')
//   .addEventListener('rotationChanged', e => {
//     console.log('New rotation:', e.detail);
//   });