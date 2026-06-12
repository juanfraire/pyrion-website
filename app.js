/* ============================================================
   PYRION — landing page interactions
   Hero grid network, parallax, reveals, KPI count-ups, charts
   ============================================================ */
(() => {
  'use strict';

  const lerp = (a, b, t) => a + (b - a) * t;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────── HERO CANVAS: electric grid ─────────────────────
     A network of nodes connected by lines; energy pulses travel along
     edges; the whole field drifts gently and reacts to the mouse. */
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0, dpr = 1;
    let nodes = [], edges = [], pulses = [];
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNetwork();
    }

    function buildNetwork() {
      nodes = []; edges = []; pulses = [];
      const spacing = Math.max(110, Math.min(W, 1600) / 11);
      const cols = Math.ceil(W / spacing) + 2;
      const rows = Math.ceil(H / spacing) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            bx: c * spacing + (Math.random() - 0.5) * spacing * 0.55 - spacing / 2,
            by: r * spacing + (Math.random() - 0.5) * spacing * 0.55 - spacing / 2,
            phase: Math.random() * Math.PI * 2,
            amp: 6 + Math.random() * 10,
            x: 0, y: 0,
          });
        }
      }
      // connect each node to near neighbors (right & down) — grid-like but organic
      const at = (r, c) => nodes[r * cols + c];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (c + 1 < cols && Math.random() < 0.82) edges.push([at(r, c), at(r, c + 1)]);
          if (r + 1 < rows && Math.random() < 0.82) edges.push([at(r, c), at(r + 1, c)]);
          if (r + 1 < rows && c + 1 < cols && Math.random() < 0.16) edges.push([at(r, c), at(r + 1, c + 1)]);
        }
      }
      // seed pulses
      const nPulses = Math.max(8, Math.floor(edges.length * 0.045));
      for (let i = 0; i < nPulses; i++) spawnPulse();
    }

    function spawnPulse() {
      pulses.push({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      });
    }

    window.addEventListener('pointermove', (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    }, { passive: true });

    let time = 0;
    function frame() {
      time += 0.008;
      mouse.x = lerp(mouse.x, mouse.tx, 0.04);
      mouse.y = lerp(mouse.y, mouse.ty, 0.04);

      // parallax shift of the entire field
      const px = (mouse.x - 0.5) * 28;
      const py = (mouse.y - 0.5) * 20;

      ctx.clearRect(0, 0, W, H);

      // node positions (gentle breathing + parallax)
      for (const n of nodes) {
        n.x = n.bx + Math.sin(time + n.phase) * n.amp + px;
        n.y = n.by + Math.cos(time * 0.8 + n.phase) * n.amp + py;
      }

      // edges
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        ctx.strokeStyle = 'rgba(79, 139, 255, 0.07)';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(91, 212, 255, 0.16)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // pulses (energy packets traveling along edges)
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.edge = edges[Math.floor(Math.random() * edges.length)];
        }
        const [a, b] = p.edge;
        const x = lerp(a.x, b.x, p.t);
        const y = lerp(a.y, b.y, p.t);
        const fade = Math.sin(p.t * Math.PI); // ease in/out along the edge
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, `rgba(91, 212, 255, ${0.55 * fade})`);
        g.addColorStop(1, 'rgba(91, 212, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(230, 237, 247, ${0.85 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    if (reduced) {
      // static single render
      time = 1; mouse.x = mouse.tx; mouse.y = mouse.ty;
      // draw once without scheduling
      const raf = window.requestAnimationFrame;
      window.requestAnimationFrame = () => {};
      frame();
      window.requestAnimationFrame = raf;
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ───────────────────── hero chips mouse-parallax ───────────────────── */
  function initChipParallax() {
    if (reduced) return;
    const chips = [...document.querySelectorAll('.chip')];
    if (!chips.length) return;
    let tx = 0, ty = 0, x = 0, y = 0;
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
    (function tick() {
      x = lerp(x, tx, 0.05); y = lerp(y, ty, 0.05);
      for (const c of chips) {
        const d = parseFloat(c.dataset.depth || '0.5');
        c.style.transform = `translate(${-x * 40 * d}px, ${-y * 28 * d}px)`;
      }
      requestAnimationFrame(tick);
    })();
  }

  /* ───────────────────── scroll: progress + nav ───────────────────── */
  function initScrollChrome() {
    const bar = document.querySelector('.scroll-progress i');
    const nav = document.querySelector('.nav');
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = `${(window.scrollY / Math.max(max, 1)) * 100}%`;
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ───────────────────── reveal on scroll ───────────────────── */
  function initReveals() {
    const els = [...document.querySelectorAll('.reveal')];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          // stagger siblings slightly
          const i = [...e.target.parentElement.children].indexOf(e.target);
          e.target.style.transitionDelay = `${Math.min(i * 0.08, 0.4)}s`;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
  }

  /* ───────────────────── KPI count-up ───────────────────── */
  function initCounters() {
    const els = [...document.querySelectorAll('.count')];
    const fmt = (v, dec) => v.toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.decimals || '0', 10);
        const pre = el.dataset.prefix || '';
        const suf = el.dataset.suffix || '';
        if (reduced) { el.textContent = pre + fmt(target, dec) + suf; continue; }
        const t0 = performance.now(), dur = 1600;
        (function step(now) {
          const t = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = pre + fmt(target * eased, dec) + suf;
          if (t < 1) requestAnimationFrame(step);
        })(t0);
      }
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  }

  /* ───────────────────── demand-curve SVG ─────────────────────
     Stylized 24 h industrial profile: demand line, PV bell, BESS
     dispatch, shaded PPAD peak window. Paths draw on scroll. */
  function initDemandCurve() {
    const svg = document.getElementById('demand-curve');
    if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    const W = 640, H = 240, pad = 14;
    const X = (h) => pad + (h / 24) * (W - 2 * pad);
    const Y = (v) => H - pad - v * (H - 2 * pad); // v in 0..1

    // stylized curves (hour, normalized value)
    const demand = [[0,.32],[2,.28],[4,.27],[6,.38],[8,.62],[10,.72],[12,.68],[14,.74],[16,.7],[18,.88],[20,.97],[22,.6],[24,.34]];
    const pv     = [[0,0],[6,0],[8,.18],[10,.46],[12,.58],[14,.5],[16,.26],[18,.03],[19,0],[24,0]];
    const bess   = [[0,.06],[6,.1],[10,.0],[12,-.08],[14,-.06],[17,.02],[18,.3],[20,.4],[22,.08],[24,.05]];

    const smooth = (pts, yOff = 0) => {
      let d = `M ${X(pts[0][0])} ${Y(pts[0][1] + yOff)}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
        const cx = (X(x0) + X(x1)) / 2;
        d += ` C ${cx} ${Y(y0 + yOff)}, ${cx} ${Y(y1 + yOff)}, ${X(x1)} ${Y(y1 + yOff)}`;
      }
      return d;
    };

    // PPAD peak band 18–23 h
    const band = document.createElementNS(NS, 'rect');
    band.setAttribute('x', X(18)); band.setAttribute('y', pad);
    band.setAttribute('width', X(23) - X(18)); band.setAttribute('height', H - 2 * pad);
    band.setAttribute('fill', 'rgba(91, 212, 255, 0.07)');
    svg.appendChild(band);

    // grid lines
    for (let h = 0; h <= 24; h += 6) {
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', X(h)); l.setAttribute('x2', X(h));
      l.setAttribute('y1', pad); l.setAttribute('y2', H - pad);
      l.setAttribute('stroke', 'rgba(30, 42, 68, 0.6)');
      svg.appendChild(l);
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', X(h)); t.setAttribute('y', H - 1);
      t.setAttribute('fill', '#6A7488'); t.setAttribute('font-size', '9');
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-family', 'JetBrains Mono, monospace');
      t.textContent = `${h}h`;
      svg.appendChild(t);
    }

    const mk = (pts, color, width, dash, yOff = 0) => {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', smooth(pts, yOff));
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', color);
      p.setAttribute('stroke-width', width);
      p.setAttribute('stroke-linecap', 'round');
      if (dash) p.setAttribute('stroke-dasharray', dash);
      svg.appendChild(p);
      return p;
    };

    const paths = [
      mk(pv, '#B58CFF', 1.8, null),
      mk(bess, '#4F8BFF', 1.8, '5 5', 0.25),
      mk(demand, '#5BD4FF', 2.4, null),
    ];

    // draw-on-scroll
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.disconnect();
        paths.forEach((p, i) => {
          const len = p.getTotalLength();
          if (reduced) return;
          p.style.strokeDasharray = p.getAttribute('stroke-dasharray')
            ? p.getAttribute('stroke-dasharray') : `${len}`;
          p.style.strokeDashoffset = `${len}`;
          p.style.transition = `stroke-dashoffset 1.8s ${0.25 * i}s cubic-bezier(0.22, 1, 0.36, 1)`;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            p.style.strokeDashoffset = '0';
          }));
        });
      }
    }, { threshold: 0.4 });
    io.observe(svg);
  }

  /* ───────────────────── energy flow map ─────────────────────
     Sources (spot, contratos, PV, BESS) → plant. Animated dashes. */
  function initFlowMap() {
    const svg = document.getElementById('flow-map');
    if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    const sources = [
      { label: 'SPOT', y: 18, color: '#6A7488' },
      { label: 'MATER · MATE', y: 48, color: '#4F8BFF' },
      { label: 'SOLAR PV', y: 78, color: '#B58CFF' },
      { label: 'BESS', y: 108, color: '#5BD4FF' },
    ];
    const plantX = 500, plantY = 63;

    for (const s of sources) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', 8); t.setAttribute('y', s.y + 3);
      t.setAttribute('fill', s.color); t.setAttribute('font-size', '10');
      t.setAttribute('font-family', 'JetBrains Mono, monospace');
      t.setAttribute('letter-spacing', '1');
      t.textContent = s.label;
      svg.appendChild(t);

      const p = document.createElementNS(NS, 'path');
      const x0 = 130;
      p.setAttribute('d', `M ${x0} ${s.y} C ${x0 + 160} ${s.y}, ${plantX - 160} ${plantY}, ${plantX - 12} ${plantY}`);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', s.color);
      p.setAttribute('stroke-width', '1.5');
      p.setAttribute('stroke-dasharray', '4 7');
      p.setAttribute('opacity', '0.8');
      if (!reduced) {
        const a = document.createElementNS(NS, 'animate');
        a.setAttribute('attributeName', 'stroke-dashoffset');
        a.setAttribute('from', '110'); a.setAttribute('to', '0');
        a.setAttribute('dur', `${5 + Math.random() * 3}s`);
        a.setAttribute('repeatCount', 'indefinite');
        p.appendChild(a);
      }
      svg.appendChild(p);
    }

    // plant node
    const g = document.createElementNS(NS, 'g');
    const halo = document.createElementNS(NS, 'circle');
    halo.setAttribute('cx', plantX); halo.setAttribute('cy', plantY); halo.setAttribute('r', 16);
    halo.setAttribute('fill', 'rgba(79, 139, 255, 0.15)');
    const core = document.createElementNS(NS, 'circle');
    core.setAttribute('cx', plantX); core.setAttribute('cy', plantY); core.setAttribute('r', 5);
    core.setAttribute('fill', '#5BD4FF');
    const label = document.createElementNS(NS, 'text');
    label.setAttribute('x', plantX + 26); label.setAttribute('y', plantY + 3);
    label.setAttribute('fill', '#A0AABF'); label.setAttribute('font-size', '10');
    label.setAttribute('font-family', 'JetBrains Mono, monospace');
    label.setAttribute('letter-spacing', '1');
    label.textContent = 'SU PLANTA';
    label.setAttribute('data-flow-label', '');
    g.append(halo, core, label);
    svg.appendChild(g);
  }

  /* ───────────────────── contact form → mailto ───────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = `Pyrion — Diagnóstico preliminar: ${d.get('empresa') || ''}`;
      const body = [
        `Empresa: ${d.get('empresa') || '-'}`,
        `Contacto: ${d.get('nombre') || '-'} <${d.get('email') || '-'}>`,
        `Demanda anual estimada: ${d.get('demanda') || '-'} MWh`,
        '',
        'Situación actual:',
        d.get('situacion') || '-',
      ].join('\n');
      window.location.href =
        `mailto:juanfraire@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* ───────────────────── boot ───────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initChipParallax();
    initScrollChrome();
    initReveals();
    initCounters();
    initDemandCurve();
    initFlowMap();
    initContactForm();
  });
})();
