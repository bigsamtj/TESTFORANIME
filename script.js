(() => {
  const shell = document.querySelector('.animation-shell');
  const frames = [...document.querySelectorAll('.frame')];
  const playBtn = document.getElementById('playBtn');
  const restartBtn = document.getElementById('restartBtn');
  const speedSelect = document.getElementById('speedSelect');
  const progress = document.getElementById('timelineProgress');
  const frameNumber = document.getElementById('frameNumber');
  const frameLabel = document.getElementById('frameLabel');
  const statusText = document.getElementById('statusText');
  const section = document.getElementById('forensicAnimation');

  const labels = [
    { number: '01', label: 'DETECTION', status: 'THREAT DETECTION' },
    { number: '02', label: 'EXTRACTION', status: 'THREAT EXTRACTED' },
    { number: '03', label: 'DEPLOYMENT', status: 'THREAT ISOLATED' }
  ];

  const DURATION = 8400;
  let speed = 1;
  let elapsed = 0;
  let last = performance.now();
  let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rafId = null;
  let visible = true;

  function setFrame(index) {
    frames.forEach((frame, i) => frame.classList.toggle('is-active', i === index));
    const meta = labels[index];
    frameNumber.textContent = meta.number;
    frameLabel.textContent = meta.label;
    statusText.textContent = meta.status;
  }

  function render(now) {
    if (playing && visible) {
      const dt = Math.min(now - last, 100);
      elapsed = (elapsed + dt * speed) % DURATION;
      const p = elapsed / DURATION;
      progress.style.width = `${p * 100}%`;
      setFrame(p < .33 ? 0 : p < .66 ? 1 : 2);
    }
    last = now;
    rafId = requestAnimationFrame(render);
  }

  function setPlaying(next) {
    playing = next;
    shell.classList.toggle('is-playing', playing);
    playBtn.textContent = playing ? 'Pause' : 'Play';
    playBtn.setAttribute('aria-label', playing ? 'Pause animation' : 'Play animation');
    last = performance.now();
  }

  playBtn.addEventListener('click', () => setPlaying(!playing));

  restartBtn.addEventListener('click', () => {
    elapsed = 0;
    progress.style.width = '0%';
    setFrame(0);
    setPlaying(true);
  });

  speedSelect.addEventListener('change', (event) => {
    speed = Number(event.target.value) || 1;
  });

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) setPlaying(false);
  }, { threshold: 0.15 });
  observer.observe(section);

  // Keyboard support for the animation itself.
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      setPlaying(!playing);
    }
    if (event.key.toLowerCase() === 'r') restartBtn.click();
  });

  setFrame(0);
  shell.classList.toggle('is-playing', playing);
  playBtn.textContent = playing ? 'Pause' : 'Play';
  rafId = requestAnimationFrame(render);

  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();
