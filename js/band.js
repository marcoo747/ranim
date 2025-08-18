// Use existing HTML song list and wire up interactions

document.addEventListener('DOMContentLoaded', function () {
  const followToggle = document.getElementById('followToggle');
  const songList = document.getElementById('songList');
  const downloadAllBtn = document.getElementById('downloadAll');
  const shareAllBtn = document.getElementById('shareAll');
  const playAllBtn = document.getElementById('playAll');
  const shuffleToggle = document.getElementById('shuffleToggle');

  const songItems = Array.from(songList.querySelectorAll('.song-item'));
  const songs = songItems.map((li, i) => ({
    title: li.querySelector('.song-title').textContent,
    path: li.querySelector('audio').src,
    li,
    audio: li.querySelector('audio')
  }));

  let audioElements = songs.map(s => s.audio);
  let isShuffled = false;
  let playQueue = [];
  let isPlayingAll = false;

  function buildQueue() {
    playQueue = songs.map((_, i) => i);
    if (isShuffled) {
      for (let i = playQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playQueue[i], playQueue[j]] = [playQueue[j], playQueue[i]];
      }
    }
  }

  function updatePlayAllIcon(playing) {
    if (!playAllBtn) return;
    playAllBtn.src = playing ? '../imgs/pause-fill.png' : '../imgs/play-fill.png';
  }

  function startPlayingIndex(index) {
    audioElements.forEach(a => { a.pause(); a.classList.remove('playing'); });
    const a = audioElements[index];
    if (!a) return;
    a.play();
    a.classList.add('playing');
    isPlayingAll = true;
    updatePlayAllIcon(true);
  }

  function playNextFromQueue(prevIndex) {
    const pos = playQueue.indexOf(prevIndex);
    const nextPos = pos + 1;
    if (nextPos < playQueue.length) startPlayingIndex(playQueue[nextPos]);
    else { isPlayingAll = false; updatePlayAllIcon(false); }
  }

  // wire up per-item controls
  songs.forEach((s, idx) => {
    const li = s.li;
    const play = li.querySelector('.play-icon');
    const sh = li.querySelector('.share-btn');
    const audio = s.audio;

    audio.addEventListener('ended', () => {
      if (isPlayingAll) playNextFromQueue(idx);
    });

    play.addEventListener('click', () => {
      audioElements.forEach(a => { a.pause(); a.classList.remove('playing'); });
      if (audio.paused) { audio.play(); audio.classList.add('playing'); }
      else { audio.pause(); audio.classList.remove('playing'); }
    });

    sh.addEventListener('click', async () => {
      try {
        if (navigator.share) await navigator.share({ title: s.title, text: s.title + '\n' + s.path });
        else if (navigator.clipboard) { await navigator.clipboard.writeText(s.path); alert('Song URL/path copied to clipboard'); }
        else alert('Sharing not supported');
      } catch (err) { console.error(err); }
    });
  });

  // play all handler
  if (playAllBtn) {
    playAllBtn.addEventListener('click', () => {
      if (!isPlayingAll) {
        buildQueue();
        startPlayingIndex(playQueue[0]);
      } else {
        isPlayingAll = false;
        audioElements.forEach(a => { a.pause(); a.classList.remove('playing'); });
        updatePlayAllIcon(false);
      }
    });
  }

  if (shuffleToggle) {
    shuffleToggle.addEventListener('click', () => {
      isShuffled = !isShuffled;
      shuffleToggle.classList.toggle('active', isShuffled);
      buildQueue();
    });
  }

  buildQueue();

  // follow toggle
  if (followToggle) {
    followToggle.addEventListener('click', () => {
      const isFollowing = followToggle.classList.toggle('following');
      followToggle.textContent = isFollowing ? 'Unfollow' : 'Follow';
      if (isFollowing) followToggle.classList.add('unfollow-style'); else followToggle.classList.remove('unfollow-style');
    });
  }

  // download all
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', () => {
      const links = songList.querySelectorAll('a');
      if (!links.length) { alert('No songs to download'); return; }
      links.forEach(link => link.click());
    });
  }

  // share all
  if (shareAllBtn) {
    shareAllBtn.addEventListener('click', async () => {
      const text = songs.map(s => s.title + ' - ' + s.path).join('\n');
      try {
        if (navigator.share) await navigator.share({ title: 'Songs', text });
        else if (navigator.clipboard) { await navigator.clipboard.writeText(text); alert('Songs copied to clipboard'); }
        else alert('Sharing not supported');
      } catch (err) { console.error(err); }
    });
  }

});