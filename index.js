window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const intersectionCallback = (entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    }
}

const observer = new IntersectionObserver(intersectionCallback);

const items = document.querySelectorAll(
    '.event-speaker-title, ' +
    '.event-speaker-subtitle, ' +
    '.event-speaker-info, ' +
    '.event-speaker-logo-block, ' +
    '.event-speaker-details, ' +
    '.event-speaker-name, ' +
    '.event-speaker-description, ' +
    '.event-profile-date, ' +
    '.event-profile-subtitle, ' +
    '.event-profile-title, ' +
    '.event-progress-line, ' +
    '.event-profile-text a, ' +
    '.event-profile-picture, ' +
    '.event-about-text a, ' +
    '.event-about-picture, ' +
    '.experience-block, ' +
    '.event-sponsors-title, ' +
    '.event-sponsors-subtitle, ' +
    '.event-sponsors-content, ' +
    '.event-rundown-title, ' +
    '.fa-clock'
);
for (const item of items) {
    observer.observe(item);
}

const typingSpeed = 100;
const pauseDuration = 3000;
const fadeDuration = 1000;

function typeText(element, text, callback) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            callback();
        }
    }, typingSpeed);
}

function typeTextBackward(element, text, callback) {
    let index = text.length;
    const interval = setInterval(() => {
        if (index > 0) {
            element.textContent = text.substring(0, index - 1);
            index--;
        } else {
            clearInterval(interval);
            callback();
        }
    }, typingSpeed);
}

function fadeOutText(element, callback) {
    element.classList.add('fade-out');
    setTimeout(() => {
        element.classList.remove('fade-out');
        element.textContent = '';
        callback();
    }, fadeDuration);
}

function startAnimation() {
    const nameElement = document.getElementById('name');
    const roleElement = document.getElementById('role');

    typeText(nameElement, 'Kelompok 8', () => {
        setTimeout(() => {
            typeTextBackward(nameElement, 'Kelompok 8', () => {
                typeText(roleElement, 'Calon Aktivis', () => {
                    setTimeout(() => {
                        typeTextBackward(roleElement, 'Calon Aktivis', startAnimation);
                    }, pauseDuration);
                });
            });
        }, pauseDuration);
    });
}

window.onload = startAnimation;

const sectionMap = {
    'introduction': '#introduction', 
    'event': '#event',               
    'sponsor': '#sponsor',           
    'rundown': '#rundown',           
    'speaker': '#speaker'            
};

document.querySelectorAll('nav.action-button a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href'); // Get the target section from the href attribute
        const targetSection = document.querySelector(targetId); // Get the corresponding section
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the section
        }
    });
});

// Auto-scroll through each main section
const sections = ['introduction', 'event', 'sponsor', 'rundown', 'speaker'];
let currentIndex = 0; // Start at the first section

function scrollToNextSection() {
    const currentSectionId = sections[currentIndex];
    const currentSection = document.getElementById(currentSectionId);
    if (currentSection) {
        currentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    currentIndex = (currentIndex + 1) % sections.length; // Loop back to the start
}


const pageDirector = document.querySelector('.page-director'); // Ensure this is defined

pageDirector.addEventListener('click', () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
});