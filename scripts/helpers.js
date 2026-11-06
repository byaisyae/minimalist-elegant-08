/* Variabel & fungsi bantu (format tanggal, escape HTML, builder section/profil). */
const B = C.bride,
  G = C.groom,
  d0 = new Date(C.date),
  $ = (s) => document.querySelector(s);
const fmt = d0.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const esc = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
const ov = () =>
  `background-image:linear-gradient(180deg,rgba(226,241,251,0) 60%,rgba(226,241,251,.96) 100%),url(${C.bg.cover})`;
// Slider foto hero: urutan [A,C,B,A] dan jalur bergeser ke kanan, jadi putaran A→B→C→A mulus tanpa lompatan.
const heroSlider = () => {
  const ph = (C.hero && C.hero.length ? C.hero : [C.bg.cover]).filter(Boolean);
  const seq = ph.length > 1 ? [ph[0], ...ph.slice(1).reverse(), ph[0]] : ph;
  return `<div class="absolute inset-0 z-0 overflow-hidden bg-cream-300"><div id="heroTrack" class="flex h-full" style="width:${seq.length * 100}%">${seq.map((s) => `<img src="${s}" alt="" draggable="false" onerror="this.remove()" class="h-full flex-none object-cover" style="width:${100 / seq.length}%">`).join("")}</div></div><div class="absolute inset-0 z-[1] pointer-events-none" style="background-image:linear-gradient(0deg,rgba(15,47,69,.85) 0%,rgba(20,95,150,.45) 35%,rgba(20,95,150,.05) 72%)"></div>`;
};
const bgs = (url, o = "rgba(226,241,251,.94)") =>
  `background-image:linear-gradient(${o},${o}),url(${url})`;
const sec = (id, h, sub, body, st = "", cls = "") =>
  `<section id="${id}" class="relative py-20 sm:py-28 px-5 sm:px-6 bg ${st ? "fx" : ""} ${cls}" style="${st}"><div class="max-w-5xl mx-auto text-center"><h2 class="rv font-head italic font-semibold text-5xl sm:text-6xl text-ink-900">${h}</h2>${sub ? `<p class="rv mt-4 text-sm sm:text-base text-ink-500/90 max-w-2xl mx-auto leading-relaxed" style="--d:.1s">${sub}</p>` : ""}<div class="mt-12">${body}</div></div></section>`;
const btn = (h, t) =>
  `<a href="${h}" target="_blank" rel="noopener" class="inline-block px-5 py-2 rounded-full border border-ac/40 text-ink-700 text-sm hover:bg-ac hover:text-white transition">${t}</a>`;
// Kartu mempelai (selebar layar, tanpa sudut membulat): foto penuh sebagai latar + kartu kaca berisi nama, orang tua, dan Instagram.
// 2 foto (photos) = carousel otomatis; side "l" = foto bergeser ke kanan & teks rata kiri, side "r" = bergeser ke kiri & teks rata kanan.
const igIcon =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
// Carousel otomatis 2 foto. dir: "r" = bergeser ke kanan, "l" = ke kiri, "d" = ke bawah, "u" = ke atas. 1 foto = diam.
// Efek AOS (animate on scroll) untuk foto: dipakai bergantian fade-up, fade-down, zoom-in, zoom-out sesuai urutan foto di halaman.
// Video prewedding YouTube di atas foto galeri. C.video boleh berupa link/ID YouTube (string) atau objek { url | id, title }.
const videoEmbed = () => {
  const V = typeof C.video === "string" ? { url: C.video } : C.video || {};
  const raw = String(V.id || V.url || "").trim();
  const m = raw.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|live\/|watch\?(?:.*&)?v=))([\w-]{11})/) || raw.match(/^([\w-]{11})$/);
  if (!m) return "";
  return `<div class="rv -mx-5 sm:-mx-6 mb-2 aspect-video bg-black overflow-hidden"><iframe class="w-full h-full" src="https://www.youtube.com/embed/${m[1]}?rel=0" title="${V.title || "Video Prewedding"}" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
};
const AOS_FX = ["fade-up", "fade-down", "zoom-in", "zoom-out"];
let aosN = 0;
const aosAttr = () => `data-aos="${AOS_FX[aosN++ % AOS_FX.length]}" data-aos-duration="1000"`;
const carousel = (photos, alt, dir = "r") => {
  const ph = (Array.isArray(photos) ? photos : [photos]).filter(Boolean);
  const im = (src, cls = "") =>
    `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()" class="${cls}">`;
  const cls = { r: "pc-r", l: "pc-l", d: "pc-v pc-d", u: "pc-v pc-u" }[dir] || "pc-r";
  return ph.length > 1
    ? `<div class="pc-track ${cls}">${im(ph[0])}${im(ph[1])}${im(ph[0])}</div>`
    : ph.length
      ? im(ph[0], "w-full h-full object-cover")
      : "";
};
// Kartu mempelai: foto berbentuk lengkung (arch) dengan bayangan menyamping, lalu nama miring, orang tua, dan tombol Instagram (rata tengah).
// Foto 2 = carousel otomatis (wanita bergeser ke kanan, pria ke kiri).
const prof = (p, a, side = "l") => {
  // Label vertikal di samping foto: The Bride di kanan foto (baca atas→bawah), The Groom di kiri foto (baca bawah→atas)
  const lbl = `<div class="absolute top-0 bottom-0 flex items-center ${side === "l" ? "left-full ml-2 sm:ml-3" : "right-full mr-2 sm:mr-3"}"><span class="font-sans font-light text-3xl sm:text-4xl text-ink-500 whitespace-nowrap select-none" style="writing-mode:vertical-rl;${side === "l" ? "" : "transform:rotate(180deg)"}">${side === "l" ? "The Bride" : "The Groom"}</span></div>`;
  const media = carousel(p.photos && p.photos.length ? p.photos : [p.photo], p.nick, side === "l" ? "r" : "l");
  return `<div class="${a} relative flex flex-col items-center text-center px-5 py-14"><div class="relative w-[70%] max-w-[300px]"><div ${aosAttr()} class="pc ph relative w-full aspect-[4/5] overflow-hidden rounded-2xl clay-img">${media}</div>${lbl}</div><h4 class="mt-9 font-head italic font-semibold text-2xl sm:text-3xl tracking-wide text-ink-900">${p.full}</h4><p class="mt-5 text-sm sm:text-base leading-relaxed text-ink-900">${p.role} Bapak ${p.father}<br>&amp; Ibu ${p.mother}</p><a href="https://instagram.com/${p.ig}" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl gbtn text-sm font-semibold transition">${igIcon}@${p.ig}</a></div>`;
};
// Kartu acara (Akad/Resepsi): foto carousel di atas, lalu info + judul vertikal. Acara ganjil (akad) judul di kanan, acara genap (resepsi) judul di kiri.
const evCard = (e, i) => {
  const day = new Date(e.date || C.date)
    .toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    .toUpperCase();
  const media = carousel(e.photos || (e.photo ? [e.photo] : []), e.t, i % 2 ? "l" : "r");
  return `<div class="${i % 2 ? "rr" : "rl"} text-left glass text-ink-900 ${i % 2 ? "rounded-bl-[2rem]" : "rounded-br-[2rem]"} rounded-t-[2rem] overflow-hidden">${media ? `<div ${aosAttr()} class="pc ph relative aspect-[3/2] w-full overflow-hidden">${media}</div>` : ""}<div class="flex ${i % 2 ? "flex-row-reverse" : ""}"><div class="flex-1 min-w-0 p-5 sm:p-7"><p class="font-bold tracking-wide text-base sm:text-lg leading-snug">${day}${e.time ? `<br>${e.time}` : ""}</p><p class="mt-4 text-sm sm:text-base font-medium">${e.place}</p><p class="text-sm mt-1 leading-relaxed">${e.addr}</p><a href="${e.map}" target="_blank" rel="noopener" class="mt-5 inline-block px-5 py-2.5 rounded-2xl gbtn text-sm font-medium transition">Buka Maps</a></div><div class="w-16 sm:w-20 flex-none flex items-center justify-center bg-ac/15 border-ac/20 ${i % 2 ? "border-r rounded-bl-[2rem]" : "border-l rounded-br-[2rem]"}"><span class="font-head italic font-semibold text-3xl sm:text-4xl text-ac-dark whitespace-nowrap" style="writing-mode:vertical-rl;${i % 2 ? "transform:rotate(180deg)" : ""}">${e.t}</span></div></div></div>`;
};
// Acara gabungan dalam SATU kartu: foto carousel (Akad & Resepsi) di atas, judul vertikal "Wedding Event" di kiri, lalu Akad, Resepsi, dan YouTube Streaming di kanan.
const eventCard = () => {
  const ev = C.events || [];
  const dFmt = (d) =>
    new Date(d || C.date)
      .toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      .toUpperCase();
  const ph = ev.map((e) => (e.photos && e.photos[0]) || e.photo).filter(Boolean).slice(0, 2);
  const m = carousel(ph.length ? ph : C.gallery.slice(0, 2), "Wedding Event", "d");
  const blocks = ev.map(
    (e) =>
      `<div><p class="text-[10px] sm:text-xs tracking-wide uppercase text-ink-500">${e.t}</p><p class="mt-3 text-xs sm:text-sm font-bold leading-snug text-ink-900">${dFmt(e.date)}${e.time ? `<br>${e.time}` : ""}</p><p class="mt-3 text-xs sm:text-sm font-semibold text-ink-900">${e.place}</p><p class="mt-1 text-[11px] sm:text-xs leading-relaxed text-ink-700">${e.addr}</p><a href="${e.map}" target="_blank" rel="noopener" class="mt-4 inline-block px-4 py-2 rounded-xl gbtn text-[11px] sm:text-xs font-medium transition">Buka Maps</a></div>`,
  );
  const L = typeof C.live === "string" ? { url: C.live } : C.live || {};
  if (L.url) {
    const platform = (L.platform || "").trim();
    const desc =
      L.desc ||
      `Bagi tamu undangan yang berhalangan hadir tetapi ingin menyaksikan acara pernikahan kami silakan akses live streaming melalui link di bawah :`;
    blocks.push(
      `<div><p class="text-xs sm:text-sm font-bold uppercase tracking-wide text-ink-900">${platform || "Live"} Streaming</p><p class="mt-3 text-xs sm:text-sm leading-relaxed text-ink-900">${desc}</p><a href="${L.url}" target="_blank" rel="noopener" class="mt-4 inline-block px-4 py-2 rounded-xl gbtn text-[11px] sm:text-xs font-medium transition">Live Streaming</a></div>`,
    );
  }
  const photo = m ? `<div ${aosAttr()} class="pc ph relative aspect-[3/2] w-full overflow-hidden rounded-2xl">${m}</div>` : "";
  return `<div class="rv text-left glass text-ink-900 rounded-[2rem] max-w-md sm:max-w-xl mx-auto p-3 sm:p-4"><div class="clay-img rounded-2xl">${photo}</div><div class="flex mt-1"><div class="w-14 sm:w-20 flex-none flex items-center justify-center"><span class="font-head italic font-semibold text-2xl sm:text-4xl text-ac-dark whitespace-nowrap" style="writing-mode:vertical-rl;transform:rotate(180deg)">Wedding Event</span></div><div class="flex-1 min-w-0 px-4 sm:px-6 py-5 sm:py-7 border-l border-ac/20 divide-y divide-ac/20 [&>div]:py-5 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0">${blocks.join("")}</div></div></div>`;
};
// Live Streaming sudah digabung ke dalam eventCard() (bagian terpisah dinonaktifkan).
const liveCard = () => "";
// Kartu cerita (Our Story): foto carousel bergeser ke bawah di atas, daftar momen di kiri, judul "Love Story" vertikal di kanan.
const storyCard = () => {
  const sp = (C.storyPhotos && C.storyPhotos.length ? C.storyPhotos : C.story.map((s) => s.i))
    .filter(Boolean)
    .slice(0, 2);
  const media = carousel(sp, "Love Story", "d");
  return `<div class="rv text-left glass-clear text-ink-900 rounded-t-[2rem] rounded-br-[2rem] overflow-hidden max-w-3xl mx-auto">${media ? `<div ${aosAttr()} class="pc ph relative aspect-[3/2] w-full overflow-hidden">${media}</div>` : ""}<div class="flex"><div class="flex-1 min-w-0 p-5 sm:p-7 space-y-6">${C.story.map((s) => `<div><h3 class="font-serif italic text-xl sm:text-2xl">${s.t}</h3><p class="mt-2 text-sm font-medium">${s.d}</p><p class="mt-1 text-sm leading-relaxed">${s.p}</p></div>`).join("")}</div><div class="w-16 sm:w-20 flex-none flex items-center justify-center bg-ac/15 border-l border-ac/20 rounded-br-[2rem]"><span class="font-head italic font-semibold text-3xl sm:text-4xl text-ac-dark whitespace-nowrap" style="writing-mode:vertical-rl">Love Story</span></div></div></div>`;
};
