const gun = document.getElementById('gun');
const flash = document.getElementById('flash');
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
});

// document.getElementById('my-camera')
//   .addEventListener('rotationChanged', e => {
//     console.log('New rotation:', e.detail);
//   });