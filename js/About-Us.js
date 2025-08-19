// script.js

// Subtle pointer-based tilt with motion safety and cleanup
(function tiltCards() {
  const members = document.querySelectorAll('.member');

  const supportsMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches === false;

  members.forEach((card) => {
    const frame = card.querySelector('.frame');
    let rafId = null;

    function onMove(e) {
      if (!supportsMotion) return;

      const rect = frame.getBoundingClientRect();
      const x = (e.clientX ?? (e.touches?.[0]?.clientX || 0)) - rect.left;
      const y = (e.clientY ?? (e.touches?.[0]?.clientY || 0)) - rect.top;

      const px = (x / rect.width) - 0.5;
      const py = (y / rect.height) - 0.5;

      const max = 8; // degrees
      const ry = px * max;
      const rx = -py * max;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        frame.style.setProperty('--rx', `${rx}deg`);
        frame.style.setProperty('--ry', `${ry}deg`);
      });
    }

    function reset() {
      if (rafId) cancelAnimationFrame(rafId);
      frame.style.setProperty('--rx', `0deg`);
      frame.style.setProperty('--ry', `0deg`);
    }

    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointerdown', onMove);
    card.addEventListener('touchmove', onMove, { passive: true });
    card.addEventListener('touchend', reset);
  });
})();
