/* Slider galeri: loop tanpa batas, geser sentuh/mouse, otomatis berganti (dengan jeda), thumbnail ikut aktif. */
(() => {
  const AUTO = 5000; // jeda antar slide otomatis (ms)
  const RESUME = 7000; // jeda sebelum otomatis lanjut setelah slider disentuh (ms)
  const view = $("#galMain"),
    track = $("#galTrack"),
    th = $("#galThumbs");
  if (!view || !track || !th) return;
  const slides = [...track.children],
    thumbs = [...th.children],
    n = slides.length;
  if (n < 2) return; // 1 foto: tampil biasa tanpa slider

  // klon ujung supaya perpindahan terakhir -> pertama (dan sebaliknya) mulus
  const clone = (s) => {
    const c = s.cloneNode(true);
    c.querySelector("img").classList.remove("gl");
    c.setAttribute("aria-hidden", "true");
    return c;
  };
  track.prepend(clone(slides[n - 1]));
  track.append(clone(slides[0]));

  let i = 1, // posisi di track (1..n = foto asli, 0 dan n+1 = klon)
    drag = null,
    moved = false,
    hover = false,
    visible = true,
    timer,
    resume,
    fb;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const real = () => (i - 1 + n) % n;
  const at = (x = 0) =>
    (track.style.transform = `translateX(calc(${-i * 100}% + ${x}px))`);
  const jump = () => {
    track.classList.add("drag");
    at();
    track.offsetWidth; // paksa reflow agar lompatan tanpa animasi
    track.classList.remove("drag");
  };
  const fix = () => {
    clearTimeout(fb);
    if (i > n) i = 1;
    else if (i < 1) i = n;
    else return;
    jump();
  };
  let cur = -1;
  const setThumb = () => {
    const r = real();
    if (r === cur) return;
    cur = r;
    thumbs.forEach((t, k) => {
      t.classList.toggle("is-on", k === r);
      t.setAttribute("aria-current", k === r ? "true" : "false");
    });
    const t = thumbs[r];
    th.scrollTo({
      left: t.offsetLeft - (th.clientWidth - t.offsetWidth) / 2,
      behavior: "smooth",
    });
  };
  const go = (to) => {
    i = to;
    track.classList.remove("drag");
    at();
    setThumb();
    clearTimeout(fb);
    fb = setTimeout(fix, 900); // cadangan bila transitionend tidak terpanggil
  };
  const step = (d) => {
    if (i > n || i < 1) fix();
    go(i + d);
  };
  track.addEventListener("transitionend", (e) => {
    if (e.target === track) fix();
  });

  // slide otomatis dengan jeda
  const schedule = () => {
    clearTimeout(timer);
    if (reduce) return;
    timer = setTimeout(() => {
      const lbIsOpen = !$("#lb").classList.contains("hidden");
      if (visible && !hover && !drag && !lbIsOpen && !document.hidden) step(1);
      schedule();
    }, AUTO);
  };
  const pause = () => {
    clearTimeout(timer);
    clearTimeout(resume);
    resume = setTimeout(schedule, RESUME);
  };
  new IntersectionObserver(([en]) => (visible = en.isIntersecting), {
    threshold: 0.25,
  }).observe(view);
  view.addEventListener("mouseenter", () => (hover = true));
  view.addEventListener("mouseleave", () => (hover = false));

  // geser dengan sentuhan / mouse
  view.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (i > n || i < 1) fix();
    drag = { x: e.clientX, dx: 0 };
    moved = false;
    pause();
    track.classList.add("drag");
  });
  view.addEventListener("pointermove", (e) => {
    if (!drag) return;
    drag.dx = e.clientX - drag.x;
    if (Math.abs(drag.dx) > 6) moved = true;
    at(drag.dx);
  });
  const end = () => {
    if (!drag) return;
    const dx = drag.dx;
    drag = null;
    track.classList.remove("drag");
    if (dx < -view.clientWidth * 0.15) step(1);
    else if (dx > view.clientWidth * 0.15) step(-1);
    else go(i);
    setTimeout(() => (moved = false), 0);
  };
  view.addEventListener("pointerup", end);
  view.addEventListener("pointercancel", end);
  view.addEventListener("pointerleave", end);

  // klik: setelah menggeser jangan buka lightbox; klik pada klon membuka foto aslinya
  view.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      const s = e.target.closest(".gal-slide");
      if (s === track.firstElementChild) (e.stopPropagation(), lbOpen(n - 1));
      else if (s === track.lastElementChild) (e.stopPropagation(), lbOpen(0));
    },
    true,
  );

  thumbs.forEach((t, k) =>
    t.addEventListener("click", () => {
      pause();
      if (i > n || i < 1) fix();
      go(k + 1);
    }),
  );

  jump(); // mulai di foto pertama (posisi 1)
  setThumb();
  schedule();
})();
