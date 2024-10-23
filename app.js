// Hamburger Menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.header__menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active link highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header__menu li a');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active-link');
                }
            });
        }
    });
});
