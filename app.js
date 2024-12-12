// Hamburger Menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.header__menu');
const menuLinks = document.querySelectorAll('.header__menu li a');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Sluit het menu automatisch als een link wordt aangeklikt
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active'); // Verwijder de 'active' klasse van het menu
        hamburger.classList.remove('active'); // Verwijder de 'active' klasse van de hamburger
    });
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

// Event listener voor formulier verzenden
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Voorkomt dat de pagina opnieuw laadt

    // Verzamelt alle formuliervelden
    const formData = new FormData(this);

    // Verzend het formulier via fetch
    fetch('./contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Verwacht een JSON-object van de server
    .then(data => {
        console.log(data);
        if (data.success) {
            showPopup(); // Toon de pop-up als de verzending succesvol is
            setTimeout(() => {
                closePopup(); // Sluit de pop-up na 3 seconden
            }, 3000);
        } else {
            alert('Er is iets misgegaan, probeer het opnieuw: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Fout tijdens het verwerken van de respons:', error);
        alert('Er is een fout opgetreden. Controleer je verbinding en probeer het opnieuw.');
    });
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
