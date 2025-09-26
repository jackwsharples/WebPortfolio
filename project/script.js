// Project data
const projectData = {
    'project-1': {
    title: 'project1',
    // New: optional array. If missing, code will fall back to `image`
    images: ['Images/project1.png', 'Images/project1a.png'],
    image: 'Images/project1.png',
    description: 'Testing thing.',
    details: 'Extra info'
    },
    'project-2': {
        title: 'project2',
        images: ['Images/project2.png', 'Images/project2a.png'],
        image: '/Images/project2.png',
        description: 'Desc',
        details: 'Extra info'
    },
    'project-3': {
        title: 'project3',
        images: ['Images/project3.png', 'Images/project3a.png', 'Images/project3b.png',  'Images/project3c.png',  'Images/project3d.png'],
        image: '/Images/project3.png',
        description: 'Desc',
        details: 'Extra info'
    },
    'project-4': {
        title: 'project4',
        images: ['Images/project4.png', 'Images/project4a.png', 'Images/project4b.png',  'Images/project4c.png',  'Images/project4d.png',  'Images/project4e.png'],
        images: ['Images/project4.png', 'Images/project4a.png', 'Images/project4b.png'],
        image: '/Images/project4.png',
        description: 'Desc',
        details:'Extra info'
    },
    'project-5': {
        title: 'project5',
        images: ['Images/project5.png', 'Images/project5a.png', 'Images/project5b.png',  'Images/project5c.png'],
        image: '/Images/project5.png',
        description: 'Desc.',
        details: 'Extra info'
    },
    'project-6': {
        title: 'project6',
        images: ['Images/project6.png', 'Images/project6a.png', 'Images/project6b.png'],
        image: '/Images/project6.png',
        description: 'Desc.',
        details: 'Extra info'
    }
};

// ===== Modal & Gallery =====
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectItems = document.querySelectorAll('.project-item');

const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalDetails = document.querySelector('.modal-details');

const galleryViewport = document.querySelector('.gallery-viewport');
const galleryTrack = document.querySelector('.gallery-track');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const counterCurrent = document.querySelector('.gallery-counter .current');
const counterTotal = document.querySelector('.gallery-counter .total');

let currentIndex = 0;
let currentImages = [];

function openModalFor(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  // Title/Text
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDetails.innerHTML = project.details;

  // Images (fallback to single `image` if `images` missing)
  currentImages = Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : (project.image ? [project.image] : []);

  // Build slides
  galleryTrack.innerHTML = '';
  currentImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = project.title;
    img.className = 'gallery-slide';
    galleryTrack.appendChild(img);
  });

  // Reset state
  currentIndex = 0;
  counterTotal.textContent = String(currentImages.length);
  updateGallery();

  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function updateGallery() {
  const slideWidth = galleryViewport.clientWidth;
  galleryTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  counterCurrent.textContent = String(currentIndex + 1);

  // Button states
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === currentImages.length - 1;
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

projectItems.forEach(item => {
  item.addEventListener('click', () => {
    const key = item.getAttribute('data-project');
    openModalFor(key);
  });
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight' && currentIndex < currentImages.length - 1) { currentIndex++; updateGallery(); }
    if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateGallery(); }
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) { currentIndex--; updateGallery(); }
});
nextBtn.addEventListener('click', () => {
  if (currentIndex < currentImages.length - 1) { currentIndex++; updateGallery(); }
});

// Handle resize so slides stay aligned
window.addEventListener('resize', () => {
  if (modal.style.display === 'block') updateGallery();
});

// Optional: allow wheel or trackpad horizontal scroll in the gallery
galleryViewport.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
    if (e.deltaX > 0 && currentIndex < currentImages.length - 1) { currentIndex++; updateGallery(); }
    if (e.deltaX < 0 && currentIndex > 0) { currentIndex--; updateGallery(); }
  }
}, { passive: false });
