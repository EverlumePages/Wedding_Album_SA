/* =============================================================================
   story.js — builds the timeline and runs the localStorage guestbook
============================================================================= */
(function () {
  // ---- Timeline ----
  const tl = document.getElementById("timeline");
  if (tl) {
    tl.innerHTML = STORY.map((s, i) => `
      <div class="tl reveal">
        <span class="tl__dot"></span>
        <div class="tl__media reveal-img"><img loading="lazy" src="${pexImg(s.photo, 900)}" srcset="${pexSrcset(s.photo)}" sizes="(max-width:760px) 100vw, 45vw" alt="${s.title}"></div>
        <div class="tl__txt">
          <span class="tl__year">${s.year}</span>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>
      </div>`).join("");
  }

  // ---- Guestbook (saved locally in this browser) ----
  const KEY = "everlume_guestbook_v1";
  const form = document.getElementById("guestForm");
  const list = document.getElementById("guestList");
  if (!form || !list) { if (window.EVRefresh) window.EVRefresh(); return; }

  const seed = [
    { name: "Mum & Dad", msg: "We have never seen the two of you so happy. Here's to a lifetime of it.", t: 0 },
    { name: "Sofia", msg: "Best wedding I have ever cried at. Twice. Maybe three times.", t: 0 },
    { name: "James & Lin", msg: "That first dance! We're still talking about it. All our love.", t: 0 }
  ];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }
  function save(arr) { localStorage.setItem(KEY, JSON.stringify(arr)); }

  function render() {
    const notes = [...load(), ...seed];
    list.innerHTML = notes.map(n => `
      <div class="note reveal">
        <p>“${escapeHtml(n.msg)}”</p>
        <div class="who">— ${escapeHtml(n.name)}</div>
      </div>`).join("");
    if (window.EVRefresh) window.EVRefresh();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const msg = form.msg.value.trim();
    if (!name || !msg) return;
    const arr = load();
    arr.unshift({ name, msg, t: Date.now() });
    save(arr);
    form.reset();
    render();
  });

  render();
})();
