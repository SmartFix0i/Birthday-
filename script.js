const surpriseBtn = document.getElementById("surpriseBtn");
const messageCard = document.getElementById("messageCard");
const nextWishBtn = document.getElementById("loveBtn");
const finalCard = document.getElementById("finalCard");
const againBtn = document.getElementById("againBtn");
const heartsContainer = document.getElementById("hearts-container");

const flowerEmojis = ["🌸", "💗", "🌷", "✨", "💕", "🌼", "🎀"];

function createFloatingFlower() {
    const flower = document.createElement("div");
    flower.className = "heart";
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = (15 + Math.random() * 22) + "px";

    const duration = 6 + Math.random() * 4;
    flower.style.animationDuration = duration + "s";
    heartsContainer.appendChild(flower);

    setTimeout(() => flower.remove(), duration * 1000);
}

const flowerInterval = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? null
    : setInterval(createFloatingFlower, 650);

function launchConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const colors = ["#ff8fbd", "#ffd6e7", "#c7a5ff", "#ffffff", "#f7c96b"];

    for (let i = 0; i < 85; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";
        piece.style.animationDelay = Math.random() * 0.8 + "s";
        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 5500);
    }
}

surpriseBtn.addEventListener("click", () => {
    messageCard.classList.remove("hidden");
    launchConfetti();
    messageCard.scrollIntoView({ behavior: "smooth", block: "center" });
    surpriseBtn.textContent = "Your Birthday Wishes Are Opened 💌";
    surpriseBtn.disabled = true;
    surpriseBtn.style.opacity = "0.65";
});

nextWishBtn.addEventListener("click", () => {
    finalCard.classList.remove("hidden");
    launchConfetti();
    finalCard.scrollIntoView({ behavior: "smooth", block: "center" });
    nextWishBtn.textContent = "A Prayer Just for You 🌸";
    nextWishBtn.disabled = true;
    nextWishBtn.style.opacity = "0.65";
});

againBtn.addEventListener("click", () => {
    finalCard.classList.add("hidden");
    messageCard.classList.remove("hidden");
    messageCard.scrollIntoView({ behavior: "smooth", block: "center" });
    launchConfetti();
});
