// Floristería Flora - Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const dotsNav = document.getElementById('carouselDots');
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel__dot');
    if (index === 0) dot.classList.add('is-active');
    dot.setAttribute('aria-label', `Ir al slide ${index + 1}`);
    dotsNav.appendChild(dot);
  });
  
  const dots = Array.from(dotsNav.children);
  let currentSlide = 0;
  
  const updateCarousel = () => {
    // Move track
    track.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
    
    // Update slides active state
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });
  };
  
  const moveToSlide = (targetIndex) => {
    currentSlide = targetIndex;
    updateCarousel();
  };
  
  nextBtn.addEventListener('click', () => {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateCarousel();
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentSlide === 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    updateCarousel();
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      moveToSlide(index);
    });
  });
  
  // WhatsApp button
  const whatsappBtn = document.getElementById('whatsappBtn');
  const phoneNumber = '34928807443';
  const message = encodeURIComponent('¡Hola! Me gustaría encargar un ramo de Floristería Flora. ¿Podrían asesorarme sobre disponibilidad y precios?');
  whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
  
  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const carouselEl = document.getElementById('carousel');
  
  carouselEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carouselEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next
      nextBtn.click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous
      prevBtn.click();
    }
  }
});
