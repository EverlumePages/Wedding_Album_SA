/* =============================================================================
   film.js — builds the film grid and opens clips in the video modal
============================================================================= */
(function () {
  const grid = document.getElementById("films");
  if (!grid) return;

  const pad = n => String(n + 1).padStart(2, "0");

  grid.innerHTML = VIDEOS.map((v, i) => `
    <figure class="film reveal" data-d="${i % 3}"
            data-src="${v.src}" data-title="${v.title}" data-poster="${pexImg(v.poster, 1100)}">
      <img loading="lazy" decoding="async" src="${pexImg(v.poster, 800)}" alt="${v.title}">
      <span class="film__num">${pad(i)}</span>
      <span class="film__play"><span class="play-glyph"></span></span>
      <figcaption class="film__meta">
        <span class="ft">${v.title}</span>
        <span class="fn">${v.note}</span>
      </figcaption>
    </figure>`).join("");

  grid.addEventListener("click", e => {
    const f = e.target.closest(".film");
    if (!f) return;
    EVVideo.open(f.dataset.src, f.dataset.title, f.dataset.poster);
  });

  if (window.EVRefresh) window.EVRefresh();
})();
