document.addEventListener('DOMContentLoaded', () => {
  // Existing PDF button code
  document.getElementById('pdfButton').addEventListener('click', function() {
      window.location.href = 'Elizabooths brochure _20241226_093434_0000.pdf';
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

// Form handling
const bookingForm = document.getElementById('bookingForm');
const toast = document.getElementById('toast');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('span');
    const spinner = submitButton.querySelector('.spinner');
    
    buttonText.classList.add('hidden');
    spinner.classList.remove('hidden');
    submitButton.disabled = true;

    // Collect form data
    const formData = new FormData(bookingForm);
    const bookingData = Object.fromEntries(formData.entries());

    try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showToast('Booking submitted successfully! We will contact you shortly.', 'success');
        bookingForm.reset();
    } catch (error) {
        showToast('There was an error submitting your booking. Please try again.', 'error');
    } finally {
        // Reset button state
        buttonText.classList.remove('hidden');
        spinner.classList.add('hidden');
        submitButton.disabled = false;
    }
});
// Date input validation
const dateInput = document.querySelector('input[type="date"]');

dateInput.addEventListener('change', (e) => {
  const selectedDate = new Date(e.target.value);
  const dayOfWeek = selectedDate.getDay();
  
  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    alert('Please select only Saturday or Sunday');
    e.target.value = ''; // Clear invalid selection
  }
});

// Time input validation
const timeInput = bookingForm.querySelector('input[name="time"]');
timeInput.addEventListener('change', (e) => {
    const time = e.target.value;
    const [hours, minutes] = time.split(':').map(Number);
    
    // Validate business hours (7 AM - 7 PM)
    if (hours < 7 || hours >= 19) {
        showToast('Please select a time between 7:00 AM and 7:00 PM', 'error');
        e.target.value = '';
    }
});