// select controls
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playToggle = player.querySelector('.toggle');
const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreenButton = player.querySelector('.full-screen');

// build functionality
function playPause() {

  video.paused
    ? video.play()
    : video.pause();
}
function updatePlayToggle() {
  playToggle.textContent = this.paused
    ? '▶'
    : '⏸'
}

function updateProgress() {
  progressBar.style.flexBasis = `${video.currentTime / video.duration * 100}%`
}


function skip() {
  console.log(this.dataset.skip)
  video.currentTime += parseFloat(this.dataset.skip)
}

function changeSlideHandler() {
  video[this.name] = this.value
}

function scrub(e) {
  const position = (e.offsetX / progress.clientWidth).toFixed(4)
  video.currentTime = video.duration * position;
}

// bind events
// play/pause events
playToggle.addEventListener('click', playPause);
document.addEventListener('keyup', (e) => {
  if (e.key !== " ") return;
  playPause();
})
video.addEventListener('click', playPause);
video.addEventListener('play', updatePlayToggle);
video.addEventListener('pause', updatePlayToggle);

// progress bar
video.addEventListener('timeupdate', updateProgress)
progress.addEventListener('click', scrub)
let scrubbing = false;
progress.addEventListener('mousedown', () => scrubbing = true)
progress.addEventListener('mouseup', () => scrubbing = false)
progress.addEventListener('mousemove', (e) => {
  if (scrubbing) scrub(e)
})

// skip
skipButtons.forEach(button => button.addEventListener('click', skip))

// sliders 
sliders.forEach(slider => slider.addEventListener('input', changeSlideHandler))

// full screen
fullScreenButton.addEventListener('click', () => video.requestFullscreen())
