const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const timeline = document.getElementById('timeline');
const progress = document.getElementById('progress');

let isPlaying = false;

// Format time as M:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    showPlayIcon();
  } else {
    audio.play();
    showPauseIcon();
  }
  isPlaying = !isPlaying;
});

// Show play icon and hide pause icon
function showPlayIcon() {
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
}

// Show pause icon and hide play icon
function showPauseIcon() {
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
}

// Set duration when audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Update current time and progress bar as audio plays
audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const duration = audio.duration;

  currentTimeEl.textContent = formatTime(current);

  if (!isNaN(duration)) {
    const percent = (current / duration) * 100;
    progress.style.width = `${percent}%`;
  }
});

// Click to seek on timeline
timeline.addEventListener('click', (e) => {
  const rect = timeline.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const percent = offsetX / timeline.offsetWidth;
  audio.currentTime = percent * audio.duration;
});

// Reset to play icon when audio ends
audio.addEventListener('ended', () => {
  showPlayIcon();
  isPlaying = false;
});
