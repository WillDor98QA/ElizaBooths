document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('cta-button');

    ctaButton.addEventListener('click', () => {
        // Example interaction - you can customize this
        window.open('Elizabooths brochure_20241211_040021_0000.pdf', '_blank');
    });

    // Image Carousel
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        
        // Move the carousel by translating the container
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Automatic image scrolling every second
    setInterval(nextImage, 3000);

    // Optional: Add subtle animation to features
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