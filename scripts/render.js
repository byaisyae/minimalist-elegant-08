/* Menyusun seluruh halaman undangan ke #app. */
$("#app").innerHTML =
  `<header id="home" class="relative min-h-screen flex flex-col justify-end text-center px-5 pb-[8vh] overflow-hidden"><div data-p=".25" class="relative z-10">
<p class="rv font-sans tracking-[.3em] text-[11px] sm:text-xs text-white [text-shadow:0_2px_14px_rgba(0,0,0,.6)]">THE WEDDING OF</p>
<h1 class="rz font-script font-normal text-6xl sm:text-8xl lg:text-6xl text-white mt-4 mb-8 leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,.6)]" style="--d:.15s">${B.nick} &amp; ${G.nick}</h1>
<p class="rv font-serif tracking-[.3em] text-lg text-white -mt-4 mb-6 [text-shadow:0_2px_14px_rgba(0,0,0,.6)]" style="--d:.3s">${d0.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", ".")}</p>
<div id="cd" class="rv mt-2 flex justify-center gap-2.5 sm:gap-3.5" style="--d:.45s"></div></div>${heroSlider()}</header>` +
  sec(
    "mempelai",
    C.text.greeting,
    C.text.intro,
    `<div class="flex flex-col -mx-5 sm:-mx-6">${prof(B, "rl", "l")}<p class="rv relative z-10 -my-4 text-center font-head italic font-semibold text-4xl sm:text-5xl text-ink-900">and</p>${prof(G, "rr", "r")}</div>`,
  ) +
  `<section class="relative py-24 px-6 bg fx" style="${bgs(C.bg.quote)}"><div data-p=".12" class="rz max-w-2xl mx-auto text-center"><p class="font-serif italic text-lg sm:text-2xl leading-relaxed text-ink-900">"${C.text.quote}"</p><p class="mt-5 tracking-widest text-xs text-ink-500">${C.text.quoteSource}</p></div></section>` +
  sec(
    "acara",
    "Save The Date",
    `<b class="text-ink-900 font-semibold tracking-wide">${fmt.toUpperCase()}</b>`,
    eventCard(),
    bgs(C.bg.cover, "rgba(211,233,248,.9)"),
  ) +
  (liveCard()
    ? `<section id="live" class="relative pb-16 sm:pb-24 px-5 sm:px-6"><div class="max-w-5xl mx-auto">${liveCard()}</div></section>`
    : "") +
  sec(
    "galeri",
    "Our Gallery",
    "",
    `${videoEmbed()}<div class="grid grid-cols-2 gap-3 sm:gap-4 mt-8">${C.gallery
      .map(
        (g, i) =>
          `<div ${aosAttr()} class="gal-item ph relative overflow-hidden rounded-2xl cursor-zoom-in clay-img ${i % 5 === 0 ? "col-span-2 aspect-[3/2]" : "aspect-[3/4]"}"><img src="${g}" alt="Galeri ${i + 1}" loading="lazy" decoding="async" draggable="false" onerror="this.remove()" class="gl w-full h-full object-cover"></div>`,
      )
      .join("")}</div>`,
    bgs(C.bg.date, "rgba(226,241,251,.94)"),
  ) +
  (C.story && C.story.length
    ? sec(
    "cerita",
    "Our Story",
    "",
    storyCard(),
    bgs(C.bg.foot, "rgba(211,233,248,.9)"),
  )
    : "") +
  `<section id="rsvp" class="relative pb-24 bg-cream-100"><div class="max-w-5xl mx-auto px-5 sm:px-6 pt-8"><div ${aosAttr()} class="pc ph relative aspect-[4/3] w-full overflow-hidden rounded-tl-[4rem] rounded-br-[4rem]">${carousel(C.rsvpPhotos && C.rsvpPhotos.length ? C.rsvpPhotos : C.gallery.slice(0, 2), "RSVP", "d")}</div><h2 class="rv mt-10 font-head italic font-semibold text-5xl sm:text-6xl text-ink-900 text-left">RSVP &amp; Ucapan Doa</h2><p class="rv mt-3 text-sm sm:text-base text-ink-900 text-left leading-relaxed" style="--d:.1s">Konfirmasi kehadiran dan sampaikan doa restu untuk kedua mempelai.</p><div class="mt-8"><form id="f" class="rz text-left max-w-md mx-auto space-y-3">
 <input name="web" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden">
 <input name="n" required minlength="2" placeholder="Nama" class="w-full px-4 py-3 rounded-xl neu-in text-ink-900 outline-none">
 <div class="grid grid-cols-2 gap-3"><select name="k" class="px-4 py-3 rounded-xl neu-in text-ink-900"><option>Hadir</option><option>Tidak hadir</option><option>Masih ragu</option></select>
 <select name="j" class="px-4 py-3 rounded-xl neu-in text-ink-900 disabled:opacity-40 disabled:cursor-not-allowed"><option>1 orang</option><option>2 orang</option><option>3 orang</option><option>4 orang</option></select></div>
 <textarea name="m" required rows="3" placeholder="Ucapan &amp; doa restu" class="w-full px-4 py-3 rounded-xl neu-in text-ink-900 outline-none"></textarea>
 <button class="w-full py-3 rounded-xl gbtn font-semibold transition">Kirim</button></form>
 <div id="cnt" class="mt-10 flex justify-center gap-6 text-sm text-ink-700 [&_b]:!text-ink-900"></div><div id="wl" class="mt-6 max-w-xl mx-auto space-y-3 text-left"></div><nav id="pgn" aria-label="Halaman ucapan" class="mt-5 flex flex-wrap justify-center items-center gap-1.5 text-sm text-ink-700 [&_button]:!border-ac/40 [&_button]:!text-ink-700 [&_button:disabled]:!opacity-40 [&_button[aria-current=page]]:!bg-ac [&_button[aria-current=page]]:!text-ink-900 [&_button[aria-current=page]]:!border-ac"></nav></div></div></section>` +
  ((C.gifts && C.gifts.length) || (C.giftAddress && C.giftAddress.addr)
    ? sec(
    "hadiah",
    "Wedding Gift",
    "Tanpa mengurangi rasa hormat, bagi tamu yang ingin mengirimkan hadiah kepada kedua mempelai dapat melalui:",
    `<div class="rv"><button id="giftToggle" type="button" aria-expanded="false" aria-controls="giftPanel" class="inline-flex items-center gap-2.5 px-7 py-3 rounded-full gbtn text-sm font-medium transition"><svg class="gift-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg><span id="giftLabel">Klik di sini</span></button></div><div id="giftPanel" class="gift-panel" aria-hidden="true"><div class="gift-inner"><div class="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">${(C.gifts || []).map((g, i) => `<div class="rl bank-card relative overflow-hidden glass rounded-[26px] p-5 md:p-6 text-left min-h-[210px] flex flex-col justify-between"><div class="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-white/50 to-transparent rotate-45 rounded-3xl pointer-events-none"></div><div class="absolute right-0 bottom-0 w-28 h-28 pointer-events-none" style="background-image:radial-gradient(rgba(25,130,190,.35) 1px,transparent 1px);background-size:7px 7px;-webkit-mask-image:linear-gradient(to top left,black 20%,transparent 70%);mask-image:linear-gradient(to top left,black 20%,transparent 70%)"></div><div class="relative z-10 flex items-start justify-between"><svg width="46" height="36" viewBox="0 0 48 38" fill="none" aria-hidden="true"><defs><linearGradient id="chip${i}" x1="0" y1="0" x2="48" y2="38" gradientUnits="userSpaceOnUse"><stop stop-color="#f5f5f3"/><stop offset=".5" stop-color="#c6c6c2"/><stop offset="1" stop-color="#8d8d89"/></linearGradient></defs><rect x="1" y="1" width="46" height="36" rx="8" fill="url(#chip${i})" stroke="#77777a"/><line x1="16" y1="1" x2="16" y2="37" stroke="#77777a"/><line x1="32" y1="1" x2="32" y2="37" stroke="#77777a"/><line x1="1" y1="12" x2="47" y2="12" stroke="#77777a"/><line x1="1" y1="25" x2="47" y2="25" stroke="#77777a"/><path d="M16 12Q24 19 32 12" stroke="#77777a" fill="none"/><path d="M16 25Q24 18 32 25" stroke="#77777a" fill="none"/></svg><img src="img/bca.svg" alt="${g.bank}" class="w-16 h-16 object-contain bg-white rounded-xl p-2"></div><div class="relative z-10 flex items-end justify-between gap-3 mt-8"><div class="min-w-0"><p class="font-bold text-ink-900 text-sm md:text-base mb-1 truncate">${g.name.toUpperCase()}</p><p class="font-extrabold text-ink-900 text-lg md:text-2xl tracking-wide font-mono">${g.no}</p></div><button data-copy="${g.no}" class="cp flex-shrink-0 inline-flex items-center gap-1.5 gbtn text-xs md:text-sm font-semibold px-3.5 py-2.5 rounded-xl transition-all" aria-label="Salin nomor ${g.bank} ${g.name}"><svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z"/></svg>Copy</button></div></div>`).join("")}
 ${C.giftAddress && C.giftAddress.addr ? `<div class="sm:col-span-2 lg:col-span-1 w-full max-w-xl mx-auto space-y-4"><div class="rr glass rounded-3xl p-7"><p class="font-serif text-xl text-ink-900">Alamat Pengiriman Hadiah</p><p class="text-sm my-3 leading-relaxed"><b class="text-ink-900">${C.giftAddress.name}</b><br>${C.giftAddress.addr}</p><button data-copy="${C.giftAddress.name}, ${C.giftAddress.addr}" class="cp px-5 py-2 rounded-full gbtn text-sm font-medium">Salin</button></div><div class="rr text-center"><a id="giftWa" href="https://wa.me/${B.wa}" target="_blank" rel="noopener" class="inline-block px-6 py-2.5 rounded-full gbtn text-sm font-medium">Konfirmasi Pengiriman Hadiah via WhatsApp</a></div></div>` : ""}</div></div></div>`,
    bgs(C.bg.quote, "rgba(226,241,251,.94)"),
  )
    : "") +
  `<footer id="foot" class="relative overflow-hidden pt-28 pb-40 px-6 text-center text-white"><div class="pc absolute inset-0 z-0 overflow-hidden bg-cream-300">${carousel(C.footPhotos && C.footPhotos.length ? C.footPhotos : [C.bg.foot, C.bg.quote], "", "r")}</div><div class="absolute inset-0 z-[1] pointer-events-none" style="background-image:linear-gradient(180deg,rgba(15,47,69,.55) 0%,rgba(15,47,69,.75) 55%,rgba(15,47,69,.9) 100%)"></div><div class="relative z-[2]"><div class="rz max-w-xl mx-auto"><p class="text-sm text-white/90">Kami yang berbahagia,</p><h2 class="font-head italic font-semibold text-5xl sm:text-6xl lg:text-5xl text-white my-4">${B.nick} &amp; ${G.nick}</h2><p class="text-sm leading-relaxed text-white/90">${C.text.closing}</p></div><div class="relative mt-16 px-6 text-xs tracking-wide text-white/80 space-y-1.5"><p>${C.site.copyright}</p><p class="italic">Designed with love by : <a href="${C.site.designer.url}" target="_blank" rel="noopener" class="hover:underline">${C.site.designer.name}</a></p><p class="italic">Our Instagram : <a href="${C.site.instagram.url}" target="_blank" rel="noopener" class="hover:underline">${C.site.instagram.handle}</a></p><div class="flex justify-center gap-3 pt-3"><a href="${C.site.designer.url}" target="_blank" rel="noopener" aria-label="Website saevitation" class="w-10 h-10 rounded-full gbtn inline-flex items-center justify-center hover:bg-white/15 transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg></a><a href="${C.site.instagram.url}" target="_blank" rel="noopener" aria-label="Instagram saevitation" class="w-10 h-10 rounded-full gbtn inline-flex items-center justify-center hover:bg-white/15 transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a></div></div></div></footer><div class="h-20"></div>`;
