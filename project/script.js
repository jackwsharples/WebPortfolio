// Project data
const projectData = {
    'project-1': {
    title: 'Visual Literacy 2',
    // New: optional array. If missing, code will fall back to `image`
    images: ['Images/project1.png', 'Images/project1a.png'],
    image: 'Images/project1.png',
    description: 'In this project I explored how three-dimensional geometric forms interact in space. I worked with positive and negative space to create a sense of path and mystery, paying attention to hierarchy, proportion, and viewpoints. By experimenting with voids, pierces, wedges, and cradles, I was able to shape a composition that felt both balanced and dynamic'
    },
    'project-2': {
        title: 'History of Interior Design II',
        images: ['Images/project2.png', 'Images/project2a.png'],
        image: '/Images/project2.png',
        description: 'For this assignment I drew five historically significant buildings, making sure each one was proportionally correct and true to its time period. Each sheet included a plan, a section, perspectives or elevations, and details or furnishings that highlighted the architecture’s character. I enjoyed balancing precision with sketch qualities to capture both accuracy and expression.'
    },
    'project-3': {
        title: 'Novotny Cabin | Gate House',
        images: ['Images/project3.png', 'Images/project3a.png', 'Images/project3b.png',  'Images/project3c.png',  'Images/project3d.png',  'Images/project3e.png'],
        image: '/Images/project3.png',
        description: 'I studied the Novotny Cabin, recreating it in Revit to better understand the architectural choices that made it unique in its setting. Then I designed a gatehouse that framed the original house, using similar stylistic elements so the two spoke the same design language. This process gave me a new appreciation for how architects create continuity between buildings while also shaping visitor experience.'
    },
    'project-4': {
        title: 'Visual Literacy 1',
        images: ['Images/project4.png', 'Images/project4a.png', 'Images/project4b.png',  'Images/project4c.png',  'Images/project4d.png'],
        image: '/Images/project4.png',
        description: 'Here I created a composition inspired by the design principles and elements I observed in my surroundings. I photographed scenes that resonated with my major, then used line, space, shape, balance, and contrast to turn those observations into a thoughtful design. It was a chance to see everyday environments through the lens of proportion, emphasis, and movement.'
    },
    'project-5': {
        title: 'Studio II',
        images: ['Images/project5.png', 'Images/project5a.png', 'Images/project5b.png',  'Images/project5c.png'],
        image: '/Images/project5.png',
        description: 'For this studio my partner and I designed dorm buildings for the App State campus, drawing inspiration from the surrounding context. Together we created an InDesign poster to communicate the zoning and spatial intent, ensuring the design could accommodate a large number of students. We included amenities like a gym, lounge, study area, laundry, and mail room, focusing on how these shared spaces could strengthen community life.'
    }
};

// ===== Modal & Gallery =====
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectItems = document.querySelectorAll('.project-item');

const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');

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
  modalDescription.innerHTML = project.description.replace(/\n/g, '<br>');


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
