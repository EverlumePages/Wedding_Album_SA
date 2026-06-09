/* =============================================================================
   gallery.js — builds the filterable masonry + wires the lightbox
============================================================================= */
(function () {
  const grid = document.getElementById("masonry");
  const filterBar = document.getElementById("filters");
  if (!grid) return;

  // ---- Filters ----
  const cats = [{ id: "all", label: "All" }, ...CHAPTERS];
  filterBar.innerHTML = cats
    .map((c, i) => `<button data-cat="${c.id}" class="${i === 0 ? "active" : ""}">${c.label}</button>`)
    .join("");

  // ---- Tiles ----
  grid.innerHTML = PHOTOS.map((p, i) => `
    <figure class="tile reveal" data-chapter="${p.chapter}" data-i="${i}">
      <img loading="lazy" decoding="async"
           src="${pexImg(p.id, 600)}"
           srcset="${pexSrcset(p.id)}"
           sizes="(max-width:440px) 100vw, (max-width:760px) 50vw, (max-width:1100px) 33vw, 25vw"
           alt="${p.caption} — ${p.chapterLabel}">
      <figcaption class="tile__cap">
        <span class="c1">${p.caption}</span>
        <span class="c2">${p.chapterLabel}</span>
      </figcaption>
    </figure>`).join("");

  // ---- Lightbox items helper (only currently-visible tiles) ----
  function visiblePhotos() {
    return Array.from(grid.querySelectorAll(".tile"))
      .filter(t => !t.classList.contains("broken") && t.style.display !== "none")
      .map(t => {
        const p = PHOTOS[+t.dataset.i];
        return {
          el: t,
          src: pexImg(p.id, 1800),
          srcset: pexSrcset(p.id),
          title: p.caption,
          sub: p.chapterLabel
        };
      });
  }

  grid.addEventListener("click", e => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    const items = visiblePhotos();
    const idx = items.findIndex(it => it.el === tile);
    if (idx >= 0) EVLightbox.open(items, idx);
  });

  // ---- Filtering ----
  filterBar.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filterBar.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat;
    grid.querySelectorAll(".tile").forEach(t => {
      const show = cat === "all" || t.dataset.chapter === cat;
      t.style.display = show ? "" : "none";
    });
  });

  if (window.EVRefresh) window.EVRefresh();
})();
