// Configuration - Update these with your content
const CONFIG = {
  // YouTube Video ID (extract from URL: https://www.youtube.com/watch?v=VIDEO_ID)
  youtubeVideoId: 'nOv_4dL7TIY'
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initYouTubeVideo();
  initCarousel();
  initScrollAnimations();
  initSmoothScroll();
});

// Navigation scroll effect
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
}

// YouTube Video Autoplay
function initYouTubeVideo() {
  const container = document.getElementById('youtubeContainer');
  
  if (!CONFIG.youtubeVideoId) {
    console.log('Please add your YouTube video ID in script.js');
    return;
  }

  // Remove placeholder
  const placeholder = container.querySelector('.youtube-placeholder');
  if (placeholder) {
    placeholder.remove();
  }

  // Create iframe with autoplay
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${CONFIG.youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${CONFIG.youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;
  iframe.allow = 'autoplay; encrypted-media';
  iframe.allowFullscreen = true;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.border = 'none';
  
  // Add overlay for better text readability
  container.appendChild(iframe);
  
  // Ensure video plays on mobile
  iframe.addEventListener('load', () => {
    try {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    } catch (e) {
      console.log('Autoplay may be blocked by browser');
    }
  });
}

// Image Carousel - Shows 5 images at a time, infinite loop
function initCarousel() {
  const carouselContainer = document.getElementById('carouselContainer');
  if (!carouselContainer) return;

  const imageCount = 6; // Original number of images
  const imagesToShow = 5; // Show 5 images at once
  // Container is 240% wide (12 images * 20% each)
  // To move one image (20% of visible), we need to move by 20/240 = 8.333% of container
  const moveAmount = (100 / (imageCount * 2)) * imagesToShow / imagesToShow; // 8.333% per image
  const moveOneImage = 100 / (imageCount * 2); // 8.333% - move by one image width
  
  let currentPosition = 0;
  
  // Start at position 0 (showing first 5 images)
  carouselContainer.style.transform = 'translateX(0)';

  function scrollCarousel() {
    currentPosition += moveOneImage;
    
    // When we've moved through all 6 original images (6 * 8.333% = 50% of container)
    // Reset to 0 seamlessly (the duplicated images make it look continuous)
    if (currentPosition >= imageCount * moveOneImage) {
      carouselContainer.style.transition = 'none';
      carouselContainer.style.transform = 'translateX(0)';
      currentPosition = 0;
      // Force reflow to ensure transition reset
      void carouselContainer.offsetWidth;
      carouselContainer.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      carouselContainer.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    carouselContainer.style.transform = `translateX(-${currentPosition}%)`;
  }

  // Start scrolling after initial delay, then every 3 seconds
  setTimeout(() => {
    scrollCarousel();
    setInterval(scrollCarousel, 3000);
  }, 2000);
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animate sections
  const sections = document.querySelectorAll('section:not(.hero-section)');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Animate brochure section
  const brochureSection = document.querySelector('.brochure-section');
  if (brochureSection) {
    brochureSection.style.opacity = '0';
    brochureSection.style.transform = 'translateY(30px)';
    brochureSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(brochureSection);
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Handle YouTube API for better control (optional)
function onYouTubeIframeAPIReady() {
  // This function can be used if you include the YouTube IFrame API
  // For now, the basic embed works fine
}

// Utility: Extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}

// If user provides full YouTube URL instead of ID
if (CONFIG.youtubeVideoId && (CONFIG.youtubeVideoId.includes('youtube.com') || CONFIG.youtubeVideoId.includes('youtu.be'))) {
  CONFIG.youtubeVideoId = extractYouTubeId(CONFIG.youtubeVideoId);
}
