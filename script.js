let lastPlayed = 0;

const playSoundHover = () => {
    const sound = document.getElementById("hover-sound");
    const now = Date.now();
    if (now - lastPlayed < 1000) return;
    sound.currentTime = 0;

    sound.play();
    lastPlayed = now;
}

const choiceBtns = document.querySelectorAll(".choice-btn");

choiceBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", playSoundHover);
})