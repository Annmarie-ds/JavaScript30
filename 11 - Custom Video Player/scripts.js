// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

function updateButton() {
  if (video.play) {
    toggle.textContent = '❚ ❚'
  }

  if (video.paused) {
    toggle.textContent = '►'
  }
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
  const scrubTime = (e.offsetX / video.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};


// hook up event listenters
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
