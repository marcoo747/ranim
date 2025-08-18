(() => {
  // Embedded SVG icons (not local files)
  const ICONS = {
    play: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='30' fill='%231db954'/><polygon points='26,20 26,44 46,32' fill='%23ffffff'/></svg>",
    pause: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='30' fill='%231db954'/><rect x='24' y='20' width='6' height='24' fill='%23ffffff'/><rect x='34' y='20' width='6' height='24' fill='%23ffffff'/></svg>",
    shuffle: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path d='M12 20h16l16 16h8' fill='none' stroke='%23ffffff' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><path d='M12 44h16L44 28h8' fill='none' stroke='%23ffffff' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><polygon points='56,36 48,32 56,28' fill='%23ffffff'/><polygon points='56,28 48,24 56,20' fill='%23ffffff'/></svg>",
    order: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><line x1='12' y1='18' x2='52' y2='18' stroke='%23ffffff' stroke-width='4' stroke-linecap='round'/><line x1='12' y1='32' x2='52' y2='32' stroke='%23ffffff' stroke-width='4' stroke-linecap='round'/><line x1='12' y1='46' x2='52' y2='46' stroke='%23ffffff' stroke-width='4' stroke-linecap='round'/></svg>"
  };

  const playPauseBtn = document.getElementById('play-pause');
  const shuffleBtn = document.getElementById('shuffle-toggle');
  const fileInput = document.getElementById('song-files');
  const tbody = document.getElementById('playlist-body');
  const songCountEl = document.getElementById('song-count');

  const audio = new Audio();
  let playlist = []; 
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  const objectUrls = [];

  const formatTime = secs => {
    if (!isFinite(secs)) return '--:--';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const updatePlayIcon = () => {
    playPauseBtn.src = isPlaying ? ICONS.pause : ICONS.play;
    playPauseBtn.alt = isPlaying ? 'Pause' : 'Play';
  };

  const updateShuffleIcon = () => {
    shuffleBtn.src = isShuffle ? ICONS.shuffle : ICONS.order;
    shuffleBtn.alt = isShuffle ? 'Shuffle' : 'Order';
  };

  const updateSongCount = () => {
    const count = playlist.length;
    songCountEl.textContent = count === 1 ? '1 song' : `${count} songs`;
  };

  const highlightRow = () => {
    [...tbody.children].forEach(tr => tr.classList.remove('playing'));
    const row = tbody.children[currentIndex];
    if (row) row.classList.add('playing');
  };

const renderTable = () => {
  tbody.innerHTML = '';
  playlist.forEach((t, i) => {
    const tr = document.createElement('tr');
    tr.dataset.index = i;
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${t.title}</td>
      <td>${t.album}</td>
      <td>${t.dateAdded}</td>
      <td>${t.duration || '--:--'}</td>
    `;

    // Change from double-click to single-click
    tr.addEventListener('click', () => playIndex(i));

    tbody.appendChild(tr);
  });
  updateSongCount();
  highlightRow();
};


  const playIndex = i => {
    if (!playlist.length) return;
    currentIndex = i;
    audio.src = playlist[i].url;
    audio.play().then(() => {
      isPlaying = true;
      updatePlayIcon();
      highlightRow();
    }).catch(() => {
      isPlaying = false;
      updatePlayIcon();
    });
  };

  const nextTrack = () => {
    if (!playlist.length) return;
    currentIndex = isShuffle && playlist.length > 1
      ? (() => {
          let next;
          do { next = Math.floor(Math.random() * playlist.length); } while (next === currentIndex);
          return next;
        })()
      : (currentIndex + 1) % playlist.length;
    playIndex(currentIndex);
  };

  const togglePlayPause = () => {
    if (!playlist.length) return;
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      if (!audio.src) return playIndex(currentIndex);
      audio.play().then(() => { isPlaying = true; });
    }
    updatePlayIcon();
  };

  const toggleShuffle = () => {
    isShuffle = !isShuffle;
    updateShuffleIcon();
  };

  const appendFiles = files => {
    const today = new Date().toISOString().slice(0, 10);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      objectUrls.push(url);
      const track = {
        title: file.name.replace(/\.[^/.]+$/, ''),
        album: 'Local files',
        dateAdded: today,
        duration: null,
        url
      };
      playlist.push(track);
      const probe = new Audio();
      probe.src = url;
      probe.addEventListener('loadedmetadata', () => {
        track.duration = formatTime(probe.duration);
        renderTable();
      }, { once: true });
    });
    renderTable();
  };

  // Event bindings
  playPauseBtn.addEventListener('click', togglePlayPause);
  shuffleBtn.addEventListener('click', toggleShuffle);
  fileInput.addEventListener('change', e => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const firstAdd = playlist.length === 0;
    appendFiles(files);
    if (firstAdd) playIndex(0);
    e.target.value = '';
  });
  audio.addEventListener('ended', nextTrack);

  // Init
  updatePlayIcon();
  updateShuffleIcon();
})();
