/* =========================================================
   UNDANGAN ULANG TAHUN — SCRIPT
   -----------------------------------------------------------
   Semua teks & foto bisa kamu ganti lewat objek CONFIG di
   bawah ini. Tidak perlu menyentuh bagian logika di bawahnya
   kecuali kamu ingin menambah fitur baru.
   ========================================================= */

const CONFIG = {
  // Nama yang akan tampil di amplop & ucapan final
  recipientName: "Sayangku Rachel",

  // Pesan di kartu undangan (step 2)
  invitationMessage:
    "Hi Sayang kamu pasti lagi senyum seneng banget liat ini. Pede aja dulu sih. Sebelum kasih ucapan, " +
    "Aku mau kasih liat kenangan seru kita yang buat hidupku lebih berwarna, lalu satu ucapan " +
    "tulus dari hati untukmu. Siap?",

  // Pesan ucapan ulang tahun final (step 4)
  finalMessage:
    "Happy Birthday Sayang, Terima kasih sudah jadi orang yang sangat baik buatku, " +
    "semoga selalu bahagia, lancar kerjaan barunya, lebih sabar, makin diberkati Tuhan " +
    "sehat selalu, yang paling penting selalu sayang akow. Aku sayang kamu, sekarang, " +
    "esok, dan selamanya. ❤️ Jangan lupa tiup lilin diatas buatnya susah nih wkwkwk",

  // Tanda tangan di bagian akhir
  signature: "— Dari aku, yang paling sayang kamu",

  // Daftar foto dummy untuk galeri (step 3).
  // GANTI "src" dengan path foto asli kamu, misalnya "images/foto1.jpg"
  // setelah kamu menaruh foto tersebut di folder project.
  photos: [
    {
      src: "cantik.jpg",
      caption: "Hi Cantik Banget sih 🌸",
    },
    {
      src: "sby.jpg",
      caption: "Liburan Ke Surabaya so Hapyy 🌊",
    },
    {
      src: "rs.jpg",
      caption: "Gak boleh sakit lagi, sehat terus ☀️",
    },
    {
      src: "keren.jpg",
      caption: "biar bisa makan sama poto-2 😂",
    },
    {
      src: "luv.jpg",
      caption: "ajak aku ketempat viral terus ya 💕",
    },
  ],

  // Emoji yang berjatuhan sebagai efek dekorasi
  fxEmojis: ["💗", "🎈", "✨", "💖", "🎊"],
};

/* ========================= STATE ========================= */
let currentStep = 1;
let galleryIndex = 0;

/* ========================= INIT ========================= */
document.addEventListener("DOMContentLoaded", () => {
  // Isi teks dari CONFIG ke halaman
  document.getElementById("recipientNameEnvelope").textContent = CONFIG.recipientName;
  document.getElementById("recipientNameFinal").textContent = CONFIG.recipientName;
  document.getElementById("invitationMessage").textContent = CONFIG.invitationMessage;
  document.getElementById("finalMessage").textContent = CONFIG.finalMessage;
  document.getElementById("signature").textContent = CONFIG.signature;

  buildGalleryDots();
  renderGalleryPhoto();
  startFloatingFx();
  bindEvents();
});

/* ========================= NAVIGASI STEP ========================= */
function goToStep(stepNumber) {
  document.querySelectorAll(".step").forEach((el) => {
    el.classList.remove("step-active");
  });
  document.getElementById("step" + stepNumber).classList.add("step-active");

  document.querySelectorAll(".progress-dots .dot").forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.dot) === stepNumber);
  });

  currentStep = stepNumber;

  if (stepNumber === 4) {
    triggerCelebrationBurst();
  }
}

function bindEvents() {
  // Buka amplop (step 1 -> step 2)
  const envelope = document.getElementById("envelope");
  envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => goToStep(2), 700);
  });

  // Tombol "Lanjut" generik (pakai atribut data-next)
  document.querySelectorAll(".btn-next").forEach((btn) => {
    btn.addEventListener("click", () => {
      goToStep(Number(btn.dataset.next));
    });
  });

  // Navigasi galeri foto
  document.getElementById("prevPhoto").addEventListener("click", () => {
    galleryIndex = (galleryIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
    renderGalleryPhoto();
  });
  document.getElementById("nextPhoto").addEventListener("click", () => {
    galleryIndex = (galleryIndex + 1) % CONFIG.photos.length;
    renderGalleryPhoto();
  });

  // Tiup lilin
  document.getElementById("candle").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("blown");
  });

  // Ulangi dari awal
  document.getElementById("replayBtn").addEventListener("click", () => {
    document.getElementById("envelope").classList.remove("open");
    document.getElementById("candle").classList.remove("blown");
    galleryIndex = 0;
    renderGalleryPhoto();
    goToStep(1);
  });
}

/* ========================= GALERI FOTO ========================= */
function buildGalleryDots() {
  const dotsWrap = document.getElementById("galleryDots");
  dotsWrap.innerHTML = "";
  CONFIG.photos.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("g-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      galleryIndex = i;
      renderGalleryPhoto();
    });
    dotsWrap.appendChild(dot);
  });
}

function renderGalleryPhoto() {
  const photo = CONFIG.photos[galleryIndex];
  const img = document.getElementById("galleryImg");
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = photo.src;
    img.alt = photo.caption;
    img.style.opacity = 1;
  }, 150);

  document.getElementById("galleryCaption").textContent = photo.caption;

  document.querySelectorAll(".gallery-dots .g-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === galleryIndex);
  });
}

/* ========================= EFEK DEKORASI ========================= */
function startFloatingFx() {
  setInterval(() => {
    spawnFxItem();
  }, 450);
}

function spawnFxItem() {
  const container = document.getElementById("floating-fx");
  const item = document.createElement("span");
  item.classList.add("fx-item");
  item.textContent =
    CONFIG.fxEmojis[Math.floor(Math.random() * CONFIG.fxEmojis.length)];

  const left = Math.random() * 100;
  const duration = 4 + Math.random() * 4;
  const size = 16 + Math.random() * 14;

  item.style.left = left + "vw";
  item.style.fontSize = size + "px";
  item.style.animationDuration = duration + "s";

  container.appendChild(item);

  setTimeout(() => item.remove(), duration * 1000);
}

function triggerCelebrationBurst() {
  // Ledakan efek tambahan saat sampai di step ucapan final
  for (let i = 0; i < 18; i++) {
    setTimeout(spawnFxItem, i * 60);
  }
}
