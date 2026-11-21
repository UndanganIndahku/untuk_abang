// Render seluruh konten dari data.js ke halaman
function renderContent() {
  document.title = graduationData.pageTitle;

  // Audio
  const bgm = document.getElementById("bgm");
  const bgmSource = document.getElementById("bgm-source");
  bgmSource.src = graduationData.musicFile;
  bgm.load();

  // Hero Section
  document.getElementById("hero-badge").textContent = graduationData.hero.badge;
  document.getElementById("hero-greeting").textContent = graduationData.hero.greeting;
  document.getElementById("hero-photo").src = graduationData.hero.centerPhoto;
  document.getElementById("hero-name").textContent = graduationData.hero.name;
  document.getElementById("hero-subtitle").textContent = graduationData.hero.subtitle;
  document.getElementById("btn-lihat-ucapan").innerHTML = `${graduationData.hero.buttonText} <i class="bi bi-arrow-down-circle-fill ms-2"></i>`;

  // Member Cards
  document.getElementById("member-section-title").textContent = graduationData.memberSectionTitle;
  const memberContainer = document.getElementById("member-cards-container");
  memberContainer.innerHTML = graduationData.members.map((member, index) => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card card-member border-0 h-100 shadow">
        <div class="member-img-box">
          <img src="${member.photo}" class="card-img-top" alt="Oshi ${index + 1}">
          <div class="member-badge">${member.name}</div>
        </div>
        <div class="card-body bg-dark text-white text-center p-4">
          <h5 class="fw-bold text-danger mb-2">${member.title}</h5>
          <p class="card-text text-white-50 small">${member.message}</p>
        </div>
      </div>
    </div>
  `).join("");

  // Quote Section
  document.getElementById("quote-text").innerHTML = graduationData.quote.text;
  document.getElementById("quote-source").textContent = graduationData.quote.source;

  // Secret Letter & Gallery
  document.getElementById("letter-title").textContent = graduationData.secretLetter.title;
  const galleryContainer = document.getElementById("gallery-container");
  galleryContainer.innerHTML = graduationData.secretLetter.photos.map(photo => `
    <div class="profile-img-container">
      <img src="${photo.src}" alt="${photo.alt}">
    </div>
  `).join("");
  document.getElementById("letter-message").innerHTML = graduationData.secretLetter.message;
  document.getElementById("letter-sender").textContent = graduationData.secretLetter.sender;

  // Footer
  document.getElementById("footer-brand").textContent = graduationData.footer.brand;
  document.getElementById("footer-copyright").innerHTML = graduationData.footer.copyright;
}

// Fungsi kontrol musik
function playMusic() {
  const audio = document.getElementById("bgm");
  const icon = document.getElementById("musicIcon");
  const btn = document.getElementById("musicBtn");

  if (audio.paused) {
    audio.play().then(() => {
      icon.className = "bi bi-pause-fill";
      btn.classList.add("playing");
    }).catch(err => console.log("Audio play prevented:", err));
  }
}

function toggleMusic() {
  const audio = document.getElementById("bgm");
  const icon = document.getElementById("musicIcon");
  const btn = document.getElementById("musicBtn");

  if (audio.paused) {
    playMusic();
  } else {
    audio.pause();
    icon.className = "bi bi-music-note-beamed";
    btn.classList.remove("playing");
  }
}

// Event saat tombol "Lihat Ucapan Member" diklik -> otomatis play lagu
document.addEventListener("DOMContentLoaded", () => {
  renderContent();

  const btnLihatUcapan = document.getElementById("btn-lihat-ucapan");
  if (btnLihatUcapan) {
    btnLihatUcapan.addEventListener("click", () => {
      playMusic();
    });
  }
});

// Efek Confetti saat halaman dimuat
window.onload = function() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#e11d48', '#fbbf24', '#ffffff'] }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#e11d48', '#fbbf24', '#ffffff'] }));
  }, 250);
};