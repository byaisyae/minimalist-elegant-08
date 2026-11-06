/* Konfigurasi tema Tailwind (dimuat setelah cdn.tailwindcss.com). Ubah warna & font di sini. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Tema Claymorphism Ocean Blue: cream = latar biru langit muda, ink = teks navy, ac = aksen biru laut
        cream: { 50: "#f2faff", 100: "#e2f1fb", 200: "#d0e8f7", 300: "#b6dcf0" },
        ink: { 900: "#0f2f45", 700: "#234c66", 500: "#4a7a96" },
        ac: { DEFAULT: "#0f78a8", dark: "#0a5c85" },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        head: ['"Cormorant Garamond"', "serif"],
        serif: ['"Playfair Display"', "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
};
