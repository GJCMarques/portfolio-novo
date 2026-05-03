document.addEventListener("DOMContentLoaded", () => {
    const words = [
        "Web Developer",
        "Full-Stack Engineer",
        "Criador Multimédia",
        "Frontend Developer",
        "Backend Developer",
        "Web Apps Creator",
        "UI/UX Designer",
        "Junior Dev",
        "Web Designer",
        "FinTech",
        "Marketing"
    ];
    let currentIndex = 0;
    const container = document.getElementById("scrambling-text");

    if (!container) return;

    // Helper to split text into spans
    function splitText(text) {
        container.innerHTML = "";
        const spans = [];
        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            span.style.transition = "transform 0.6s cubic-bezier(0.8, 0, 0.2, 1), opacity 0.6s ease";
            container.appendChild(span);
            spans.push(span);
        });
        return spans;
    }

    // Helper to shuffle array randomly
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    async function swapText() {
        // 1. Get current spans
        const oldSpans = Array.from(container.children);
        const oldIndices = shuffle(oldSpans.map((_, i) => i));

        // 2. Animate out randomly
        oldIndices.forEach((idx, i) => {
            const span = oldSpans[idx];
            const direction = Math.random() > 0.5 ? 100 : -100;
            span.style.transitionDelay = `${i * 0.02}s`;
            span.style.transform = `translateY(${direction}%)`;
            span.style.opacity = "0";
        });

        // Wait for out animation to finish (max delay + transition time)
        await new Promise(resolve => setTimeout(resolve, (oldIndices.length * 20) + 600));

        // 3. Update text to next word
        currentIndex = (currentIndex + 1) % words.length;
        const newSpans = splitText(words[currentIndex]);

        // 4. Set initial hidden state for new spans
        newSpans.forEach(span => {
            const direction = Math.random() > 0.5 ? 100 : -100;
            span.style.transition = "none";
            span.style.transform = `translateY(${direction}%)`;
            span.style.opacity = "0";
        });

        // Force browser reflow
        container.offsetHeight;

        // 5. Animate new letters in randomly
        const newIndices = shuffle(newSpans.map((_, i) => i));
        newIndices.forEach((idx, i) => {
            const span = newSpans[idx];
            span.style.transition = "transform 0.6s cubic-bezier(0.8, 0, 0.2, 1), opacity 0.6s ease";
            span.style.transitionDelay = `${i * 0.02}s`;
            span.style.transform = "translateY(0)";
            span.style.opacity = "1";
        });
    }

    // Init state and start the loop
    splitText(words[currentIndex]);
    setInterval(swapText, 3500); // Trigger every 3.5s
});
