/* =============================================================================
   EVERLUME — Wedding Keepsake
   data.js  ·  The single source of truth for the whole site.
   -----------------------------------------------------------------------------
   Everything you'd want to customise lives here:
     • SITE      — the couple's names, date, place, and the words on the pages
     • HERO      — the big opening photograph + the feature/divider photographs
     • PHOTOS    — the full gallery, grouped by chapter
     • VIDEOS    — the short film memories
   Photographs are streamed from Pexels (free to use). Swap any `id` for another
   Pexels photo id, or replace the whole `src` with your own image URL.
============================================================================= */

/* ----- The couple -------------------------------------------------------- */
const SITE = {
  brideFirst: "Tharushi",
  groomFirst: "Lahiru",
  // Shown together throughout the site
  couple:    "Tharushi & Lahiru",
  monogram:  "T & L",
  // The day
  dateLong:  "the Twentieth of September, Two Thousand Twenty-Five",
  dateShort: "20 · 09 · 25",
  place:     "Villa Sola Cabiati — Lake Como, Italy",
  // A line that sets the tone (home hero)
  tagline:   "A single perfect day, kept forever.",
  // Little stats for the home page (purely sentimental)
  stats: [
    { n: 1,   label: "Perfect day" },
    { n: 214, label: "Photographs" },
    { n: 16,  label: "Film memories" },
    { n: 180, label: "Loved ones" }
  ]
};

/* ----- Image URL helpers ------------------------------------------------- */
// Build a Pexels image URL at a given width (keeps things crisp + light).
function pexImg(id, w) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}
// A responsive srcset for a Pexels id.
function pexSrcset(id) {
  return [600, 900, 1280, 1800]
    .map(w => `${pexImg(id, w)} ${w}w`)
    .join(", ");
}

/* ----- Hero + feature photographs (hand-picked, viewed & chosen) --------- */
const HERO = {
  // The opening shot: couple walking away, bride's long veil + train.
  home:  15161892,
  // Full-bleed parallax dividers used across the site.
  divider1: 34689158, // couple walking a forest road
  divider2: 16228145, // newlyweds on a golden field
  divider3: 26501992, // walking into the woods, veil lifted
  // Editorial feature columns (portrait crops look best here)
  featureTall:  16885265, // dramatic flowing veil (b&w)
  featureTall2: 19816933, // long veil by the water
  featureWide:  20678080, // newlyweds in a park
  // Per-page banners
  galleryBanner: 36723085, // elegant garden stroll
  filmBanner:    33527466, // romantic first dance under soft lights
  storyBanner:   18942333  // long veil on cobblestone
};

/* ----- The gallery ------------------------------------------------------- */
/* Grouped into chapters. Each chapter id doubles as a filter on the gallery. */
const CHAPTERS = [
  { id: "portraits",  label: "Portraits" },
  { id: "ceremony",   label: "The Ceremony" },
  { id: "romance",    label: "Just the Two" },
  { id: "celebration",label: "The Celebration" },
  { id: "getready",   label: "Getting Ready" },
  { id: "details",    label: "The Details" }
];

const PHOTO_IDS = {
  portraits: [
    15161892, 34689158, 26501992, 19816933, 16885265, 20725274, 16083015,
    19154556, 29483981, 9462061, 9116724, 34472417, 36723085, 15865412,
    15865417, 17720709, 26960751, 28450691, 16043179, 34926935, 17967331,
    17967333, 11892143, 13884984, 9439455, 13788308, 12194355, 20494863,
    13224802, 29175671, 29741196, 37762141, 17949505, 31820121, 11219297,
    28185459, 20678080
  ],
  ceremony: [
    37946427, 33197892, 32315685, 11320033, 10279235, 6304019, 33417236,
    15511100, 12584892, 7816258, 6028474, 35808593, 30138413, 37828102,
    27273677, 32947799, 33786308, 32805119, 10840316, 30840224, 32325947,
    17529921, 15815181, 10123068, 15684450, 35344327
  ],
  romance: [
    27675447, 26673709, 13023304, 10281209, 11961209, 27675448, 10281164,
    1560302, 7637292, 2253870, 26673544, 14277728, 16040517, 16228145,
    13753368, 27826734, 2959196, 713643, 3775270, 9787656, 9660962,
    7119190, 18947602, 16542586, 17542169, 28532136, 27236450, 16948624,
    34294448, 16135256, 31589019, 26972561, 30462955
  ],
  celebration: [
    14355331, 6266941, 18220883, 18220890, 8063171, 15536205, 2463421,
    6032061, 18220880, 33527466, 29560843, 29002703, 3082764, 10360902,
    33051851, 37591805, 4493692, 2074911, 34122779, 13434437, 10408275,
    32073438, 30146380, 13434413, 28588868, 15964956, 30505255, 13434436,
    15735850, 20518725, 12417635, 15530657, 29081017, 17505807
  ],
  getready: [
    35538623, 37713509, 28080168, 28919269, 37710473, 18844527, 29495741,
    34631585, 11350597, 29495750, 33661438, 37472878, 31828132, 7556730,
    36118389, 32427367, 28861509, 37713508, 35599196, 30759464, 31255021,
    34583999, 16542580, 15536159
  ],
  details: [
    15110344, 7400865, 4639630, 33412340, 6034554, 30655486, 10074702,
    4639621, 15185693, 5014591, 1564612, 12564785, 16529712, 30655483,
    4639631, 6589734, 17719650, 11474270, 4753767, 4180047, 10970554,
    36028959, 13060020, 32854445, 18086466, 17001749, 32994465, 4441792,
    13591097, 10081504, 33104578, 9644357, 5037374, 19869796
  ]
};

// Poetic captions drawn per-chapter (kept gentle + non-repetitive feeling).
const CAPTIONS = {
  portraits:  ["Together, at last", "The walk into forever", "Two as one", "Hand in hand", "Where the path led us", "A quiet glance", "The first of forever", "Side by side"],
  ceremony:   ["I do", "Vows, softly spoken", "The first look", "Down the aisle", "Promised", "Witnessed by love", "The exchange", "A sacred moment"],
  romance:    ["The kiss", "Only us", "Stolen seconds", "Closer", "Forehead to forehead", "Wrapped in the moment", "Just breathe", "Yours"],
  celebration:["The first dance", "Let the night begin", "Joy, uncontained", "Toast to forever", "Laughter & light", "Held close", "The party", "Petals & cheers"],
  getready:   ["Before the vows", "The final touches", "A moment to herself", "Lace & light", "Ready", "Quiet anticipation", "The gown", "Almost time"],
  details:    ["The rings", "In bloom", "The little things", "Something borrowed", "Set with care", "Petals", "Sworn in gold", "Every detail"]
};

// Flatten into a single ordered list the gallery + lightbox can use.
const PHOTOS = (() => {
  const out = [];
  CHAPTERS.forEach(ch => {
    (PHOTO_IDS[ch.id] || []).forEach((id, i) => {
      const caps = CAPTIONS[ch.id] || [""];
      out.push({
        id,
        chapter: ch.id,
        chapterLabel: ch.label,
        caption: caps[i % caps.length]
      });
    });
  });
  return out;
})();

/* ----- The films (short memories, ~10–25s each) -------------------------- */
/* Streamed from Pexels (free to use). `poster` is a still shown before play. */
const VIDEOS = [
  { src: "https://videos.pexels.com/video-files/34519849/14625974_1920_1080_24fps.mp4", poster: 28450691, title: "Hand in hand",        note: "A walk, just married" },
  { src: "https://videos.pexels.com/video-files/12597486/12597486-hd_1920_1080_25fps.mp4", poster: 16948624, title: "A kiss on her brow", note: "The tenderest moment" },
  { src: "https://videos.pexels.com/video-files/34519791/14625981_1920_1080_24fps.mp4", poster: 16228145, title: "Golden hour",         note: "Sunset in the park" },
  { src: "https://videos.pexels.com/video-files/34519857/14625986_1920_1080_24fps.mp4", poster: 36723085, title: "The garden",          note: "Portraits in the light" },
  { src: "https://videos.pexels.com/video-files/31010685/13255000_1920_1080_50fps.mp4", poster: 37946427, title: "Out of the church",   note: "Showered in cheers" },
  { src: "https://videos.pexels.com/video-files/10888027/10888027-hd_1920_1080_25fps.mp4", poster: 33412340, title: "Two hands, two rings", note: "Sworn in gold" },
  { src: "https://videos.pexels.com/video-files/5590282/5590282-hd_1920_1080_25fps.mp4", poster: 13434437, title: "With everyone we love", note: "Surrounded by joy" },
  { src: "https://videos.pexels.com/video-files/28952503/12526933_2160_3840_30fps.mp4", poster: 26972561, title: "Held close",          note: "An outdoor embrace" },
  { src: "https://videos.pexels.com/video-files/34506426/14620221_3840_2160_30fps.mp4", poster: 29175671, title: "The first look",       note: "Under the archway" },
  { src: "https://videos.pexels.com/video-files/8775889/8775889-uhd_3840_2160_25fps.mp4", poster: 33197892, title: "The vows",          note: "Man & wife" },
  { src: "https://videos.pexels.com/video-files/34400965/14574047_3840_2160_25fps.mp4", poster: 35344327, title: "The ceremony",        note: "Seated, side by side" },
  { src: "https://videos.pexels.com/video-files/34448979/14597240_3840_2160_25fps.mp4", poster: 32315685, title: "In the chapel",       note: "A church wedding" },
  { src: "https://videos.pexels.com/video-files/31574045/13455883_3840_2160_60fps.mp4", poster: 17542169, title: "Up close",            note: "An elegant moment" },
  { src: "https://videos.pexels.com/video-files/34502718/14618807_3840_2160_25fps.mp4", poster: 35538623, title: "Getting ready",       note: "Before the drive" },
  { src: "https://videos.pexels.com/video-files/8776115/8776115-uhd_3840_2160_25fps.mp4", poster: 12584892, title: "At the altar",       note: "Kneeling together" },
  { src: "https://videos.pexels.com/video-files/8776119/8776119-uhd_3840_2160_25fps.mp4", poster: 6028474,  title: "One book, one vow", note: "Holding the promise" }
];

/* ----- The story (timeline on story.html) -------------------------------- */
const STORY = [
  { year: "2019", title: "A chance hello",    text: "A spilled coffee, a borrowed napkin, and a conversation that didn't end until the café closed. Neither of us remembers what we ordered — only that we never wanted to leave.", photo: 18677426 },
  { year: "2021", title: "Falling, slowly",   text: "Two cities, a hundred train rides, and a thousand goodnight calls. Distance only ever made the next hello sweeter.", photo: 17487422 },
  { year: "2023", title: "The question",      text: "On the cliffs at sunset, with the sea below and the whole sky on fire, the question finally found its words. The answer was yes before he finished asking.", photo: 16043179 },
  { year: "2025", title: "The day we became us", text: "Beneath the cypress trees at Lake Como, surrounded by everyone we love, we promised each other forever — and meant every word.", photo: 15161892 }
];
