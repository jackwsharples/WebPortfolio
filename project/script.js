// Project data
const projectData = {
    'project-1': {
        title: 'project1',
        image: '../project/src/Images/project1.png',
        description: 'Testing thing.',
        details: 'Extra info'
    },
    'project-2': {
        title: 'project2',
        image: '../project/src/Images/project2.png',
        description: 'Desc',
        details: 'Extra info'
    },
    'project-3': {
        title: 'project3',
        image: '../project/src/Images/project3.png',
        description: 'Desc',
        details: 'Extra info'
    },
    'project-4': {
        title: 'project4',
        image: '../project/src/Images/project4.png',
        description: 'Desc',
        details:'Extra info'
    },
    'project-5': {
        title: 'project5',
        image: '../project/src/Images/project5.png',
        description: 'Desc.',
        details: 'Extra info'
    },
    'project-6': {
        title: 'project6',
        image: '../project/src/Images/project6.png',
        description: 'Desc.',
        details: 'Extra info'
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectItems = document.querySelectorAll('.project-item');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalDetails = document.querySelector('.modal-details');

// Open modal when project is clicked
projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectKey = item.getAttribute('data-project');
        const project = projectData[projectKey];
        
        if (project) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalDetails.innerHTML = project.details;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {''
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Smooth scrolling for any internal links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Fade-in animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .project-item, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Add some subtle parallax effect to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    const rate = scrolled * -0.5;
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});