/* Data undangan (nama, tanggal, acara, rekening, galeri, cerita) — edit di file ini. */
/* ============ DATA — edit di sini ============ */
// Foto dummy pernikahan dari Unsplash (lisensi bebas pakai). Ganti dengan foto kostumer saat pesanan asli.
const U = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}&h=${h}`;
// Kosongkan ("" / []) bagian opsional bila tidak dipakai: live, giftAddress, gifts, story.
const C = {
  bride: {
    full: "Nadia Safira Rahma", // nama + gelar
    nick: "Nadia", // nama panggilan (tampil di cover)
    ig: "nadia.safira", // tanpa @
    wa: "6281234567890", // format 62xxx
    father: "Budi Santoso",
    mother: "Siti Aminah",
    role: "Putri", // Putri / Putri pertama / Putri kedua ...
    address: "Jl. Melati No. 10 RT 01 RW 02, Kec. Contoh, Kota Contoh",
    // 2 foto = carousel otomatis (bergeser ke kanan). Isi 1 foto saja bila tidak ingin carousel.
    photos: [
      U("1565038930214-09566ed2149b", 900, 1200),
      U("1607357910286-1ff94ac13c24", 900, 1200),
    ],
  },
  groom: {
    full: "Raka Pratama Wijaya",
    nick: "Raka",
    ig: "raka.pratama",
    wa: "6281298765432",
    father: "Hendra Wijaya",
    mother: "Ratna Dewi",
    role: "Putra",
    address: "Jl. Kenanga No. 25 RT 03 RW 04, Kec. Contoh, Kota Contoh",
    // 2 foto = carousel otomatis (bergeser ke kiri).
    photos: [
      U("1545396047-0fd21ce522ba", 900, 1200),
      U("1596457221755-b96bc3a6df18", 900, 1200),
    ],
  },
  date: "2028-12-12T07:30:00", // tanggal & jam mulai acara (Sabtu, 12 Desember 2026)
  // Identitas & teks undangan
  site: {
    title: "The Wedding of Nadia & Raka", // judul tab browser
    copyright: "© 2026 Aisyae Digital Invitation",
    designer: { name: "saevitation.com", url: "https://saevitation.com/" }, // kredit desainer
    instagram: {
      handle: "@saevitation",
      url: "https://www.instagram.com/saevitation",
    },
  },
  text: {
    greeting: "Assalamu'alaikum Wr. Wb.",
    intro:
      "Segala puji bagi Allah SWT yang telah menjadikan hamba-Nya hidup berpasang-pasangan. Dengan memohon ridho, rahmat, dan berkah-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam acara pernikahan kami.",
    quote:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    quoteSource: "AR-RUM AYAT : 21",
    closing:
      "Merupakan sebuah kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Terima kasih.",
  },
  // URL Web App Google Apps Script (berakhiran /exec) untuk RSVP & ucapan. Kosongkan = disimpan di browser saja (hanya untuk uji coba)
  rsvp: "",
  // 3 foto slide otomatis di bagian atas (setelah tombol Buka Undangan diklik), bergeser ke kanan. Disarankan portrait 2:3. Isi 1 foto = diam.
  hero: [
    U("1519741497674-611481863552", 900, 1350),
    U("1565038930214-09566ed2149b", 900, 1350),
    U("1545396047-0fd21ce522ba", 900, 1350),
  ],
  // 2 foto slide ke kanan otomatis sebagai latar footer (rasio bebas, landscape/portrait). Kosongkan [] = pakai bg.foot & bg.quote.
  footPhotos: [
    U("1502955422409-06e43fd3eff3", 1200, 1200),
    U("1517456215183-9a2c3a748d0c", 1200, 1200),
  ],
  // foto latar tiap bagian
  bg: {
    cover: U("1519741497674-611481863552", 1200, 900),
    quote: U("1517456215183-9a2c3a748d0c", 1200, 900),
    foot: U("1502955422409-06e43fd3eff3", 1200, 900),
    date: U("1556302482-70b6e670e6b7", 1200, 900),
  },
  events: [
    {
      t: "Akad Nikah",
      // photos: 2 foto = carousel otomatis; date (opsional) = tanggal khusus acara ini, kosong = tanggal utama
      photos: [
        U("1646325311277-0c35409fdd57", 1200, 800),
        U("1607357910286-1ff94ac13c24", 1200, 800),
      ],
      time: "07.30 - 09.00 WIB",
      place: "Gedung Serbaguna Mawar",
      addr: "Jl. Contoh Raya No. 123, Kec. Contoh, Kota Contoh, Provinsi Contoh 12345",
      map: "https://maps.google.com/?q=Gedung+Serbaguna+Mawar",
    },
    {
      t: "Resepsi",
      photos: [
        U("1537633468298-d86f0c2d4173", 1200, 800),
        U("1695266392136-1805eef542ac", 1200, 800),
      ],
      time: "10.00 - 15.00 WIB",
      place: "Gedung Serbaguna Mawar",
      addr: "Jl. Contoh Raya No. 123, Kec. Contoh, Kota Contoh, Provinsi Contoh 12345",
      map: "https://maps.google.com/?q=Gedung+Serbaguna+Mawar",
    },
  ],
  // live streaming (kosongkan "" jika tidak ada). platform: nama platform di judul kartu; photos: 2 foto slide ke kanan otomatis (kosongkan [] = 2 foto pertama galeri)
  live: {
    platform: "YouTube",
    url: "https://www.youtube.com/@nadia-raka/live",
    time: "08.00 - 09.00 WIB", // jam live (opsional)
    // date: "2028-12-12", // tanggal live (opsional; kosong = tanggal utama)
    // desc: "Teks pengantar live streaming (opsional; kosong = teks standar)",
    photos: [
      U("1519741497674-611481863552", 1200, 750),
      U("1565038930214-09566ed2149b", 1200, 750),
    ],
  },
  music: "sound/stephen-sanchez-until-i-found-you.mp3", // lagu latar: taruh file mp3 di folder sound/
  // alamat pengiriman kado (kosongkan {} jika tidak dipakai)
  giftAddress: {
    name: "Nadia",
    addr: "Jl. Melati No. 10 RT 01 RW 02, Kec. Contoh, Kota Contoh",
  },
  // rekening amplop digital (boleh lebih dari satu; kosongkan [] jika tidak dipakai)
  gifts: [{ bank: "BCA", no: "1234567890", name: "Nadia Safira Rahma" }],
  // galeri: tampil sebagai grid pola [1 lebar, 2, 2] berulang tiap 5 foto. Disarankan 10 foto (foto ke-1 & ke-6 tampil lebar 3:2, sisanya portrait 3:4)
  // video prewedding di atas foto galeri: tempel link YouTube atau ID videonya (kosongkan "" jika tidak ada)
  video: {
    url: "https://www.youtube.com/watch?v=QMForPSc-Mc",
    title: "Video Prewedding",
  },
  gallery: [
    U("1607357910286-1ff94ac13c24", 800, 1100),
    U("1596457221755-b96bc3a6df18", 800, 1100),
    U("1624067056935-593eb6595294", 800, 1100),
    U("1535185384036-28bbc8035f28", 800, 1100),
    U("1556499696-0ba753b9ad02", 800, 1100),
    U("1684244276932-6ae853774c4d", 800, 1100),
    U("1502955422409-06e43fd3eff3", 800, 1100),
    U("1517456215183-9a2c3a748d0c", 800, 1100),
    U("1519741497674-611481863552", 800, 1100),
    U("1565038930214-09566ed2149b", 800, 1100),
  ],
  // 2 foto slide atas-bawah otomatis di bagian RSVP (rasio 4:3). Kosongkan [] = pakai 2 foto pertama galeri.
  rsvpPhotos: [
    U("1519741497674-611481863552", 1200, 900),
    U("1565038930214-09566ed2149b", 1200, 900),
  ],
  // cerita (kosongkan [] jika tidak dipakai)
  // 2 foto cerita (carousel otomatis bergeser ke bawah)
  storyPhotos: [
    U("1519741497674-611481863552", 1200, 800),
    U("1517456215183-9a2c3a748d0c", 1200, 800),
  ],
  // contoh isi (hapus tanda // di depan, lalu isi dengan cerita asli):
  // story: [
  //   { d: "09 September 2016", t: "Awal Bertemu", p: "Tulis cerita singkat di sini." },
  //   { d: "12 Desember 2016", t: "Menjalin Hubungan", p: "Tulis cerita singkat di sini." },
  //   { d: "15 Januari 2023", t: "Bertunangan", p: "Tulis cerita singkat di sini." },
  // ],
  // CERITA DUMMY — ganti dengan cerita asli kostumer (kosongkan [] jika tidak dipakai)
  story: [
    {
      d: "09 September 2018",
      t: "Awal Bertemu",
      p: "Awal mula kami bertemu adalah dalam sebuah acara sederhana yang tidak pernah kami duga akan menjadi awal dari perjalanan panjang ini.",
    },
    {
      d: "12 Desember 2018",
      t: "Menjalin Hubungan",
      p: "Setelah berkomunikasi beberapa bulan dan menemukan kecocokan, akhirnya kami memutuskan untuk menjalin sebuah komitmen.",
    },
    {
      d: "15 Januari 2026",
      t: "Bertunangan",
      p: "Setelah menjalin hubungan beberapa tahun, akhirnya kami memantapkan hati untuk membawa hubungan ini ke jenjang yang lebih serius.",
    },
  ],
};
/* =============================================== */
