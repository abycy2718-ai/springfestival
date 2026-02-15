(function () {
  'use strict';

  // ===== Key routing =====
  const KEY_MILUNA = 'miluna';
  const KEY_2026 = '2026';

  const GENERAL_MESSAGES = [
    'Happy Year of the Horse!',
    'Happy 2026!',
    '新春快乐 · Happy Spring Festival',
    '万事如意 · May everything go well',
    '阖家幸福 · Family happiness',
    '马到成功 · Success in the Year of the Horse',
    'Wishing you joy and prosperity',
    'With warmth this new year',
    'May the new year bring you peace and health',
    '吉祥如意 · Good luck and happiness',
  ];

  const MILUNA_MESSAGES = [
    'Happy Year of the Horse!',
    'Happy 2026!',
    'To my dearest Miluna, from Allen',
    'Love from your Allen',
    '想着你的叶',
    '辛桐，新年快乐',
    '新春快乐 · 永远爱你',
    '万事如意 · May everything go well',
    'With love, from 叶 to 辛桐',
    'To 辛桐: 马到成功，心想事成',
    'Wishing you joy — love, Allen',
    '阖家幸福 · 爱你',
  ];

  // Gallery: replace these with your own image paths (e.g. gallery/1.jpg) or leave placeholders. 9 photos total.
  const GALLERY_IMAGES = [
    { src: 'gallery/1.jpg', alt: 'Our moment 1' },
    { src: 'gallery/2.jpg', alt: 'Our moment 2' },
    { src: 'gallery/3.jpg', alt: 'Our moment 3' },
    { src: 'gallery/4.jpg', alt: 'Our moment 4' },
    { src: 'gallery/5.jpg', alt: 'Our moment 5' },
    { src: 'gallery/6.jpg', alt: 'Our moment 6' },
    { src: 'gallery/7.jpg', alt: 'Our moment 7' },
    { src: 'gallery/8.jpg', alt: 'Our moment 8' },
    { src: 'gallery/9.jpg', alt: 'Our moment 9' },
  ];
  const GALLERY_PLACEHOLDER = 'https://placehold.co/400x300/6b1228/f4e4bc?text=Our+Memory';

  const MIN_INTERVAL_MS = 2500;
  const MAX_INTERVAL_MS = 5500;
  const MAX_VISIBLE_MESSAGES = 8;
  const MESSAGE_DURATION_MS = 12000;

  // ===== DOM =====
  const gate = document.getElementById('gate');
  const mainGeneral = document.getElementById('main-general');
  const mainMiluna = document.getElementById('main-miluna');
  const gateForm = document.getElementById('gate-form');
  const keyInput = document.getElementById('key-input');
  const gateError = document.getElementById('gate-error');

  // ===== Key gate =====
  function getMode(key) {
    var normalized = String(key).trim().toLowerCase();
    if (normalized === KEY_MILUNA) return 'miluna';
    if (normalized === KEY_2026) return 'general';
    return null;
  }

  function showError(text) {
    gateError.textContent = text || '';
  }

  function unlock(mode) {
    gate.classList.add('hidden');
    showError('');
    if (mode === 'miluna') {
      mainMiluna.classList.remove('hidden');
      startShowingMessages('miluna');
      initGallery();
      startFireworks('fireworks-canvas-miluna');
      startParticles('particles-canvas-miluna');
    } else {
      mainGeneral.classList.remove('hidden');
      startShowingMessages('general');
      startFireworks('fireworks-canvas-general');
      startParticles('particles-canvas-general');
    }
  }

  gateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showError('');
    var key = keyInput.value;
    if (!key) {
      showError('Please enter your key.');
      return;
    }
    var mode = getMode(key);
    if (mode) {
      unlock(mode);
    } else {
      showError('Incorrect key. Please try again.');
      keyInput.select();
    }
  });

  // ===== Messages =====
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function isEmphasis(text) {
    return /Love from|想着你|dearest|from Allen|辛桐|永远爱|叶|Allen/i.test(text);
  }

  function showOneMessage(containerId, messages) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var existing = container.querySelectorAll('.message');
    if (existing.length >= MAX_VISIBLE_MESSAGES) {
      var oldest = existing[0];
      oldest.style.animation = 'messageOut 0.5s ease-out forwards';
      setTimeout(function () { oldest.remove(); }, 500);
    }

    var text = pickRandom(messages);
    var div = document.createElement('div');
    div.className = 'message' + (isEmphasis(text) ? ' emphasis' : '');
    div.setAttribute('role', 'status');
    div.textContent = text;

    container.appendChild(div);

    setTimeout(function () {
      if (div.parentNode) {
        div.style.animation = 'messageOut 0.5s ease-out forwards';
        setTimeout(function () { div.remove(); }, 500);
      }
    }, MESSAGE_DURATION_MS);
  }

  function scheduleNext(containerId, messages) {
    var delay = MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS);
    setTimeout(function () {
      showOneMessage(containerId, messages);
      scheduleNext(containerId, messages);
    }, delay);
  }

  function startShowingMessages(mode) {
    var containerId = mode === 'miluna' ? 'messages-container-miluna' : 'messages-container-general';
    var messages = mode === 'miluna' ? MILUNA_MESSAGES : GENERAL_MESSAGES;
    showOneMessage(containerId, messages);
    scheduleNext(containerId, messages);
  }

  // ===== Gallery (Miluna only) =====
  function initGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';
    GALLERY_IMAGES.forEach(function (item) {
      var a = document.createElement('a');
      a.href = item.src;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'gallery-item';
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.loading = 'lazy';
      img.onerror = function () {
        this.src = GALLERY_PLACEHOLDER;
        this.onerror = null;
      };
      a.appendChild(img);
      grid.appendChild(a);
    });
  }

  // ===== Fireworks =====
  function startFireworks(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var fireworks = [];
    var w = canvas.width = window.innerWidth;
    var h = canvas.height = window.innerHeight;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function Firework(sx, sy) {
      this.x = sx;
      this.y = sy;
      this.tx = random(sx - 80, sx + 80);
      this.ty = random(h * 0.3, h * 0.6);
      this.dist = Math.hypot(this.tx - sx, this.ty - sy);
      this.angle = Math.atan2(this.ty - sy, this.tx - sx);
      this.v = 2 + random(0, 1);
      this.vx = Math.cos(this.angle) * this.v;
      this.vy = Math.sin(this.angle) * this.v;
      this.gone = false;
      this.hue = random(0, 60) < 30 ? random(30, 55) : random(0, 25);
    }
    Firework.prototype.step = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.02;
      if (Math.hypot(this.x - this.tx, this.y - this.ty) < 8) this.gone = true;
      return this.gone;
    };

    function Particle(x, y, hue) {
      this.x = x;
      this.y = y;
      this.vx = random(-6, 6);
      this.vy = random(-6, 6);
      this.hue = hue;
      this.decay = random(0.015, 0.03);
      this.life = 1;
      this.gravity = 0.02;
    }
    Particle.prototype.step = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.vx *= 0.99;
      this.vy *= 0.99;
      this.life -= this.decay;
      return this.life <= 0;
    };

    function explode(fw) {
      var count = 60 + Math.floor(random(0, 40));
      var hue = fw.hue;
      for (var i = 0; i < count; i++) {
        particles.push(new Particle(fw.x, fw.y, hue));
      }
    }

    function launch() {
      var x = random(w * 0.2, w * 0.8);
      var y = h + 20;
      fireworks.push(new Firework(x, y));
    }

    var lastLaunch = 0;
    function loop(now) {
      requestAnimationFrame(loop);
      ctx.fillStyle = 'rgba(139, 21, 56, 0.08)';
      ctx.fillRect(0, 0, w, h);

      if (now - lastLaunch > 1200) {
        launch();
        lastLaunch = now;
      }

      for (var i = fireworks.length - 1; i >= 0; i--) {
        var fw = fireworks[i];
        if (fw.step()) {
          explode(fw);
          fireworks.splice(i, 1);
        } else {
          ctx.fillStyle = 'hsla(' + fw.hue + ', 100%, 60%, 0.9)';
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (var j = particles.length - 1; j >= 0; j--) {
        var p = particles[j];
        if (p.step()) {
          particles.splice(j, 1);
          continue;
        }
        ctx.fillStyle = 'hsla(' + p.hue + ', 100%, 60%, ' + p.life + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(loop);
  }

  // ===== Falling particles (gold/red sparkles, both pages) =====
  function startParticles(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width = window.innerWidth;
    var h = canvas.height = window.innerHeight;
    var sparkles = [];
    var count = 45;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    function Sparkle() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vy = 0.3 + Math.random() * 0.8;
      this.size = 1 + Math.random() * 1.5;
      this.hue = Math.random() < 0.6 ? 45 : 15;
      this.alpha = 0.3 + Math.random() * 0.5;
    }
    Sparkle.prototype.step = function () {
      this.y += this.vy;
      if (this.y > h + 5) {
        this.y = -5;
        this.x = Math.random() * w;
      }
    };

    for (var i = 0; i < count; i++) {
      sparkles.push(new Sparkle());
    }

    function loop() {
      requestAnimationFrame(loop);
      ctx.fillStyle = 'rgba(139, 21, 56, 0.04)';
      ctx.fillRect(0, 0, w, h);

      for (var j = 0; j < sparkles.length; j++) {
        var s = sparkles[j];
        s.step();
        ctx.fillStyle = 'hsla(' + s.hue + ', 80%, 70%, ' + s.alpha + ')';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    loop();
  }
})();
