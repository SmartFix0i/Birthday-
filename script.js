
const $ = (id) => document.getElementById(id);

// ===================================
// ELEMENTS
// ===================================

const surpriseBtn = $("surpriseBtn");
const messageCard = $("messageCard");
const nextWishBtn = $("loveBtn");
const finalCard = $("finalCard");
const againBtn = $("againBtn");

const heartsContainer = $("hearts-container");

const gallerySection = $("gallerySection");
const letterSection = $("letterSection");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let musicPlaying = false;

const flowerEmojis = [
    "🌸", "🦋", "🌷", "✨",
    "💕", "🌼", "🎀", "🕊️"
];

// ===================================
// FLOATING FLOWERS
// ===================================

function createFloatingFlower() {

    if (document.hidden || !heartsContainer) return;

    const flower = document.createElement("div");

    flower.className = "heart";

    flower.textContent =
        flowerEmojis[
            Math.floor(Math.random() * flowerEmojis.length)
        ];

    flower.style.left = Math.random() * 100 + "vw";

    flower.style.fontSize =
        (15 + Math.random() * 22) + "px";

    const duration = 6 + Math.random() * 4;

    flower.style.animationDuration = duration + "s";

    heartsContainer.appendChild(flower);

    setTimeout(() => flower.remove(), duration * 1000);
}

if (!reducedMotion) {
    setInterval(createFloatingFlower, 650);
}

// ===================================
// CONFETTI
// ===================================

function launchConfetti() {

    if (reducedMotion) return;

    const colors = [
        "#ff8fbd",
        "#ffd6e7",
        "#c7a5ff",
        "#ffffff",
        "#f7c96b",
        "#00d9ff"
    ];

    for (let i = 0; i < 100; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (2.5 + Math.random() * 2) + "s";

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";

        piece.style.borderRadius =
            Math.random() > 0.5 ? "50%" : "2px";

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 5500);
    }
}

// ===================================
// FIREWORKS
// ===================================

function launchFireworks() {

    if (reducedMotion) return;

    const colors = [
        "#00d9ff",
        "#ff8fbd",
        "#f7d68a",
        "#b99aff"
    ];

    for (let i = 0; i < 18; i++) {

        setTimeout(() => {

            const firework = document.createElement("div");

            firework.className = "firework";

            firework.style.left =
                (10 + Math.random() * 80) + "vw";

            firework.style.top =
                (10 + Math.random() * 65) + "vh";

            firework.style.color =
                colors[Math.floor(Math.random() * colors.length)];

            const container = $("fireworks-container") || document.body;

            container.appendChild(firework);

            setTimeout(() => firework.remove(), 1100);

        }, i * 130);
    }
}

// ===================================
// SHOW SECTION
// ===================================

function showSection(section) {

    if (!section) return;

    section.classList.remove("hidden");

    setTimeout(() => {

        section.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "center"
        });

    }, 100);
}

// ===================================
// BIRTHDAY SURPRISE
// ===================================

if (surpriseBtn) {

    surpriseBtn.addEventListener("click", () => {

        showSection(messageCard);

        if (gallerySection) {
            gallerySection.classList.remove("hidden");
        }

        if (letterSection) {
            letterSection.classList.remove("hidden");
        }

        launchConfetti();

        surpriseBtn.textContent =
            "Your Birthday Wishes Are Opened 💌";

        surpriseBtn.disabled = true;
    });
}

// ===================================
// NEXT BIRTHDAY WISH
// ===================================

if (nextWishBtn) {

    nextWishBtn.addEventListener("click", () => {

        showSection(finalCard);

        launchConfetti();
        launchFireworks();

        nextWishBtn.textContent =
            "A Prayer Just for You 🌸";

        nextWishBtn.disabled = true;
    });
}

// ===================================
// READ WISHES AGAIN
// ===================================

if (againBtn) {

    againBtn.addEventListener("click", () => {

        if (finalCard) {
            finalCard.classList.add("hidden");
        }

        if (messageCard) {

            messageCard.classList.remove("hidden");

            messageCard.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "center"
            });
        }

        launchConfetti();
    });
}

// ===================================
// SECRET LETTER
// ===================================

const envelopeBtn = $("envelopeBtn");
const secretLetter = $("secretLetter");

if (envelopeBtn && secretLetter) {

    envelopeBtn.addEventListener("click", () => {

        secretLetter.classList.toggle("hidden");

        if (secretLetter.classList.contains("hidden")) {

            envelopeBtn.innerHTML =
                '<span class="envelope-icon">💌</span><span>Tap to open your letter</span><span class="envelope-sparkle">✦</span>';

        } else {

            envelopeBtn.innerHTML =
                '<span class="envelope-icon">🕊️</span><span>Your letter is open!</span>';

            launchConfetti();

            setTimeout(() => {

                secretLetter.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "center"
                });

            }, 100);
        }
    });
}


// ===================================
// SMART PHOTO GALLERY
// JPG, JPEG, PNG, WEBP
// ===================================

const lightbox = $("lightbox");
const lightboxImage = $("lightboxImage");
const lightboxClose = $("lightboxClose");

const photoCards = document.querySelectorAll(".photo-card");

const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "webp"
];

photoCards.forEach((card, index) => {

    const placeholder =
        card.querySelector(".photo-placeholder");

    const customPath = card.dataset.photo;

    const imageBase = customPath
        ? customPath.replace(/\.(jpg|jpeg|png|webp)$/i, "")
        : `./images/photo${index + 1}`;

    let loadedImagePath = null;

    function findPhoto(extensionIndex = 0) {

        if (extensionIndex >= imageExtensions.length) {

            if (placeholder) {

                placeholder.innerHTML = `
                    <span>📸</span>
                    <small>PHOTO NOT FOUND</small>
                `;
            }

            console.error("Photo not found:", imageBase);

            return;
        }

        const extension = imageExtensions[extensionIndex];

        const imagePath = `${imageBase}.${extension}`;

        const image = new Image();

        image.onload = () => {

            loadedImagePath = imagePath;

            if (placeholder) {

                placeholder.innerHTML = "";

                const img = document.createElement("img");

                img.src = imagePath;
                img.alt = `Birthday memory ${index + 1}`;
                img.loading = "lazy";

                img.style.width = "100%";
                img.style.height = "190px";
                img.style.objectFit = "cover";
                img.style.display = "block";

                placeholder.appendChild(img);
            }

            console.log("Photo loaded:", imagePath);
        };

        image.onerror = () => {
            findPhoto(extensionIndex + 1);
        };

        image.src = imagePath;
    }

    findPhoto();

    // OPEN LIGHTBOX

    card.addEventListener("click", () => {

        if (!loadedImagePath) {

            alert(
                "Photo not found! Please check the filename and images folder. ❤️"
            );

            return;
        }

        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = loadedImagePath;

        lightbox.classList.remove("hidden");

        document.body.style.overflow = "hidden";
    });
});

// ===================================
// CLOSE LIGHTBOX
// ===================================

function closeLightbox() {

    if (!lightbox || !lightboxImage) return;

    lightbox.classList.add("hidden");

    lightboxImage.src = "";

    document.body.style.overflow = "";
}

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );
}

if (lightbox) {

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeLightbox();
    }
});

// ===================================
// BACKGROUND MUSIC
// MP3, MPEG, OGG, WAV, M4A
// ===================================

const birthdayMusic = $("birthdayMusic");
const musicBtn = $("musicBtn");
const musicIcon = $("musicIcon");
const musicLabel = $("musicLabel");

let currentMusicIndex = 0;
let musicSources = [];

if (birthdayMusic && musicBtn) {

    // Read all audio sources from HTML

    musicSources = Array.from(
        birthdayMusic.querySelectorAll("source")
    ).map(source => source.src);

    // Update player appearance

    function updateMusicButton(playing) {

        musicPlaying = playing;

        musicBtn.classList.toggle("playing", playing);

        if (musicIcon) {
            musicIcon.textContent = playing ? "♫" : "♫";
        }

        if (musicLabel) {
            musicLabel.textContent =
                playing ? "Pause Music" : "Play Music";
        }
    }

    // Try each available audio file

    async function playMusicFrom(index) {

        if (index >= musicSources.length) {

            updateMusicButton(false);

            alert(
                "Music file nahi mili! Please check your actual song filename and folder. ❤️"
            );

            console.error(
                "All music files failed to load:",
                musicSources
            );

            return;
        }

        currentMusicIndex = index;

        const musicPath = musicSources[index];

        birthdayMusic.pause();

        birthdayMusic.src = musicPath;

        birthdayMusic.load();

        try {

            await birthdayMusic.play();

            updateMusicButton(true);

            console.log("Music playing:", musicPath);

        } catch (error) {

            console.error(
                "Music failed:",
                musicPath,
                error
            );

            // Try next audio format

            playMusicFrom(index + 1);
        }
    }

    // MUSIC BUTTON CLICK

    musicBtn.addEventListener("click", async () => {

        if (musicPlaying && !birthdayMusic.paused) {

            birthdayMusic.pause();

            updateMusicButton(false);

            return;
        }

        if (musicSources.length === 0) {

            alert(
                "HTML mein music source nahi mila. Please audio source add karo."
            );

            return;
        }

        // Start from first file when starting again

        await playMusicFrom(0);
    });

    // MUSIC EVENTS

    birthdayMusic.addEventListener("play", () => {
        updateMusicButton(true);
    });

    birthdayMusic.addEventListener("pause", () => {
        updateMusicButton(false);
    });

    birthdayMusic.addEventListener("ended", () => {
        updateMusicButton(false);
    });

    birthdayMusic.addEventListener("error", () => {
        console.error(
            "Audio loading error:",
            birthdayMusic.currentSrc
        );
    });
}

// ===================================
// PAGE READY
// ===================================

console.log("🎉 Shahina's Birthday Website Ready!");
