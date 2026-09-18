/* ══════════════════════════════════════════════════════════════════════════
   WILSONIC BOOM — V1 "MACHINED" · motion
   Grammar: a CNC axis move. One axis, exponential deceleration, hard stop
   with a small settle. Nothing floats, nothing bounces, nothing fades in
   from nowhere. Motion is additive: with this file removed the page is
   complete and readable.
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.classList.add('js');
  root.classList.add('motion-ready');   /* tells the <head> fallback we arrived */

  /* ── 1. Placeholder tokens ───────────────────────────────────────────────
     Wrap every [[ … ]] so an unfilled slot is unmistakable. Text nodes only:
     attributes (href, mailto) are deliberately left alone so the team can
     find them with a plain search. */
  (function markTokens() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || node.nodeValue.indexOf('[[') === -1) return NodeFilter.FILTER_REJECT;
        var p = node.parentNode;
        if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var targets = [], n;
    while ((n = walker.nextNode())) targets.push(n);

    targets.forEach(function (node) {
      var frag = document.createDocumentFragment();
      var text = node.nodeValue;
      var re = /\[\[([^\]]+)\]\]/g;
      var last = 0, m;

      while ((m = re.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var span = document.createElement('span');
        span.className = m[1].length > 34 ? 'tok tok--block' : 'tok';
        span.textContent = m[1];
        frag.appendChild(span);
        last = re.lastIndex;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  })();

  /* ── 2. Split etched headings into masked lines ─────────────────────────
     Splits on the authored <br>, so the line breaks stay the designer's
     decision rather than the browser's. */
  (function splitEtch() {
    document.querySelectorAll('[data-etch]').forEach(function (el) {
      var parts = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = parts.map(function (p) {
        return '<span class="line"><span>' + p.trim() + '</span></span>';
      }).join('');
    });
  })();

  /* ── 3. Tag reveal targets ──────────────────────────────────────────────
     Done here rather than in the markup so the HTML stays about content. */
  (function tagRises() {
    var groups = [
      ['.plate--title', 0],
      ['.plate--media', 90],
      ['.plate--head', 0],
      ['.record__side', 90],
      ['.teaser__stage', 0],
      ['.teaser__side', 90],
      ['.award', 70],
      ['.archive__row', 45],
      ['.act', 60],
      ['.spon', 50],
      ['.split__l .h2, .split__r > .body, .split__r > .specs, .split__r > .reach', 60],
      ['.record__log', 90],
      ['.log__row', 45],
      ['.assembly__stage', 0],
      ['.keys .key', 60],
      ['.roster__p', 40],
      ['.steps .step', 90],
      ['.tiers .tier', 90],
      ['.close', 0],
      ['.band > .wrap > .h2, .band > .wrap > .body--wide', 60]
    ];

    groups.forEach(function (g) {
      document.querySelectorAll(g[0]).forEach(function (el, i) {
        if (el.hasAttribute('data-rise')) return;
        el.setAttribute('data-rise', '');
        if (g[1]) el.style.setProperty('--d', (i % 6) * g[1] + 'ms');
      });
    });

    /* Sequencing inside a component: a readout fills row by row, a plate
       stamps value by value, markers arm one after another. --rd is the
       per-child delay the stylesheet reads. */
    [
      ['.specs', '.specs__row', 55],
      ['[data-stamp]', '.dplate__r dd', 70],
      ['.assembly', '.mk', 90],
      ['.reach', '.reach__i', 60]
    ].forEach(function (pair) {
      document.querySelectorAll(pair[0]).forEach(function (host) {
        host.querySelectorAll(pair[1]).forEach(function (child, i) {
          child.style.setProperty('--rd', i * pair[2] + 'ms');
        });
      });
    });

    /* The data plate's rivets are set after the values have stamped. */
    document.querySelectorAll('[data-stamp]').forEach(function (p) {
      var last = p.querySelectorAll('.dplate__r').length;
      p.style.setProperty('--rd-last', last * 70 + 'ms');
    });
  })();

  /* ── 4. Reveal on entry ─────────────────────────────────────────────────
     One pass. Once a thing has arrived it stays arrived — re-animating on
     scroll-back is the tell of a page that is performing rather than working. */
  var watched = '[data-rise], [data-etch], .change, .specs, [data-stamp], .assembly, .reach';
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    document.querySelectorAll(watched).forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(watched).forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── 4b. THE EXPLODED ASSEMBLY ──────────────────────────────────────────
     One stage, four callouts. Selecting a callout wipes that subsystem's
     detail over the assembly and opens its entry in the key list; selecting
     it again returns to the full assembly. Markers and key rows are two
     controls for one piece of state.

     Without this script the markers are inert buttons and every key entry
     reads in full — which is why the collapsed prose is hidden by a class
     the script owns, never by a default in the markup. */
  document.querySelectorAll('[data-assembly]').forEach(function assembly(root) {

    var marks = Array.prototype.slice.call(root.querySelectorAll('.mk'));
    var keys  = Array.prototype.slice.call(root.querySelectorAll('.key'));
    var views = Array.prototype.slice.call(root.querySelectorAll('.stage__view'));
    var tag   = root.querySelector('[data-stage-tag]');
    if (!marks.length || !views.length) return;

    var ASSEMBLY_LABEL = tag ? tag.textContent.trim() : 'Full assembly';
    var current = null;

    function labelFor(id) {
      var key = keys.filter(function (k) { return k.getAttribute('data-key') === id; })[0];
      var h = key && key.querySelector('.h3');
      return h ? h.textContent.trim() : 'Item ' + id;
    }

    function show(id) {
      current = id;

      marks.forEach(function (m) {
        m.setAttribute('aria-pressed', String(m.getAttribute('data-mk') === id));
      });
      keys.forEach(function (k) {
        k.classList.toggle('is-on', k.getAttribute('data-key') === id);
      });
      views.forEach(function (v) {
        var on = v.getAttribute('data-view') === (id || '0');
        v.classList.toggle('is-on', on);
        if (v.getAttribute('data-view') !== '0') {
          v.setAttribute('aria-hidden', on ? 'false' : 'true');
        }
      });
      if (tag) tag.textContent = id ? labelFor(id) : ASSEMBLY_LABEL;
    }

    marks.forEach(function (m) {
      var id = m.getAttribute('data-mk');
      m.addEventListener('click', function () { show(current === id ? null : id); });
      m.addEventListener('mouseenter', function () { if (current !== id) show(id); });
    });

    keys.forEach(function (k) {
      var id = k.getAttribute('data-key');
      k.addEventListener('mouseenter', function () { if (current !== id) show(id); });
      k.addEventListener('click', function () { show(current === id ? null : id); });
    });

    /* Scroll-driven activation. The stage is pinned beside the key list, so
       reading down the subsystems swaps the stage without any clicking — a
       sponsor who never touches the page still sees the mechanism work.
       Hover and click are the same piece of state, so the last input wins. */
    var keyEls = keys.slice();
    var ticking = false;

    function scan() {
      ticking = false;
      var stage = root.querySelector('.assembly__stage');
      if (!stage || !stage.offsetParent) return;   /* in a hidden version / season */

      /* only drive from scroll while the stage is actually on screen */
      if (getComputedStyle(stage).position !== 'sticky') return;
      var sb = stage.getBoundingClientRect();
      if (sb.bottom < 0 || sb.top > window.innerHeight) return;

      var anchor = sb.top + sb.height / 2;
      var best = null, bestDist = Infinity;
      for (var i = 0; i < keyEls.length; i++) {
        var b = keyEls[i].getBoundingClientRect();
        var d = Math.abs((b.top + b.height / 2) - anchor);
        if (d < bestDist) { bestDist = d; best = keyEls[i]; }
      }
      if (best) show(best.getAttribute('data-key'));
    }

    if (!reduced) {
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(scan); }
      }, { passive: true });
    }

    /* Open on the first subsystem so the mechanism is legible before any
       scrolling has happened. */
    show(marks[0].getAttribute('data-mk'));
    if (!reduced) scan();
  });

  /* ── 4c. STATE IN THE URL ────────────────────────────────────────────────
     #season=2025-26&v=V2.1 — so a sponsor can be sent straight to a version. */
  function readHash() {
    var out = {};
    location.hash.replace(/^#/, '').split('&').forEach(function (kv) {
      var i = kv.indexOf('=');
      if (i > 0) out[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1));
    });
    return out;
  }
  function writeHash(patch) {
    var h = readHash();
    Object.keys(patch).forEach(function (k) {
      if (patch[k] == null) delete h[k]; else h[k] = patch[k];
    });
    var str = Object.keys(h).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(h[k]); }).join('&');
    history.replaceState(null, '', str ? '#' + str : location.pathname + location.search);
  }

  /* ── 4d. SEASON SWITCH ───────────────────────────────────────────────────
     One control drives every [data-season-panel] on the page. */
  var seasonApi = (function seasons() {
    var btns = Array.prototype.slice.call(document.querySelectorAll('[data-season-switch] [data-season]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[data-season-panel]'));
    if (!panels.length) return null;

    function set(slug, fromUser) {
      var known = panels.some(function (p) { return p.getAttribute('data-season-panel') === slug; });
      if (!known) return;
      panels.forEach(function (p) { p.hidden = p.getAttribute('data-season-panel') !== slug; });
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-season') === slug)); });
      if (fromUser) writeHash({ season: slug, v: null });
      /* Nothing to do for entrances: content in a panel that was hidden is
         still being watched, and arrives the moment the panel is shown. */
      document.dispatchEvent(new CustomEvent('season:change', { detail: slug }));
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () { set(b.getAttribute('data-season'), true); });
    });

    /* Apply the starting state with the hidden attribute. Until this line runs,
       CSS shows only the default season, so there is no flash either way. */
    var initial = readHash().season;
    var fallback = (panels.filter(function (p) { return p.hasAttribute('data-season-default'); })[0] || panels[0])
      .getAttribute('data-season-panel');
    set(initial || fallback, false);
    if (initial && !panels.some(function (p) { return p.getAttribute('data-season-panel') === initial; })) set(fallback, false);
    return { set: set };
  })();

  /* ── 4e. THE VERSION RAIL ────────────────────────────────────────────────
     A machinist's rule of the robot's history. Arrows, arrow keys, a click on
     any tick, or a swipe across the photograph all move the carriage. The
     carriage travels on one axis and stops hard: the page's CNC grammar. */
  document.querySelectorAll('[data-versions]').forEach(function (box) {
    var ticks = Array.prototype.slice.call(box.querySelectorAll('[data-step]'));
    var panels = Array.prototype.slice.call(box.querySelectorAll('[data-ver]'));
    var carriage = box.querySelector('[data-carriage]');
    var prev = box.querySelector('[data-rail-prev]');
    var next = box.querySelector('[data-rail-next]');
    var rail = box.querySelector('[data-rail]');
    if (!ticks.length) return;

    box.classList.add('is-live');   /* the stylesheet only shows the rail once this runs */
    var index = -1;

    function select(i, fromUser) {
      i = Math.max(0, Math.min(ticks.length - 1, i));
      if (i === index) return;
      var dir = i > index ? 1 : -1;
      index = i;
      var id = ticks[i].getAttribute('data-step');

      ticks.forEach(function (t, j) { t.setAttribute('aria-pressed', String(j === i)); });
      panels.forEach(function (p) {
        var on = p.getAttribute('data-ver') === id;
        p.hidden = !on;
        if (on && fromUser && !reduced) {
          p.style.setProperty('--dir', dir);
          p.classList.remove('is-arriving'); void p.offsetWidth; p.classList.add('is-arriving');
        }
      });
      if (carriage) carriage.style.setProperty('--pos', ticks[i].getAttribute('data-pos') + '%');
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === ticks.length - 1;
      if (fromUser) writeHash({ v: id });
    }

    ticks.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, true); });
    });
    if (prev) prev.addEventListener('click', function () { select(index - 1, true); });
    if (next) next.addEventListener('click', function () { select(index + 1, true); });

    if (rail) rail.addEventListener('keydown', function (e) {
      var to = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = index + 1;
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   to = index - 1;
      if (e.key === 'Home') to = 0;
      if (e.key === 'End')  to = ticks.length - 1;
      if (to === null) return;
      e.preventDefault();
      select(to, true);
      ticks[index].focus();
    });

    /* swipe across the photograph — a deliberate horizontal drag only, so a
       tap on a callout marker or a vertical scroll never changes version */
    box.querySelectorAll('[data-swipe]').forEach(function (area) {
      var x0 = null, y0 = null;
      area.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        x0 = e.clientX; y0 = e.clientY;
      });
      area.addEventListener('pointerup', function (e) {
        if (x0 === null) return;
        var dx = e.clientX - x0, dy = e.clientY - y0;
        x0 = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) select(index + (dx < 0 ? 1 : -1), true);
      });
      area.addEventListener('pointercancel', function () { x0 = null; });
    });

    /* where to start: the URL if it names a version here, else the latest
       major version — the robot as it stands, with its assembly */
    var want = readHash().v;
    var start = ticks.findIndex(function (t) { return t.getAttribute('data-step') === want; });
    if (start < 0) {
      var def = box.getAttribute('data-default');
      start = ticks.findIndex(function (t) { return t.getAttribute('data-step') === def; });
    }
    select(start < 0 ? ticks.length - 1 : start, false);
  });

  /* ── 5. The overture: one light sweep across the title plate ───────────── */
  if (!reduced) {
    var title = document.querySelector('.plate--title');
    if (title) requestAnimationFrame(function () { title.classList.add('is-lit'); });
  }

  /* ── 6. Topbar seam appears once the hero has left ──────────────────────── */
  (function stickyBar() {
    var bar = document.querySelector('.topbar');
    if (!bar) return;
    var ticking = false;
    function update() {
      bar.classList.toggle('is-stuck', window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* ── 7. Phone menu ───────────────────────────────────────────────────────
     The current page is marked in the markup (aria-current), so nothing here
     guesses where you are. This only opens and closes the menu, and closes it
     again on Escape or when the viewport grows back past the phone layout. */
  (function menu() {
    var btn = document.querySelector('[data-menu-btn]');
    var panel = document.querySelector('[data-menu]');
    if (!btn || !panel) return;

    function set(open) {
      btn.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    }
    btn.addEventListener('click', function () {
      set(btn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        set(false);
        btn.focus();
      }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) {
      if (m.matches) set(false);
    });
  })();

})();
