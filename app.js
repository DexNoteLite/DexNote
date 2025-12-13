// Prevent browser scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {

    // Page load animation
    setTimeout(() => {
        document.body.classList.remove("page-load");
        document.body.classList.add("page-loaded");
    }, 100);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        },
        { threshold: 0.2 }
    );

    // Auto-stagger ONLY for hero cards
    const cards = document.querySelectorAll(".hero-card-content-cards.fade");
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
    });

    // Observe all other fade elements normally
    document.querySelectorAll(".fade:not(.hero-card-content-cards)").forEach(el => {
        observer.observe(el);
    });
});
