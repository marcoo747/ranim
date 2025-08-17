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

const shareBtn = document.getElementById("shareBtn");
const modal = document.getElementById("shareModal");
const closeBtn = document.querySelector(".close");

// When the share button is clicked, show the modal
shareBtn.onclick = () => {
  const url = window.location.href;
  document.getElementById("shareURL").value = url;

  // Set share URLs for WhatsApp, Facebook, Twitter, and Telegram
  document.getElementById("whatsapp").href = `https://wa.me/?text=${encodeURIComponent(url)}`;
  document.getElementById("facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  document.getElementById("x-twitter").href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
  document.getElementById("telegram").href = `https://t.me/share/url?url=${encodeURIComponent(url)}`;

  // Display the modal
  modal.style.display = "flex"; // This will make the modal visible
};

// Close the modal when the close button (×) is clicked
closeBtn.onclick = () => {
  modal.style.display = "none"; // This will hide the modal
};

// Close the modal if the user clicks outside of it
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none"; // This will hide the modal
  }
};

// Copy URL to clipboard when "Copy" button is clicked
document.getElementById("copyBtn").onclick = () => {
  const shareURL = document.getElementById("shareURL");
  shareURL.select();
  navigator.clipboard.writeText(shareURL.value);
  document.getElementById("copyBtn").textContent = "Copied!";
  setTimeout(() => document.getElementById("copyBtn").textContent = "Copy", 2000);
};

