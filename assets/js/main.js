/* =============================================================================
   EVERLUME — main.js
   Shared behaviour: preloader, nav, scroll reveals, parallax, counters,
   and a reusable image lightbox + video modal.
============================================================================= */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  function preloader() {
    const pl = $(".preloader");
    if (!pl) return;
    requestAnimationFrame(() => pl.classList.add("go"));
    const hide = () => {
      pl.classList.add("done");
      document.body.classList.add("loaded");
      setTimeout(() => pl.remove(), 1000);
    };
    window.addEventListener("load", () => setTimeout(hide, 650));
    // safety net
    setTimeout(hide, 3200);
  }

  /* ---------- Nav ---------- */
  function nav() {
    const nav = $(".nav");
    if (!nav) return;
    const hasHero = !!$(".hero, .pagehead");
    const onScroll = () => {
      const solid = window.scrollY > (hasHero ? window.innerHeight * 0.62 : 20);
      nav.classList.toggle("solid", solid);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $(".nav__toggle");
    if (toggle) {
      toggle.addEventListener("click", () =>
        document.body.classList.toggle("menu-open")
      );
      $$(".nav__menu a").forEach(a =>
        a.addEventListener("click", () =>
          document.body.classList.remove("menu-open")
        )
      );
    }

    // mark active link by filename
    const here = location.pathname.split("/").pop() || "index.html";
    $$(".nav__menu a").forEach(a => {
      const href = a.getAttribute("href");
      if (href === here || (here === "" && href === "index.html"))
        a.classList.add("active");
    });
  }

  /* ---------- Scroll reveals ---------- */
  function reveals() {
    const els = $$(".reveal, .reveal-img");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(el => io.observe(el));
  }

  /* ---------- Parallax ---------- */
  function parallax() {
    if (reduce) return;
    const layers = $$("[data-parallax]");
    if (!layers.length) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      layers.forEach(layer => {
        const r = layer.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(layer.dataset.parallax) || 0.18;
        const mid = r.top + r.height / 2 - vh / 2;
        layer.style.transform = `translate3d(0, ${(-mid * speed).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Counters ---------- */
  function counters() {
    const nums = $$("[data-count]").filter(el => !el.dataset.bound);
    if (!nums.length) return;
    const run = el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      if (reduce) { el.textContent = target; return; }
      const dur = 1600, t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(n => { n.dataset.bound = "1"; io.observe(n); });
  }

  /* ---------- Footer year + couple bits ---------- */
  function fillBits() {
    $$("[data-couple]").forEach(el => (el.textContent = SITE.couple));
    $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
  }

  /* =========================================================================
     IMAGE LIGHTBOX  (reusable)
     Window.EVLightbox.open(items, index)  — items: [{src, srcset, title, sub}]
  ========================================================================= */
  const Lightbox = (() => {
    let root, imgEl, capT, capS, count, items = [], idx = 0, built = false;

    const ICON = {
      close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 5l14 14M19 5L5 19"/></svg>',
      prev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M15 5l-7 7 7 7"/></svg>',
      next:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 5l7 7-7 7"/></svg>'
    };

    function build() {
      root = document.createElement("div");
      root.className = "lb";
      root.innerHTML = `
        <div class="lb__count"></div>
        <button class="lb__close" aria-label="Close">${ICON.close}</button>
        <button class="lb__btn lb__prev" aria-label="Previous">${ICON.prev}</button>
        <button class="lb__btn lb__next" aria-label="Next">${ICON.next}</button>
        <div class="lb__stage"><img class="lb__img" alt=""></div>
        <div class="lb__cap"><div class="t"></div><div class="s"></div></div>`;
      document.body.appendChild(root);
      imgEl = $(".lb__img", root);
      capT  = $(".lb__cap .t", root);
      capS  = $(".lb__cap .s", root);
      count = $(".lb__count", root);
      $(".lb__close", root).addEventListener("click", close);
      $(".lb__prev", root).addEventListener("click", () => go(-1));
      $(".lb__next", root).addEventListener("click", () => go(1));
      root.addEventListener("click", e => { if (e.target === root || e.target.closest(".lb__stage") === $(".lb__stage", root) && e.target.classList.contains("lb__stage")) close(); });
      $(".lb__stage", root).addEventListener("click", e => { if (e.target.classList.contains("lb__stage")) close(); });
      // swipe
      let sx = 0;
      root.addEventListener("touchstart", e => (sx = e.touches[0].clientX), { passive: true });
      root.addEventListener("touchend", e => {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      });
      built = true;
    }

    function render() {
      const it = items[idx];
      imgEl.classList.remove("in");
      const pre = new Image();
      pre.onload = () => { imgEl.classList.add("in"); };
      imgEl.src = it.src;
      if (it.srcset) imgEl.srcset = it.srcset; else imgEl.removeAttribute("srcset");
      imgEl.sizes = "92vw";
      pre.src = it.src;
      capT.textContent = it.title || "";
      capS.textContent = it.sub || "";
      count.textContent = `${idx + 1} — ${items.length}`;
      // preload neighbours
      [idx + 1, idx - 1].forEach(j => {
        const n = items[(j + items.length) % items.length];
        if (n) { const im = new Image(); im.src = n.src; }
      });
    }

    function go(d) { idx = (idx + d + items.length) % items.length; render(); }

    function open(list, i = 0) {
      if (!built) build();
      items = list; idx = i;
      root.classList.add("open");
      document.body.style.overflow = "hidden";
      render();
      document.addEventListener("keydown", onKey);
    }
    function close() {
      root.classList.remove("open");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }
    return { open };
  })();
  window.EVLightbox = Lightbox;

  /* =========================================================================
     VIDEO MODAL
  ========================================================================= */
  const VideoModal = (() => {
    let root, vid, capT, built = false;
    function build() {
      root = document.createElement("div");
      root.className = "lb";
      root.innerHTML = `
        <button class="lb__close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
        <div class="lb__stage"><video class="lb__video" controls playsinline></video></div>
        <div class="lb__cap"><div class="t"></div></div>`;
      document.body.appendChild(root);
      vid = $(".lb__video", root);
      capT = $(".lb__cap .t", root);
      $(".lb__close", root).addEventListener("click", close);
      $(".lb__stage", root).addEventListener("click", e => { if (e.target.classList.contains("lb__stage")) close(); });
      built = true;
    }
    function open(src, title, poster) {
      if (!built) build();
      root.classList.add("open");
      document.body.style.overflow = "hidden";
      vid.src = src;
      if (poster) vid.poster = poster;
      capT.textContent = title || "";
      vid.play().catch(() => {});
      document.addEventListener("keydown", onKey);
    }
    function close() {
      root.classList.remove("open");
      document.body.style.overflow = "";
      vid.pause(); vid.removeAttribute("src"); vid.load();
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    return { open };
  })();
  window.EVVideo = VideoModal;

  /* ---------- Image error guard (hide rare broken tiles) ---------- */
  function guardImages() {
    document.addEventListener("error", e => {
      const t = e.target;
      if (t && t.tagName === "IMG" && t.closest(".tile")) {
        t.closest(".tile").classList.add("broken");
      }
    }, true);
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    preloader();
    nav();
    fillBits();
    guardImages();
    // hero pre-line
    const pre = $(".hero__pre");
    if (pre) requestAnimationFrame(() => pre.classList.add("show"));
    // these run after gallery/film inject content too (called again there)
    reveals();
    parallax();
    counters();
  });

  // expose for pages that inject DOM dynamically
  window.EVRefresh = () => { reveals(); parallax(); counters(); };
})();
