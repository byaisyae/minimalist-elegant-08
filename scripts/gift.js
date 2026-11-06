/* Wedding Gift: rekening & alamat hadiah disembunyikan, tampil saat tombol "Klik di sini" ditekan (tekan lagi = sembunyikan). */
(() => {
  const btn = $("#giftToggle"),
    panel = $("#giftPanel");
  if (!btn || !panel) return;
  const label = $("#giftLabel");
  btn.addEventListener("click", () => {
    const open = !panel.classList.contains("open");
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    btn.setAttribute("aria-expanded", String(open));
    btn.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Sembunyikan" : "Klik di sini";
    // elemen di dalam panel baru terlihat setelah dibuka, jadi tampilkan langsung (tanpa menunggu scroll)
    if (open) panel.querySelectorAll(".rl,.rr,.rv,.rz").forEach((el) => el.classList.add("in"));
  });
})();
