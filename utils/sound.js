// utils/sound.js

import { Howl } from 'howler';

// Initialize Howler.js sounds
const clickSound = new Howl({
  src: ['/sounds/click.mp3'],
  volume: 0.5,
});

const winSound = new Howl({
  src: ['/sounds/win.mp3'],
  volume: 0.7,
});

const drawSound = new Howl({
  src: ['/sounds/draw.mp3'],
  volume: 0.7,
});

const resetSound = new Howl({
  src: ['/sounds/reset.mp3'],
  volume: 0.5,
});

export { clickSound, winSound, drawSound, resetSound };