/**
 * ============================================================
 * BIRTHDAY WEBSITE — MAIN APPLICATION
 * ============================================================
 * Manages the full flow:
 * Intro → Password → Celebration → Main Website
 * ============================================================
 */

/* ── STATE ───────────────────────────────────────────────── */
const State = {
  visitorName: sessionStorage.getItem("visitorName") || "Special Guest",
  visitorAge:  parseInt(sessionStorage.getItem("visitorAge"), 10) || 18,
  musicPlaying: false,
  isUnlocked: sessionStorage.getItem("isUnlocked") === "true" // Cek apakah sudah lolos login
};

// Fungsi baru untuk menyimpan data saat input sukses
function saveState() {
  sessionStorage.setItem("visitorName", State.visitorName);
  sessionStorage.setItem("visitorAge", State.visitorAge);
  sessionStorage.setItem("isUnlocked", State.isUnlocked);
}

/* ── UTILITY ─────────────────────────────────────────────── */
const $ = (id) => document.getElementById(id);
const create = (tag, cls) => { const el = document.createElement(tag); if(cls) el.className = cls; return el; };

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  const el = $(id);
  if (el) { el.classList.remove("hidden"); }
}

function fadeOutScreen(id, cb) {
  const el = $(id);
  if (!el) { if(cb) cb(); return; }
  el.classList.add("hidden");
  setTimeout(() => { if(cb) cb(); }, 900);
}

/* ============================================================
   STEP 1 — NAME SCREEN
   ============================================================ */
function initNameScreen() {
  showScreen("screen-name");
  const input = $("name-input");
  const btn   = $("name-btn");

  // Auto-focus with small delay for animations
  setTimeout(() => input && input.focus(), 600);

  btn.addEventListener("click", submitName);
  input.addEventListener("keydown", e => { if (e.key === "Enter") submitName(); });

  function submitName() {
    const val = input.value.trim();
    State.visitorName = val || "Special Guest";
    saveState(); 
    showGreeting();
  }

  function showGreeting() {
    const card   = $("name-card");
    const greet  = $("name-greeting");
    card.classList.add("hidden");
    greet.querySelector(".greet-name").textContent = State.visitorName;
    greet.classList.remove("hidden");
    setTimeout(() => goToAgeScreen(), 1800);
  }
}

function goToAgeScreen() {
  showScreen("screen-age");
  initAgeScreen();
}

/* ============================================================
   ⏳ LIVE COUNTDOWN SAKTI - EDISI KOTAK WAKTU BERUBAH JADI TEKS PAS HARI H
   ============================================================ */
function startIntroCountdown() {
  const countdownEl = document.getElementById("intro-countdown");
  
  // Ambil elemen kotak mika pink dan pembungkus angka di dalamnya
  const numbersWrapper = document.getElementById("countdown-numbers-wrapper");
  const dDays = document.getElementById("dash-days");
  const dHours = document.getElementById("dash-hours");
  const dMins = document.getElementById("dash-minutes");
  const dSecs = document.getElementById("dash-seconds");

  // Set target waktu sakral: 27 Juni pukul 00:00:00 tahun 2026
  const targetDate = new Date("June 27, 2026 00:00:00").getTime();

  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // 🚨 JIKA WAKTU SUDAH LEWAT / MENYENTUH HARI H
    if (distance < 0) {
      clearInterval(timerInterval);
      
      // 1. Ubah teks di section nama input paling depan
      if (countdownEl) {
        countdownEl.textContent = "The special day is finally here!";
        countdownEl.classList.add("countdown-now");
      }
      
      // 🔥 2. KUNCI UTAMA: Hancurkan kotak angka, ganti jadi teks panjang estetik di mika!
      if (numbersWrapper) {
        numbersWrapper.innerHTML = `<div style="color: #3D2C35; font-size: 1.3rem; font-weight: bold; text-align: center; width: 100%; padding: 10px 0; letter-spacing: 0.5px; animation: pulseGlow 2s infinite alternate ease-in-out;">The special day is finally here!</div>`;
      }
      
      // 3. Memicu kelas mika berubah warna jadi pink pekat romantis bawaan CSS
      const cardPinky = document.querySelector(".premium-countdown-card-pinky");
      if (cardPinky) {
        cardPinky.classList.add("countdown-now");
      }
      return;
    }

    // ⏱️ LOGIKA HITUNG KONVERSI WAKTU LIVE (SELAMA COUNTDOWN JALAN)
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Kirim data waktu ke text intro depan tempat isi nama
    if (countdownEl) {
      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until the big day`;
    }

    // Kirim data waktu live ke kotak dashboard mika pink (selama hitung mundur berjalan)
    if (dDays)  dDays.textContent  = String(days).padStart(2, '0');
    if (dHours) dHours.textContent = String(hours).padStart(2, '0');
    if (dMins)  dMins.textContent  = String(minutes).padStart(2, '0');
    if (dSecs)  dSecs.textContent  = String(seconds).padStart(2, '0');

  }, 1000);
}

// Mengunci penjalaran fungsi countdown saat aplikasi dimuat pertama kali
document.addEventListener("DOMContentLoaded", () => {
  startIntroCountdown();
});

/* ============================================================
   STEP 2 — AGE SCREEN
   ============================================================ */
function initAgeScreen() {
  const input = $("age-input");
  const btn   = $("age-btn");

  setTimeout(() => input && input.focus(), 400);

  btn.addEventListener("click", submitAge);
  input.addEventListener("keydown", e => { if (e.key === "Enter") submitAge(); });

  function submitAge() {
    const val = parseInt(input.value, 10);
    State.visitorAge = (val && val > 0) ? val : 18;
    saveState(); 
    fadeOutScreen("screen-age", goToPasswordScreen);
  }
}

/* ============================================================
   STEP 3 — PASSWORD SCREEN
   ============================================================ */
function goToPasswordScreen() {
  showScreen("screen-password");
  initPasswordScreen();
}

function initPasswordScreen() {
  const input = $("pwd-input");
  const error = $("pwd-error");
  const bearContainer = document.querySelector(".bear-container");
  const clearBtn = $("key-clear");
  const keys = document.querySelectorAll(".numeric-keypad .key-btn:not(.key-clear):not(.key-empty)");

  if (!input) return;

  // Fungsi mengatur tangan beruang nutup mata
  function updateBearState() {
    if (input.value.length > 0) {
      if (bearContainer) bearContainer.classList.add("covering");
    } else {
      if (bearContainer) bearContainer.classList.remove("covering");
    }
  }

  // Logika ketika tombol angka di-tap
  keys.forEach(key => {
    key.onclick = () => {
      if (input.value.length < 6) {
        input.value += key.getAttribute("data-val");
        error.textContent = "";
        updateBearState();

        // 🚨 KUNCI UTAMA: Begitu menyentuh 6 digit, langsung eksekusi validasi otomatis!
        if (input.value.length === 6) {
          setTimeout(verifySecretCode, 300); // Diberi jeda 300ms biar angka ke-6 terinput dulu di layar
        }
      }
    };
  });

  // Logika tombol hapus (⌫)
  if (clearBtn) {
    clearBtn.onclick = () => {
      input.value = input.value.slice(0, -1);
      error.textContent = "";
      updateBearState();
    };
  }

  // Fungsi Verifikasi Kode Otomatis
  function verifySecretCode() {
    const val = input.value.trim();
    if (val === String(CONFIG.password)) {
      error.textContent = "";
      State.isUnlocked = true; 
      saveState();             
      // Transisi mulus menuju halaman balon/selebrasi ultah
      fadeOutScreen("screen-password", startCelebration);
    } else {
      // Jika salah, baru muncul tulisan eror dan efek getar
      error.textContent = "That doesn't seem to be the right code.";
      const card = document.querySelector("#screen-password .glass-card");
      card.classList.remove("shake");
      void card.offsetWidth; // pemicu reflow animasi CSS
      card.classList.add("shake");
      
      // Kosongkan kembali inputan dan turunkan tangan beruang
      input.value = "";
      setTimeout(updateBearState, 200);
    }
  }
}

/* ============================================================
   CELEBRATION SEQUENCE
   ============================================================ */
function startCelebration() {
  showScreen("screen-celebration");
  const screen = $("screen-celebration");
  screen.style.opacity = "0";
  screen.classList.remove("hidden");
  setTimeout(() => { screen.style.transition = "opacity 0.6s"; screen.style.opacity = "1"; }, 50);

  // Build balloons based on age
  buildBalloons();

  // Start background particles
  launchParticles();
}

function buildBalloons() {
  const container = $("balloons-container");
  if (!container) return;

  // Mengambil angka umur asli yang diinput user (contoh: 18)
  let targetCount = parseInt(State.visitorAge, 10) || 5;
  
  // Batasi maksimal balon (misal 30) biar gak gempor kalau user ngasal input umur 100+
  if (targetCount > 30) targetCount = 30; 

  container.innerHTML = ""; // Bersihkan kontainer lama
  let poppedCount = 0;

  // LOGIKA UTAMA: Fungsi internal untuk memunculkan satu balon setelah balon sebelumnya pecah
  function spawnNextBalloon() {
    // Jika semua balon sesuai jumlah umur sudah dipecahkan, langsung masuk curtain & web utama
    if (poppedCount >= targetCount) {
      // 🚨 KITA CEGAT DI SINI: Begitu balon habis, panggil efek ruangan menggelap
      setTimeout(triggerCakeEnchantment, 400);
      return;
    }


    // Membuat pembungkus balon standar template lu
    const wrap = create("div", "balloon-wrap");
    wrap.style.opacity = "0";
    wrap.style.transform = "translateY(60px)";
    wrap.style.transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)";

    // Variasi warna pastel estetik acak tiap balon muncul
    const colors = ["#F2C4C4", "#C9C0E8", "#F5CBA7", "#B5C9B7", "#E8C47B", "#E8A5A5"];
    const color = colors[poppedCount % colors.length];

    // 🔥 FIX UTAMA: Mengubah teks balon agar menampilkan urutan angka (1, 2, 3... dst)
    const currentNumber = poppedCount + 1;

    wrap.innerHTML = `
      <svg class="balloon-svg" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style="width: 150px; height: 180px;">
        <ellipse cx="50" cy="50" rx="42" ry="48" fill="${color}" stroke="${color}cc" stroke-width="1.5"/>
        <ellipse cx="40" cy="35" rx="11" ry="7" fill="rgba(255,255,255,0.45)" transform="rotate(-20,40,35)"/>
        <polygon points="46,98 54,98 50,108" fill="${color}cc"/>
        <text x="50" y="52" text-anchor="middle" dominant-baseline="middle"
              font-family="'Playfair Display', serif" font-size="28" font-weight="700"
              fill="rgba(255,255,255,0.9)">${currentNumber}</text>
        <line x1="50" y1="108" x2="50" y2="112" stroke="rgba(160,120,140,0.5)" stroke-width="1.5"/>
      </svg>
      <div class="balloon-string" style="height: 50px;"></div>`;

    container.appendChild(wrap);

    // Jalankan animasi muncul halus ke atas
    setTimeout(() => {
      wrap.style.opacity = "1";
      wrap.style.transform = "translateY(0)";
    }, 50);

    // KETIKA BALON DI-TAP / DI-KLIK OLEH USER
    wrap.addEventListener("click", () => {
      if (wrap.classList.contains("popped") || wrap.classList.contains("popping")) return;
      wrap.classList.add("popping");

      setTimeout(() => {
        wrap.classList.add("popped");
        wrap.querySelector(".balloon-svg").style.display = "none";
        
        // Meledakkan sedikit kembang api kertas kecil bawaan lu
        if (typeof launchConfetti === "function") {
          launchConfetti();
        }

        poppedCount++; // Hitungan balon pecah bertambah naik
        wrap.remove(); // Hapus balon yang lama dari layar HTML
        
        // Panggil balon berikutnya setelah balon ini musnah!
        spawnNextBalloon(); 
      }, 300);
    });
  }

  // MULAI JALANKAN BALON URUTAN PERTAMA
  spawnNextBalloon();
}

function launchParticles() {
  const canvas = $("celebration-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#F2C4C4","#C9C0E8","#F5CBA7","#B5C9B7","#E8C47B","#FFFFFF"];

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 1,
      opacity: Math.random() * 0.7 + 0.3,
      shape: Math.random() > 0.5 ? "circle" : "petal",
    });
  }

  let running = true;
  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.5, p.y * 0.01, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();

  window._stopParticles = () => { running = false; };
}

function triggerPetalCurtain() {
  if (window._stopParticles) window._stopParticles();

  const curtain = $("petal-curtain");
  curtain.innerHTML = "";
  const petalColors = ["#F2C4C4","#E8A5A5","#C9C0E8","#F5CBA7","#B5C9B7"];

  for (let i = 0; i < 60; i++) {
    const petal = create("div", "petal");
    petal.style.setProperty("--left",  `${Math.random() * 100}%`);
    petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 100}px`);
    petal.style.setProperty("--dur",   `${Math.random() * 1.5 + 1.5}s`);
    petal.style.setProperty("--delay", `${Math.random() * 0.8}s`);
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    curtain.appendChild(petal);
  }

  setTimeout(revealMainWebsite, 2800);
}

/* ============================================================
   TRANSISI STERIL: GELAP -> MUSIK NYALA -> BARU LILIN NYALA
   ============================================================ */
function triggerCakeEnchantment() {
  const balloonHint = document.querySelector(".tap-hint");
  if (balloonHint) balloonHint.style.display = "none";

  showScreen("screen-cake-sinematic");

  const celScreen = $("screen-cake-sinematic");
  const cakeWrap = $("celebration-cake-wrapper");
  const flames = document.querySelectorAll(".custom-flame");
  const textHint = $("cake-instruction");

  if (!celScreen || !cakeWrap) return;

  // 1. Efek kamar menggelap syahdu
  celScreen.classList.add("room-darken");

  // 🔥 KUNCI SAKTI: Musik nyala PAS LAYAR GELAP (Sebelum lilin nyala)
  try {
    const audioEl = document.getElementById("bg-audio");
    const btnMusic = document.getElementById("music-btn");
    
    if (audioEl) {
      audioEl.src = "music/birthday.mp3"; 
      audioEl.load();
      audioEl.volume = 0.5;
      audioEl.loop = true;
      
      audioEl.play()
        .then(() => {
          State.musicPlaying = true;
          if (btnMusic) btnMusic.classList.add("playing");
        })
        .catch(e => console.log("Autoplay ditahan browser:", e));
    }
  } catch (err) {
    console.log("Gagal memicu lagu:", err);
  }

  // 2. Munculkan kue
  cakeWrap.style.display = "block";
  setTimeout(() => cakeWrap.classList.add("show"), 50);

  // 3. Peri cahaya memutar (4 detik)
  const spark = create("div", "spark-light");
  celScreen.appendChild(spark);

  // 4. JEDA 4 DETIK: Baru lilin nyala
  setTimeout(() => {
    if (spark) spark.remove();
    flames.forEach(flame => flame.classList.add("ignited"));

    celScreen.classList.remove("room-darken");
    celScreen.classList.add("cake-glow-active");

    // 5. TIMER 15 DETIK OTOMATIS
    let countdown = 15;
    textHint.textContent = `Make a wish, blowing out in ${countdown}s`;

    const counterInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        textHint.textContent = `Make a wish, blowing out in ${countdown}s`;
      } else {
        clearInterval(counterInterval);
        flames.forEach(flame => flame.classList.remove("ignited"));
        celScreen.classList.remove("cake-glow-active");

        setTimeout(() => {
          fadeOutScreen("screen-cake-sinematic", triggerPetalCurtain);
        }, 1000);
      }
    }, 1000);
  }, 4000);
}

/* ============================================================
   REVEAL MAIN WEBSITE -> OTOMATIS BERHENTIIN LAGU ULANG TAHUN
   ============================================================ */
function revealMainWebsite() {
  document.querySelectorAll(".screen").forEach(s => {
    s.style.transition = "opacity 0.6s";
    s.style.opacity = "0";
    setTimeout(() => s.classList.add("hidden"), 600);
  });

  const main = $("main-website");
  main.classList.add("visible");
  main.style.opacity = "0";
  setTimeout(() => {
    main.style.transition = "opacity 0.8s ease";
    main.style.opacity = "1";

    document.querySelectorAll("[data-name]").forEach(el => {
      el.textContent = State.visitorName;
    });
    document.querySelectorAll("[data-age]").forEach(el => {
      el.textContent = State.visitorAge;
    });

    // 🔥 KUNCI SAKTI 2: Matikan musik kue secara paksa saat masuk ke web asli!
    try {
      const audioEl = document.getElementById("bg-audio");
      const btnMusic = document.getElementById("music-btn");
      
      if (audioEl) {
        audioEl.pause(); // Musik berhenti total!
        State.musicPlaying = false;
        
        if (btnMusic) {
          btnMusic.classList.remove("playing");
          btnMusic.innerHTML = "🎵"; // Kembalikan ikon tombol ke mode diam
        }
      }
    } catch (err) {
      console.log("Gagal mematikan lagu saat masuk web asli:", err);
    }

    // Jalankan semua fitur utama website
    initHero();
    initGallery();
    initLetter();
    initGames();
    initGift();
    initEnding();
    initScrollReveal();
    initMusic(); // Fungsi ini nanti siap dipakai kalau user klik manual tombol di kanan bawah
    $("music-btn").classList.add("visible");
  }, 300);
}

/* ============================================================
   HERO
   ============================================================ */
function initHero() {
  $("hero-subtitle").textContent = CONFIG.heroSubtitle;
  spawnSparkles();
}

function spawnSparkles() {
  const container = document.querySelector(".hero-sparkles");
  if (!container) return;
  const emojis = ["✨","⭐","🌸","💫","🌟","✿","❋"];
  for (let i = 0; i < 12; i++) {
    const s = create("span", "sparkle");
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left  = `${Math.random() * 90 + 5}%`;
    s.style.top   = `${Math.random() * 80 + 5}%`;
    s.style.setProperty("--dur", `${Math.random() * 3 + 2}s`);
    s.style.setProperty("--delay", `${Math.random() * 3}s`);
    s.style.fontSize = `${Math.random() * 0.8 + 0.5}rem`;
    container.appendChild(s);
  }
}

/* ============================================================
   MUSIC
   ============================================================ */
function initMusic() {
  const btn   = $("music-btn");
  const audio = $("bg-audio");

  if (!audio) return;
  audio.src = CONFIG.musicFile;
  audio.volume = 0.4;
  audio.loop = true;

  btn.addEventListener("click", () => {
    if (State.musicPlaying) {
      audio.pause();
      State.musicPlaying = false;
      btn.textContent = "🎵";
      btn.classList.remove("playing");
    } else {
      audio.play().catch(() => {});
      State.musicPlaying = true;
      btn.textContent = "🎶";
      btn.classList.add("playing");
    }
  });
}

/* ============================================================
   GALLERY
   ============================================================ */
function initGallery() {
  const grid = $("polaroid-grid");
  if (!grid) return;

  CONFIG.galleryItems.forEach((item, i) => {
    const card = create("div", "polaroid reveal");
    card.setAttribute("data-index", i);
    card.innerHTML = `
      <div class="polaroid-img-wrap">
        <div class="polaroid-placeholder">
          <span class="ph-icon">🖼</span>
          <span class="ph-text">Photo ${i+1}</span>
        </div>
        <img data-src="${item.src}" alt="${item.title || ''}" loading="lazy" style="display:none">
      </div>
      <div class="polaroid-caption">${item.caption || ""}</div>`;
    card.addEventListener("click", () => openLightbox(i));
    grid.appendChild(card);
  });

  const imgObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target.querySelector("img[data-src]");
      if (!img) return;
      const src = img.getAttribute("data-src");
      const tempImg = new Image();
      tempImg.onload = () => {
        img.src = src;
        img.style.display = "block";
        entry.target.querySelector(".polaroid-placeholder").style.display = "none";
        imgObs.unobserve(entry.target);
      };
      tempImg.onerror = () => imgObs.unobserve(entry.target);
      tempImg.src = src;
    });
  }, { rootMargin: "200px" });

  grid.querySelectorAll(".polaroid").forEach(card => imgObs.observe(card));
}

function openLightbox(index) {
  const item = CONFIG.galleryItems[index];
  const lb   = $("lightbox");
  lb.querySelector(".lightbox-title").textContent   = item.title || "";
  lb.querySelector(".lightbox-meta").textContent    = item.date  || "";
  lb.querySelector(".lightbox-caption").textContent = item.caption || "";
  const img = lb.querySelector(".lightbox-img");
  img.src = item.src;
  img.alt = item.title || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  $("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

/* ============================================================
   LETTER
   ============================================================ */
function initLetter() {
  const env  = document.querySelector(".envelope-wrap");
  const modal = $("letter-modal");
  const closeBtn = modal.querySelector(".letter-close");

  env.addEventListener("click", openLetter);
  closeBtn.addEventListener("click", closeLetter);
  modal.addEventListener("click", e => { if(e.target === modal) closeLetter(); });

  function openLetter() {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    typeLetterText();
  }

  function closeLetter() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function typeLetterText() {
  const textEl = document.querySelector(".letter-text");
  textEl.innerHTML = "";

  const dearLine = create("span", "dear-line");
  dearLine.textContent = `Dear ${State.visitorName},`; // Ini bawaan template lu yang udah bener
  textEl.appendChild(dearLine);

  let lineIndex = 0;
  function typeLine() {
    if (lineIndex >= CONFIG.birthdayLetter.length) return;
    const p = create("p");
    textEl.appendChild(p);
    let charIndex = 0;
    
    // 🚨 KUNCI UTAMA: Kita ambil teks asli dari CONFIG, lalu paksa ganti kodenya jadi nama asli
    let text = CONFIG.birthdayLetter[lineIndex];
    if (text.includes("${State.name}")) {
      text = text.replace("${State.name}", State.visitorName);
    }

    function typeChar() {
      if (charIndex < text.length) {
        p.textContent += text[charIndex++];
        setTimeout(typeChar, 22);
      } else {
        lineIndex++;
        setTimeout(typeLine, 200);
      }
    }
    typeChar();
  }
  setTimeout(typeLine, 500);
}

/* ============================================================
   GAMES MANAGER (FIXED AUTO-OPEN DECORATE CAKE)
   ============================================================ */
function initGames() {
  document.querySelectorAll(".game-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".game-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".game-panel").forEach(p => p.classList.remove("active"));
      
      tab.classList.add("active");
      const target = $("panel-" + tab.dataset.game);
      if (target) {
        target.classList.add("active");
        
        // Pemicu ulang sistem game saat tab dibuka
        if (tab.dataset.game === "puzzle") {
          initPuzzleGame();
        } else if (tab.dataset.game === "quiz") {
          initQuizGame(); // Memastikan kue di-render ulang dengan pas
        }
      }
    });
  });

  // 1. Inisialisasi semua fungsi game di latar belakang
  initMemoryGame();
  initPuzzleGame();
  initQuizGame();

  // 2. KUNCI UTAMA: Paksa browser simulasikan klik pada tab Kue (quiz) secara otomatis
  const cakeTab = document.querySelector('.game-tab[data-game="quiz"]');
  if (cakeTab) {
    cakeTab.click();
  }
}

/* ── MEMORY GAME ─────────────────────────────────────────── */
function initMemoryGame() {
  const grid = $("memory-grid");
  if (!grid) return;

  const emojis = [...CONFIG.memoryEmojis, ...CONFIG.memoryEmojis];
  for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }

  let flipped = [], matched = 0, locked = false;
  const statusEl = $("memory-status");
  const unlockEl = $("memory-unlock");

  emojis.forEach((emoji, i) => {
    const card = create("div", "mem-card");
    card.innerHTML = `
      <div class="mem-back">🎀</div>
      <div class="mem-face">${emoji}</div>`;
    card.dataset.emoji = emoji;

    card.addEventListener("click", () => {
      if (locked || card.classList.contains("flipped") || card.classList.contains("matched")) return;
      card.classList.add("flipped");
      flipped.push(card);

      if (flipped.length === 2) {
        locked = true;
        const [a, b] = flipped;
        if (a.dataset.emoji === b.dataset.emoji) {
          a.classList.add("matched");
          b.classList.add("matched");
          matched++;
          flipped = [];
          locked = false;
          statusEl.textContent = `${matched} / ${CONFIG.memoryEmojis.length} matched 🌸`;
          if (matched === CONFIG.memoryEmojis.length) {
            unlockEl.classList.add("show");
            unlockEl.textContent = CONFIG.memoryUnlockMessage;
          }
        } else {
          setTimeout(() => {
            a.classList.remove("flipped");
            b.classList.remove("flipped");
            flipped = [];
            locked = false;
          }, 1000);
        }
      }
    });

    grid.appendChild(card);
  });
}

/* ── GAME 2: SCRATCH CARD (GANTI PUZZLE) ─────────────────── */
function initPuzzleGame() {
  const canvas = $("scratch-canvas");
  const rewardEl = $("scratch-reward");
  const unlockEl = $("puzzle-unlock");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  
  // Mengambil pesan rahasia dari CONFIG
  rewardEl.textContent = CONFIG.scratchSecretMessage || "Kamulah hadiah terindahnya! 💖";

  // Gambar lapisan abu-down penggosok
  ctx.fillStyle = "#bdc3c7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#95a5a6";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GOSOK DI SINI 🎀", canvas.width / 2, canvas.height / 2);

  let isDrawing = false;

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getMousePos(e);
    
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.fill();
    
    checkScratchPercentage();
  }

  function checkScratchPercentage() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let cleared = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) cleared++;
    }
    const percentage = cleared / (pixels.length / 4);
    if (percentage > 0.45) { // Jika sudah tergosok 45%
      canvas.style.transition = "opacity 0.5s ease";
      canvas.style.opacity = "0";
      setTimeout(() => {
        canvas.remove();
        unlockEl.classList.add("show");
        unlockEl.textContent = "Yeay! Terima kasih ya udah lahir di dunia ini!";
      }, 500);
    }
  }

  canvas.addEventListener("mousedown", (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener("mousemove", scratch);
  window.addEventListener("mouseup", () => isDrawing = false);

  canvas.addEventListener("touchstart", (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener("touchmove", scratch);
  window.addEventListener("touchend", () => isDrawing = false);
}

/* ── GAME 3: DECORATE THE CAKE (DINAMIS & MERIAH) ───────────────── */
function initQuizGame() {
  
  // Fungsi menambahkan topping secara acak natural di atas kue
  window.addTopping = function(emoji) {
    const zone = $("cake-toppings-zone");
    if (!zone) return;

    // Naikkan batas hiasan agar lebih ramai dan meriah (maksimal 15 objek)
    if (zone.children.length >= 15) {
      alert("Kuenya udah ramai dan cantik banget! Yuk langsung dinyalain lilinnya. ✨");
      return;
    }

    const element = document.createElement("span");
    element.textContent = emoji;
    element.className = emoji === "🕯️" || emoji === "⭐" ? "cake-item candle-target" : "cake-item";
    
   // ============================================================
// ATUR KOORDINAT ACAK DI ATAS KUE (DINAIKIN DIKIT BIAR PAS)
// ============================================================
const randomLeft = Math.floor(Math.random() * 40) + 30; // Rentang 30% - 70% biar pas di tengah

// DASAR: Stroberi 🍓 & Cokelat 🍫 dinaikin ke 125px biar pas duduk manis di permukaan atas kue
let randomBottom = Math.floor(Math.random() * 15) + 125; 

// Khusus Lilin Klasik 🕯️ dan Bintang ⭐ dinaikin ke 155px biar nancepnya pas kelihatan gagah
if (emoji === "🕯️" || emoji === "⭐") {
  randomBottom = Math.floor(Math.random() * 15) + 155; 
}

// Khusus Balon 🎈 dan Sparkle ✨ dinaikin ke 185px biar melayang pas di atas api lilin
if (emoji === "🎈" || emoji === "✨") {
  randomBottom = Math.floor(Math.random() * 20) + 185; 
}

// Variasi rotasi kemiringan tetap natural (-20 sampai 20 derajat)
const randomRotate = Math.floor(Math.random() * 40) - 20;

    // Inject style absolute ke dalam elemen
    element.style.cssText = `
      position: absolute;
      left: ${randomLeft}%;
      bottom: ${randomBottom}px;
      transform: translate(-50%, 0) scale(0) rotate(${randomRotate}deg);
      font-size: 2.2rem;
      user-select: none;
      z-index: ${randomBottom}; /* Semakin di bawah posisi pasangnya, layer tertimpa di belakang */
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    zone.appendChild(element);
    
    // Efek animasi pop-up lembut saat muncul
    setTimeout(() => {
      element.style.transform = `translate(-50%, 0) scale(1) rotate(${randomRotate}deg)`;
    }, 30);
  };

  // Fungsi mereset kue kembali bersih
  window.resetCakeAndToppings = function() {
    const zone = $("cake-toppings-zone");
    const msgEl = $("cake-celebration-msg");
    const burnBtn = $("burn-candle-btn");
    const cakeWrap = $("base-cake-wrapper");

    if (zone) zone.innerHTML = "";
    if (msgEl) msgEl.classList.remove("show");
    if (cakeWrap) cakeWrap.style.transform = "scale(1)";
    if (burnBtn) {
      burnBtn.disabled = false;
      burnBtn.textContent = "Nyalakan Lilin & Tiup!";
    }
  };

  // Fungsi menyalakan lilin, kembang api, dan efek getar kue (VERSI BERSIH + AUDIO LU)
  window.triggerCakeMagic = function() {
    const zone = $("cake-toppings-zone");
    const msgEl = $("cake-celebration-msg");
    const burnBtn = $("burn-candle-btn");
    const cakeWrap = $("base-cake-wrapper");

    if (!zone || zone.children.length === 0) {
      alert("Taruh lilin atau topping favoritmu dulu di atas kuenya! 🎂");
      return;
    }

    // Beri efek getar gembira pada kue dasar
    if (cakeWrap) cakeWrap.style.transform = "scale(1.1) rotate(2deg)";

    // Cari semua elemen lilin dan pasang animasi nyala api kedip CSS
    const candles = zone.querySelectorAll(".candle-target");
    candles.forEach(candle => {
      candle.classList.add("lit-candle");
    });

    // Kunci tombol aksi utama
    if (burnBtn) {
      burnBtn.disabled = true;
      burnBtn.textContent = "Lilin Menyala! Make a Wish";
    }

    // Tampilkan teks ucapan
    if (msgEl) {
      msgEl.classList.add("show");
      msgEl.textContent = CONFIG.quizEndingMessage || "Kuenya cantik banget! Selamat ulang tahun, buat permohonan terbaikmu ya! 🥳🎈";
    }

    // Ledakkan efek kembang api kertas bawaan template secara masif
    if (typeof launchConfetti === "function") {
      launchConfetti();
      setTimeout(launchConfetti, 400);
      setTimeout(launchConfetti, 900);
    }

    // 🚨 KUNCI AMAN AUDIO BIRTHDAY LU (ANTI-CRASH & ANTI-MOGOK)
    try {
      const audioEl = document.getElementById("bg-audio");
      const btnMusic = document.getElementById("music-btn");
      
      if (audioEl) {
        // TINGGAL LU SESUAIIN: Ganti 'music/birthday.mp3' di bawah ini dengan nama folder & file lagu lu sendiri!
        audioEl.src = "music/birthday.mp3"; 
        
        audioEl.load(); // Paksa browser membaca file lagu baru
        audioEl.play().catch(e => console.log("Audio otomatis ditahan browser:", e));
        
        // Memastikan ikon tombol musik di kanan bawah layar lu tetep aktif/berputar
        if (btnMusic) {
          btnMusic.classList.add("playing");
          btnMusic.innerHTML = "🎵";
        }
      }
    } catch (error) {
      console.log("Audio otomatis di-bypass jika error agar sistem input login depan gak macet:", error);
    }
  }; // <--- Ditutup dengan aman di sini
} // <--- Dan ditutup dengan kurung kurawal pembungkus utama file JS lu yang paling bawah

/* ============================================================
   GIFT
   ============================================================ */
function initGift() {
  const box    = $("gift-box");
  const reveal = $("gift-reveal");
  const wrap   = document.querySelector(".gift-box-wrap"); // Ambil pembungkus yang maruk tempat
  if (!box) return;
  let opened = false;

  box.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    // Efek kado mengecil dan menghilang
    box.style.transform = "scale(0) rotate(10deg)";
    box.style.opacity = "0";
    box.style.transition = "all 0.4s ease-in";
    if(document.querySelector(".gift-hint")) {
      document.querySelector(".gift-hint").style.opacity = "0";
    }

    setTimeout(() => {
      // FIX UTAMA: Paksa pembungkus kado hilang total biar tidak menyisakan space tinggi!
      if (wrap) wrap.style.display = "none"; 

      // Munculkan si kotak putih cantik rapat ke atas
      reveal.classList.add("open");
      reveal.innerHTML = `
        <div class="gift-icon">🎁</div>
        <div class="gift-msg">${CONFIG.giftMessage}</div>`;
      launchConfetti();
    }, 400);
  });
}

function launchConfetti() {
  const colors = ["#F2C4C4","#C9C0E8","#F5CBA7","#B5C9B7","#E8C47B","#FFFFFF","#FFD700"];
  for (let i = 0; i < 60; i++) {
    const piece = create("div", "confetti-piece");
    const size  = Math.random() * 8 + 5;
    piece.style.width  = `${size}px`;
    piece.style.height = `${size * (Math.random() * 1 + 0.5)}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--left",  `${Math.random() * 100}%`);
    piece.style.setProperty("--spin",  `${(Math.random() - 0.5) * 720}deg`);
    piece.style.setProperty("--dur",   `${Math.random() * 1.5 + 1.5}s`);
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

/* ============================================================
   ENDING
   ============================================================ */
function initEnding() {
  const mainEl = document.querySelector(".ending-main");
  if (mainEl) mainEl.textContent = CONFIG.endingMessage;

  const subEl = document.querySelector(".ending-sub");
  if (subEl) {
    subEl.innerHTML = `Thank you for being part of this little story, <em>${State.visitorName}</em>. 🤍`;
  }

  const starsEl = document.querySelector(".ending-stars");
  if (!starsEl) return;
  for (let i = 0; i < 50; i++) {
    const star = create("div", "star-dot");
    const size = Math.random() * 2 + 1;
    star.style.width  = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left   = `${Math.random() * 100}%`;
    star.style.top    = `${Math.random() * 100}%`;
    star.style.setProperty("--dur",   `${Math.random() * 3 + 2}s`);
    star.style.setProperty("--delay", `${Math.random() * 4}s`);
    starsEl.appendChild(star);
  }
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

/* ============================================================
   LIGHTBOX EVENTS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const lb = $("lightbox");
  if (lb) {
    lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  }

  // Cek apakah user sudah login sebelumnya
  if (State.isUnlocked) {
    // 1. Sembunyikan semua screen login secara instan
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    
    // 2. Langsung tampilkan main website
    const main = $("main-website");
    main.classList.add("visible");
    main.style.opacity = "1";

    // 3. Isi semua nama dan umur di komponen website
    document.querySelectorAll("[data-name]").forEach(el => el.textContent = State.visitorName);
    document.querySelectorAll("[data-age]").forEach(el => el.textContent = State.visitorAge);

    // 4. Jalankan semua fitur utama website
    initHero();
    initGallery();
    initLetter();
    initGames();
    initGift();
    initEnding();
    initScrollReveal();
    initMusic();
    $("music-btn").classList.add("visible");
    
  } else {
    // Jika belum pernah login, mulai dari awal seperti biasa
    initNameScreen();
  }

  /* ============================================================
   ANTI-BOCOR: PAUSE LAGU OTOMATIS SAAT KELUAR DARI BROWSER
   ============================================================ */
document.addEventListener("visibilitychange", () => {
  const audioEl = document.getElementById("bg-audio");
  const btnMusic = document.getElementById("music-btn");

  if (!audioEl) return;

  if (document.hidden) {
    // 1. Jika user keluar dari Chrome / pindah tab, PAUSE lagunya!
    audioEl.pause();
    
    // Opsional: Bikin ikon musik di kanan bawah berhenti berputar biar sinkron
    if (btnMusic) {
      btnMusic.classList.remove("playing");
    }
  } else {
    // 2. Jika user balik lagi ke Chrome, cek dulu apakah status musiknya emang harus bunyi
    // Kita cuma play lagi kalau dari awal musiknya emang sudah di-unlock / sedang aktif
    if (State.musicPlaying || (btnMusic && btnMusic.classList.contains("playing"))) {
      audioEl.play().catch(e => console.log("Autoplay ditahan browser:", e));
      
      if (btnMusic) {
        btnMusic.classList.add("playing");
      }
    }
  }
});
});