// nothing makes sense here :) values handpicked by trial and error
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable no-var */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
(() => {
gsap.registerPlugin(MotionPathPlugin);
  
  const contraction = () => gsap.timeline()
  .to('#forearm-left', {
    keyframes: [{
      duration: 0.5,
      x: 5,
      y: -80,
    }, {
      duration: 0.25,
      x: 15,
      y: -90,
    }, {
      duration: 0.25,
      x: 16,
      y: -98,
    }
               ]
  }, 0)
  .to('#arm-left', {
    duration: 1,
    rotateZ: -40,
  }, 0)

  const riff = () => gsap.timeline()
  .to('#forearm-left', {
    keyframes: [{
      duration: 0.05,
      x: -45,
      y: -55
    }, {
      duration: 0.1,
      x: -120,
      y: -68
    }
               ],
  }, 0)
  .to('#arm-left', {
    duration: 0.2,
    rotateZ: 30,
  }, 0)
  .to('.shock.one', {
    duration: 0.5,
    keyframes: [
      {opacity: 1, scale: 1.5,},
      {opacity: 0, scale: 2,}
    ]
  }, 0.1)
  .to('.scene', {
    duration: 0.1,
    motionPath: [{x: 10, rotationZ: 1,}, {x: -10, rotationZ: -1,}, {x: 0, rotationZ: 0,},],
  }, 0.1)
  .to('feGaussianBlur', {
    duration: 0.1,
    attr: {
      stdDeviation: 1,
    },
  }, 0.1)
  .to('feGaussianBlur', {
    duration: 0.1,
    attr: {
      stdDeviation: 0,
    },
  }, 0.2)

  const thunderOne = () => gsap.timeline()
  .to('.thunder.one .bg', {
    duration: 1,
    x: '100%',
  }, 0)

  const contractionTwo = () => gsap.timeline()
  .to('#forearm-left', {
    keyframes: [{
      duration: 0.1,
      x: -25,
      y: -70,
    }, {
      duration: 0.15,
      x: 16,
      y: -98,
    }
               ]
  }, 0)
  .to('#arm-left', {
    duration: 0.3,
    rotateZ: -40,
  }, 0)

  const riffTwo = () => gsap.timeline()
  .to('#forearm-left', {
    keyframes: [{
      duration: 0.03,
      x: -50,
      y: -55
    }, {
      duration: 0.15,
      x: -125,
      y: -68
    }
               ],
  }, 0)
  .to('#arm-left', {
    duration: 0.2,
    rotateZ: 30,
  }, 0)
  .to('.shock.two', {
    duration: 0.5,
    keyframes: [
      {opacity: 1, scale: 1.5,},
      {opacity: 0, scale: 2,}
    ]
  }, 0.1)
  .to('.scene', {
    duration: 0.3,
    motionPath: [{x: 15, rotationZ: 1}, {x: -15,  rotationZ: -1}, {x: 0,  rotationZ: 0}],
  }, 0.1)
  .to('feGaussianBlur', {
    duration: 0.1,
    attr: {
      stdDeviation: 1,
    },
  }, 0.1)
  .to('feGaussianBlur', {
    duration: 0.1,
    attr: {
      stdDeviation: 0,
    },
  }, 0.2)

  const thunderTwo = () => gsap.timeline()
  .to('.thunder.two .bg', {
    duration: 1,
    x: '100%',
  }, 0)

  const contractionRight = () => gsap.timeline()
  .to('#hand-right', {
    duration: 0.5,
    x: 40,
    y: 10,
  }, 0)
  .to('#forearm-right', {
    duration: 0.5,
    x: 408,
    y: 120,
  }, 0)
  .to('#arm-right', {
    duration: 0.5,
    x: '+=20',
  }, 0)
  .to('#guitar', {
    duration: 0.5,
    x: -255,
    y: 0,
    rotationZ: 15,
  }, 0)

  const zoom = () => gsap.timeline()
  .to('#slash, .dust-container', {
    duration: 1.5,
    z: 20,
  }, 0)

  const restart = () => gsap.timeline()
  .to('#hand-right', {
    duration: 1.5,
    x: 0,
    y: 0,
  }, 0)
  .to('#arm-right', {
    duration: 1.5,
    x: '-=20',
  }, 0)
  .to('#forearm-right', {
    duration: 1.5,
    x: 380,
    y: 110,
  }, 0)
  .to('#arm-left', {
    duration: 1.5,
    rotate: 0,
  }, 0)
  .to('#forearm-left', {
    duration: 1.5,
    x: -58,
    y: -60,
  }, 0)
  .to('#guitar', {
    duration: 1.5,
    x: -285,
    y: 47,
    rotationZ: 0,
  }, 0)
  .to('#slash, .dust-container', {
    duration: 1.5,
    z: -10,
  }, 0)


  gsap.timeline({
    repeat: -1,
  })
    .add(contraction())
    .add(contractionRight())
    .add(riff(), 1)
    .add(thunderOne(), 1.1)
    .add(contractionTwo(), 1.2)
    .add(riffTwo(), 1.5)
    .add(thunderTwo(), 1.6)
    .add(zoom(), 1)
    .add(restart())


  gsap.to('.hair', {
    repeat: -1,
    yoyo: true,
    duration: 0.1,
    x: 5,
    y: -5,
  })

  const dustParticles = document.getElementById('dust-particles');
  function spawn() {
    const newParticle = document.createElement('div');
    newParticle.classList.add('dust');

    gsap.to(newParticle, {
      ease: 'linear',
      duration: 'random(1, 3)',
      scale: 'random(5, 10)',
      y: 'random(-10, -100)',
      left: '100%',
      onComplete: () => {
        dustParticles.removeChild(newParticle);
      }
    });

    dustParticles.appendChild(newParticle);

    gsap.delayedCall(0.1, spawn);
  }

  spawn();
})();