// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Schedule tabs
const tabButtons = document.querySelectorAll('.tab-button');
const scheduleDays = document.querySelectorAll('.schedule-day');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and days
        tabButtons.forEach(btn => btn.classList.remove('active'));
        scheduleDays.forEach(day => day.classList.remove('active'));
        
        // Add active class to clicked button and corresponding day
        button.classList.add('active');
        const dayNumber = button.getAttribute('data-day');
        document.getElementById(`day${dayNumber}`).classList.add('active');
    });
});

// Live schedule updates
function updateScheduleStatus() {
    const now = new Date();
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    scheduleItems.forEach(item => {
        const timeElement = item.querySelector('.time');
        const time = timeElement.textContent;
        const [hours, minutes] = time.split(':');
        const [hour, period] = hours.split(' ');
        
        // Convert to 24-hour format
        let hour24 = parseInt(hour);
        if (period === 'PM' && hour24 !== 12) hour24 += 12;
        if (period === 'AM' && hour24 === 12) hour24 = 0;
        
        // Create date object for the schedule time
        const scheduleTime = new Date();
        scheduleTime.setHours(hour24, parseInt(minutes), 0);
        
        // Add status classes
        if (now > scheduleTime) {
            item.classList.add('completed');
        } else if (now >= new Date(scheduleTime.getTime() - 30 * 60000) && now <= scheduleTime) {
            item.classList.add('current');
        } else {
            item.classList.add('upcoming');
        }
    });
}

// Update schedule status every minute
setInterval(updateScheduleStatus, 60000);
updateScheduleStatus(); // Initial update

// Convert times to local timezone
function convertToLocalTime() {
    const timeElements = document.querySelectorAll('.schedule-item .time');
    timeElements.forEach(timeEl => {
        const time = timeEl.textContent;
        const date = new Date(`2025-10-20 ${time}`);
        timeEl.textContent = date.toLocaleTimeString('en-MY', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kuching'
        });
    });
}

// Call time conversion on page load
document.addEventListener('DOMContentLoaded', convertToLocalTime);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling with Malaysian format
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message with Malaysian format
    alert('Terima kasih! Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Ticket booking handling with local currency
document.querySelectorAll('.book-button, .book-hotel-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // The href attribute already contains the correct payment URL with parameters
        // No need to prevent default - let the link work naturally
        const href = button.getAttribute('href');
        if (href && href.startsWith('payment.html')) {
            // If it's a group booking, show a modal or contact form instead
            if (href.includes('Group+Pass')) {
                e.preventDefault();
                alert('For group bookings of 5 or more attendees, please contact us at support@jasasarawak.com or call +60 82 392 888');
                return;
            }
            // Otherwise, let the default link behavior work
            // This will redirect to the payment page with the correct parameters
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
}); 