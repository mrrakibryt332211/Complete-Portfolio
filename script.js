const textAnimation = document.querySelector('.text-animation span');
const phrases = ["Web Developer ", "Software Developer ", "Web Designer ", "UI / UX Designer "];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenPhrases = 2000;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textAnimation.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        textAnimation.textContent = currentPhrase.substring(0, charIndex++);
    }
    let timeout = isDeleting ? erasingSpeed : typingSpeed;
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        timeout = delayBetweenPhrases;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeText, timeout);
}

typeText();

// Smooth scrolling logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Scroll duration in milliseconds
            let startTime = null;

            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});
