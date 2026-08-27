// Get all slides and dots
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const sliderEl = document.querySelector(".slider");

let index = 0;
let slideTimer;

// Display the selected slide
function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

function goToSlide(i) {
    index = (i + slides.length) % slides.length;
    showSlide(index);
    resetAutoSlide();
}

function nextSlide() {
    goToSlide(index + 1);
}

function prevSlide() {
    goToSlide(index - 1);
}

function resetAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 3000);
}

// Auto-play
resetAutoSlide();

// Click on dots
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        goToSlide(i);
    });
});

// Click on arrows
if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
}

// Click on the slider image itself: left half = previous, right half = next
if (sliderEl) {
    sliderEl.addEventListener("click", (e) => {
        if (e.target.closest(".slider-arrow, .dots, .overlay")) return;

        const rect = sliderEl.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX < rect.width / 2) {
            prevSlide();
        } else {
            nextSlide();
        }
    });
}

// Swipe support (mobile)
if (sliderEl) {

    let touchStartX = 0;
    let touchEndX = 0;

    sliderEl.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderEl.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 40;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < swipeThreshold) return;

        if (diff > 0) {
            nextSlide(); // swiped left → next
        } else {
            prevSlide(); // swiped right → previous
        }
    }

}

// ===== PROGRAM HIGHLIGHTS =====

const highlightSlides = document.querySelector(".highlight-slides");

if (highlightSlides) {

    const highlightDots = document.querySelectorAll(".highlight-dot");

    let highlightIndex = 0;

    function showHighlightSlide(index){

        highlightSlides.style.transform = `translateX(-${index * 100}%)`;

        highlightDots.forEach(dot=>{
            dot.classList.remove("active");
        });

        highlightDots[index].classList.add("active");
    }

    setInterval(()=>{

        highlightIndex++;

        if(highlightIndex >= highlightDots.length){
            highlightIndex = 0;
        }

        showHighlightSlide(highlightIndex);

    },3000);

    highlightDots.forEach((dot,i)=>{

        dot.addEventListener("click",()=>{

            highlightIndex = i;

            showHighlightSlide(highlightIndex);

        });

    });

}

document.addEventListener("DOMContentLoaded", function () {

    const phoneInput = document.querySelector("#phone");

    if (phoneInput) {

        const iti = window.intlTelInput(phoneInput, {

            initialCountry: "my",

            countrySelectorMode: "DROPDOWN",

            separateDialCode: true,

            showFlags: true,

            countrySearch: true,

            formatAsYouType: true,

            loadUtils: () =>
                import(
                    "https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.5/build/js/utils.js"
                )

        });

        // Make the phone input accessible globally if needed
        window.phoneInputInstance = iti;

    }

});

/* =========================================================
   MOBILE HAMBURGER MENU
========================================================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

}

/* CLOSE MENU AFTER CLICKING A LINK */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

    });

});

/* =========================================================
   SCROLL REVEAL ANIMATION (auto-applies across all pages)
========================================================= */

const revealSelectors = [
    "section",
    "footer",
    ".slider",
    ".service-card",
    ".news-card",
    ".event-card",
    ".social-card",
    ".about-vm-card",
    ".about-value-card",
    ".market-item",
    ".why-ferum-card",
    ".glass-card",
    ".about-story-image",
    ".about-story-content",
    ".thank-you-box"
];

const revealElements = document.querySelectorAll(revealSelectors.join(","));

revealElements.forEach(el => el.classList.add("reveal"));

if (revealElements.length) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

}

