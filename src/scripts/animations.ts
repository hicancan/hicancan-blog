export const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.remove('opacity-0', 'translate-y-8'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach((el) => observer.observe(el));
};
