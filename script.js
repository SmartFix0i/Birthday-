const surpriseBtn = document.getElementById("surpriseBtn");
const messageCard = document.getElementById("messageCard");
const loveBtn = document.getElementById("loveBtn");
const finalCard = document.getElementById("finalCard");
const againBtn = document.getElementById("againBtn");

const heartsContainer = document.getElementById("hearts-container");

const heartEmojis = ["❤️", "💗", "💕", "💖", "💘", "💝", "🫶🏻"];

// Floating hearts
function createHeart() {
    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.textContent =
        heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 25) + "px";

    const duration = 5 + Math.random() * 5;
    heart.style.animationDuration = duration + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Keep hearts floating
setInterval(createHeart, 450);


// Confetti celebration
function launchConfetti() {
    const colors = [
        "#ff4fa7",
        "#ffd166",
        "#c084fc",
        "#ffffff",
        "#ff8fab",
        "#80ffdb"
    ];

    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.borderRadius =
            Math.random() > 0.5 ? "50%" : "2px";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 6000);
    }
}


// First surprise
surpriseBtn.addEventListener("click", () => {
    messageCard.classList.remove("hidden");

    launchConfetti();

    messageCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    surpriseBtn.textContent = "Your Birthday Letter Is Opened 💌";
    surpriseBtn.disabled = true;
    surpriseBtn.style.opacity = "0.6";
});


// Second surprise
loveBtn.addEventListener("click", () => {
    finalCard.classList.remove("hidden");

    launchConfetti();

    finalCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    loveBtn.textContent = "Surprise Opened ❤️";
    loveBtn.disabled = true;
});


// Read the wishes again
againBtn.addEventListener("click", () => {
    messageCard.classList.remove("hidden");
    finalCard.classList.add("hidden");

    messageCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    launchConfetti();
});
