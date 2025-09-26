// Project data
const projectData = {
    'project-1': {
    title: 'Visual Literacy 2',
    // New: optional array. If missing, code will fall back to `image`
    images: ['Images/project1.png', 'Images/project1a.png'],
    image: 'Images/project1.png',
    description: 'This project explores the construction of three-dimensional geometric forms and how they interrelate in space. We will use positive and negative space to create a sense of path and mystery in our designs. We are to address three-dimensional geometric forms, hierarchy of elements, void, pierce, wedge, cradle, positive and negative space, viewpoints, and proportion. '
    },
    'project-2': {
        title: 'History of Interior Design II',
        images: ['Images/project2.png', 'Images/project2a.png'],
        image: '/Images/project2.png',
        description: ' We are to draw 5 relevant buildings that need to be proportionally correct. Drawings should be during the time period that we study in class. On each sheet there is one significant plan, one significant section, two elevations or a perspective, and at least one detail or furnishing that is relevant to the building or time period. Drawings can have a sketch nature or are cleanly and precisely drafted.',
        details: 'Extra info'
    },
    'project-3': {
        title: 'Novotny Cabin | Gate House',
        images: ['Images/project3.png', 'Images/project3a.png', 'Images/project3b.png',  'Images/project3c.png',  'Images/project3d.png',  'Images/project3e.png'],
        image: '/Images/project3.png',
        description: 'Students will choose a well known house to study and replicate into revit. We are to focus on elements that architects purposely incorporated into the builds and expand on what makes these houses unique and special to its surroundings.  \n\nUsing the same house from the first project, students will construct a gate house that allows visitors to experience the house from a framed view. Elements that were incorporated into the house should also be used on the gatehouse. '
    },
    'project-4': {
        title: 'Visual Literacy 1',
        images: ['Images/project4.png', 'Images/project4a.png', 'Images/project4b.png',  'Images/project4c.png',  'Images/project4d.png'],
        image: '/Images/project4.png',
        description: 'Through this project students are asked to create a composition inspired by the principles and elements of design that we identify in our context. We will photograph elements or scenes that relate to our major and identify elements we learn in class. Students are encouraged to incorporate line, space, shape, balance, contrast, emphasis, movement, proportion, and other principles of design. '
    },
    'project-5': {
        title: 'project5',
        images: ['Images/project5.png', 'Images/project5a.png', 'Images/project5b.png',  'Images/project5c.png'],
        image: '/Images/project5.png',
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
