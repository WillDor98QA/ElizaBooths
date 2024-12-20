document.addEventListener('DOMContentLoaded', () => {
  // Existing PDF button code
  document.getElementById('pdfButton').addEventListener('click', function() {
      window.location.href = 'Elizabooths brochure_20241211_040021_0000.pdf';
  });

  // Image Carousel
  const carouselContainer = document.querySelector('.carousel-container');
    
    function moveFirstImageToEnd() {
        const firstImage = carouselContainer.firstElementChild;
        carouselContainer.style.transition = 'none'; // Disable transition for the reset
        carouselContainer.style.transform = 'translateX(0)'; // Reset position
        carouselContainer.appendChild(firstImage); // Move first image to end
    }

    function scrollCarousel() {
        carouselContainer.style.transition = 'transform 1s ease'; // Smoother, longer transition
        carouselContainer.style.transform = 'translateX(-12.5%)'; // Move one image width
        
        // Wait for transition to complete before resetting
        setTimeout(() => {
            moveFirstImageToEnd();
        }, 1000); // This should match the transition duration
    }

    // Start the automatic scrolling
    setInterval(scrollCarousel, 3000);

  // Your existing features animation code
  const features = document.querySelectorAll('.feature');
  features.forEach((feature, index) => {
      feature.style.opacity = '0';
      feature.style.transform = 'translateY(20px)';

      setTimeout(() => {
          feature.style.transition = 'all 0.6s ease';
          feature.style.opacity = '1';
          feature.style.transform = 'translateY(0)';
      }, index * 300);
  });
});