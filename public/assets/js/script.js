const gun = document.getElementById('gun');
const flash = document.getElementById('flash');
const balloonIds = ['balloonA', 'balloonB', 'balloonC', 'balloonD'];

const classname = document.getElementsByClassName('balloon');

const shootBalloon = e => {
    console.log(e.target);
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
};

for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('mouseenter', shootBalloon, false);
}

// document.getElementById('balloon').addEventListener('mouseenter', e => {
//     console.log('e',e.target.id);
//     gun.setAttribute('animation__recoil', {
//         property: 'rotation',
//         to: '-11 183 0',
//         dur: 50
//     });
//     gun.setAttribute('animation__reset', {
//         property: 'rotation',
//         to: '0 183 0',
//         dur: 200,
//         delay: 100
//     });
//     flash.setAttribute('opacity', 1);
//     setTimeout(() => {
//         flash.setAttribute('opacity', 0);
//     }, 150);
//     setTimeout(() => {
//         gun.removeAttribute('animation__recoil');
//         gun.removeAttribute('animation__reset');
//     }, 400);
// });