/* Cover, nama tamu, navigasi samping, musik, dan hitung mundur. */
/* cover, tamu, navigasi */
history.scrollRestoration = "manual";
scrollTo(0, 0);
$("#cvbg").style.backgroundImage = `url(${C.bg.cover})`;
document.title = C.site.title;
document.querySelectorAll("[data-names]").forEach((el) => (el.textContent = `${B.nick} & ${G.nick}`));
const dmy = d0.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", ".");
$("#cvDate").textContent = dmy;
$("#sideDate").textContent = d0.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
const sl = [...document.querySelectorAll(".sl")];
sl.forEach(
  (el) => (el.style.backgroundImage = `url(${C.bg[el.dataset.k]})`),
);
const SK = {
  home: "cover",
  mempelai: "cover",
  acara: "date",
  live: "date",
  galeri: "quote",
  cerita: "quote",
  rsvp: "foot",
  hadiah: "foot",
};
const so = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting) {
        const k = SK[x.target.id];
        sl.forEach(
          (el) => (el.style.opacity = el.dataset.k === k ? 1 : 0),
        );
      }
    }),
  { rootMargin: "-50% 0px -50% 0px" },
);
Object.keys(SK).forEach((i) => {
  const el = document.getElementById(i);
  if (el) so.observe(el);
});
$("#guest").textContent =
  new URLSearchParams(location.search).get("to") || "Tamu Undangan";
const ic = (d) =>
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const NAV = [
  ["home", "Home", ic('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>')],
  ["mempelai", "Mempelai", ic('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>')],
  ["acara", "Acara", ic('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>')],
  ["galeri", "Galeri", ic('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-9 9"/>')],
  ["cerita", "Cerita", ic('<path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z"/><path d="M12 6v14"/>')],
  ["rsvp", "RSVP", ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>')],
  ["hadiah", "Hadiah", ic('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8S10.5 3.5 8 4.5 8 8 12 8zm0 0s1.5-4.5 4-3.5S16 8 12 8z"/>')],
].filter(([i]) => document.getElementById(i));
$("#nav").innerHTML = NAV.map(
  ([i, t, svg]) =>
    `<a href="#${i}" data-nv="${i}" class="nv flex-1 min-w-0 flex flex-col items-center gap-1 py-1.5 rounded-xl text-ink-500 transition-colors">${svg}<span class="text-[10px] leading-none tracking-wide">${t}</span></a>`,
).join("");
const nvs = [...document.querySelectorAll(".nv")];
const nvo = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting)
        nvs.forEach((n) => n.classList.toggle("on", n.dataset.nv === x.target.id));
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
NAV.forEach(([i]) => nvo.observe(document.getElementById(i)));
nvs[0] && nvs[0].classList.add("on");
const a = $("#bgm");
a.src = C.music;
const mus = (on) => {
  $("#mb").innerHTML = on
    ? '<span style="display:inline-block;animation:spin 6s linear infinite">♫</span>'
    : '<span class="opacity-60 line-through">♫</span>';
};
$("#mb").onclick = () =>
  a.paused ? a.play().then(() => mus(1)) : (a.pause(), mus(0));
// Navbar bawah baru muncul setelah foto hero (slide) tergulir lewat.
const navCheck = () => {
  const hh = $("#home").offsetHeight;
  $("#nav").classList.toggle("show", scrollY > hh - innerHeight * 0.5);
};
const startHero = () => {
  const ht = $("#heroTrack");
  if (!ht || ht.children.length < 3 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const n = ht.children.length - 1;
  let i = n;
  const go = (anim) => {
    ht.style.transition = anim ? "transform 1.1s cubic-bezier(.65,0,.35,1)" : "none";
    ht.style.transform = `translateX(${(-i * 100) / (n + 1)}%)`;
  };
  go(false);
  setInterval(() => {
    if (document.hidden) return;
    i--;
    go(true);
    if (i === 0)
      setTimeout(() => {
        i = n;
        go(false);
      }, 1150);
  }, 4500);
};
$("#openBtn").onclick = () => {
  startHero();
  const c = $("#cover");
  document.body.classList.remove("lock");
  c.classList.add("up");
  scrollTo({ top: 0, behavior: "instant" });
  $("#pg").classList.remove("hidden");
  onS();
  $("#mb").classList.remove("hidden");
  a.play()
    .then(() => mus(1))
    .catch(() => mus(0));
  $("#nav").classList.remove("hidden");
  navCheck();
  addEventListener("scroll", navCheck, { passive: true });
  setTimeout(() => c.remove(), 1000);
};

/* countdown */
const tick = () => {
  const s = Math.max(0, ((d0 - Date.now()) / 1000) | 0),
    v = [
      ["Days", s / 86400],
      ["Hours", (s % 86400) / 3600],
      ["Minutes", (s % 3600) / 60],
      ["Seconds", s % 60],
    ];
  $("#cd").innerHTML = v
    .map(
      ([l, n]) =>
        `<div class="w-[4.6rem] sm:w-[5.3rem] py-3 rounded-2xl glass text-ink-900 text-center"><div class="font-serif text-lg leading-tight">${String(n | 0).padStart(l === "Days" ? 1 : 2, "0")}</div><div class="text-[10px] leading-tight">${l}</div></div>`,
    )
    .join("");
};
tick();
setInterval(tick, 1000);

// tautan konfirmasi hadiah ke WhatsApp mempelai wanita (nama tamu dari ?to=)
const giftWa = $("#giftWa");
if (giftWa)
  giftWa.href = `https://wa.me/${B.wa}?text=${encodeURIComponent(
    `Assalamu'alaikum, saya ${$("#guest").textContent} ingin mengonfirmasi pengiriman hadiah untuk pernikahan ${B.nick} & ${G.nick}. Terima kasih.`,
  )}`;
