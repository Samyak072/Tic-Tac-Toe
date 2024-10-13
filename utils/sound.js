// utils/sound.js

import { Howl, Howler } from 'howler';

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

// (Optional) Background Music
const backgroundMusic = new Howl({
  src: ['/sounds/background.mp3'],
  loop: true,
  volume: 0.3,
});

const playBackgroundMusic = () => {
  backgroundMusic.play();
};

const pauseBackgroundMusic = () => {
  backgroundMusic.pause();
};

// Function to mute all sounds
const muteAll = () => {
  Howler.mute(true);
};

// Function to unmute all sounds
const unmuteAll = () => {
  Howler.mute(false);
};

export {
  clickSound,
  winSound,
  drawSound,
  resetSound,
  muteAll,
  unmuteAll,
  playBackgroundMusic,
  pauseBackgroundMusic,
};
