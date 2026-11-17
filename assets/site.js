(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- red light ribbons ---------- */
  const c = document.getElementById('ribbons');
  if (c && c.getContext) {
    const x = c.getContext('2d');
    let W = 0, H = 0;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = innerWidth; H = innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const bez = (a, b, d, e, t) => { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * d + t * t * t * e; };
    const R = [
      { pts: (w, h) => [w * 1.12, h * .98, w * .42, h * .92, w * 1.02, h * .08, w * .6, -h * .2], lines: 44, w: .085, tw: 5.2, sp: .35, wob: 3, lw: 1, a: .2, rgb: '235,30,30' },
      { pts: (w, h) => [w * 1.1, h * .9, w * .55, h * .78, w * .9, h * .2, w * .72, -h * .2], lines: 14, w: .03, tw: 7, sp: .5, wob: 2, lw: 1, a: .32, rgb: '255,180,170' },
      { pts: (w, h) => [-w * .15, h * .78, w * .25, h * .62, w * .5, h * 1.05, w * 1.15, h * .82], lines: 26, w: .05, tw: 4, sp: .25, wob: 4, lw: 1, a: .1, rgb: '222,10,10' },
    ];
    const S = 80;
    const draw = (t) => {
      x.clearRect(0, 0, W, H);
      x.globalCompositeOperation = 'lighter';
      const m = Math.min(W, H) * (W < 760 ? 1.6 : 1);
      for (const o of R) {
        const P = o.pts(W, H), cx = [], cy = [], nx = [], ny = [];
        if (W < 760 && o !== R[2]) for (let q = 0; q < 8; q += 2) P[q] += W * .17;
        for (let i = 0; i <= S; i++) { const s = i / S; cx.push(bez(P[0], P[2], P[4], P[6], s)); cy.push(bez(P[1], P[3], P[5], P[7], s)); }
        for (let i = 0; i <= S; i++) {
          const a = Math.max(0, i - 1), b = Math.min(S, i + 1);
          const dx = cx[b] - cx[a], dy = cy[b] - cy[a], l = Math.hypot(dx, dy) || 1;
          nx.push(-dy / l); ny.push(dx / l);
        }
        for (let k = 0; k < o.lines; k++) {
          const f = (k / (o.lines - 1)) * 2 - 1, edge = 1 - Math.abs(f);
          x.beginPath();
          for (let i = 0; i <= S; i++) {
            const s = i / S, w = o.w * m * (.22 + Math.sin(Math.PI * s));
            const off = f * w * Math.cos(t * o.sp + s * o.tw + f * .5) + Math.sin(t * .6 + s * 6 + k * .13) * o.wob;
            const X = cx[i] + nx[i] * off, Y = cy[i] + ny[i] * off;
            i ? x.lineTo(X, Y) : x.moveTo(X, Y);
          }
          x.strokeStyle = `rgba(${o.rgb},${(o.a * .12 * (.3 + edge)).toFixed(3)})`; x.lineWidth = 7; x.stroke();
          x.strokeStyle = `rgba(${o.rgb},${(o.a * (.25 + edge * .75)).toFixed(3)})`; x.lineWidth = o.lw; x.stroke();
        }
      }
    };
    size();
    let last = 0, raf = 0, t0 = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps
      last = now; draw((now - t0) / 1000);
    };
    addEventListener('resize', () => { size(); if (reduce) draw(2); });
    if (reduce) draw(2); else raf = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', () => {
      if (reduce) return;
      if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop);
    });
    const fade = () => { c.style.opacity = Math.max(.32, 1 - scrollY / (innerHeight * 1.4)).toFixed(2); };
    addEventListener('scroll', fade, { passive: true }); fade();
  }

  /* ---------- scale the flow panel to fit ---------- */
  const box = document.getElementById('flowbox'), stage = document.getElementById('stage');
  if (box && stage) {
    const fit = () => {
      const avail = box.clientWidth - 44, s = Math.min(1, avail / 520);
      stage.style.transform = `scale(${s})`;
      box.style.minHeight = (500 * s + 44) + 'px';
      box.style.height = (500 * s + 44) + 'px';
    };
    fit(); addEventListener('resize', fit);
  }

  /* ---------- reveal on scroll + counters ---------- */
  const count = (el) => {
    const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, dur = 1400, st = performance.now();
    const step = (n) => {
      const p = Math.min(1, (n - st) / dur), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec);
      if (p < 1) requestAnimationFrame(step); else el.textContent = end.toFixed(dec);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(e.target);
    }), { threshold: .12 });
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
  }

  /* ---------- mobile menu ---------- */
  const menu = document.getElementById('menu'), links = document.getElementById('links');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', open);
      menu.textContent = open ? 'Close' : 'Menu';
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { links.classList.remove('open'); menu.textContent = 'Menu'; menu.setAttribute('aria-expanded', false); }));
  }

  /* ---------- plan buttons pre-pick the package ---------- */
  const sel = document.getElementById('package');
  document.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
    if (!sel) return;
    [...sel.options].forEach((o) => { if (o.text === b.dataset.pick) sel.value = o.value; });
  }));
})();
