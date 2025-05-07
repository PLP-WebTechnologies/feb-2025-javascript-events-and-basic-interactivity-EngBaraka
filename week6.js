document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ========== //
    
    // Click event
    const clickBox = document.getElementById('click-box');
    clickBox.addEventListener('click', function() {
        this.style.backgroundColor = '#bbdefb';
        this.querySelector('p').textContent = 'You clicked me!';
        
        setTimeout(() => {
            this.style.backgroundColor = '#e3f2fd';
            this.querySelector('p').textContent = 'Click me again!';
        }, 1000);
    });
    
    // Hover event is handled with CSS
    
    // Keypress event
    const keypressBox = document.getElementById('keypress-box');
    const keypressInput = keypressBox.querySelector('input');
    
    keypressInput.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.keyCode);
        keypressBox.querySelector('p').textContent = `You pressed: ${char}`;
    });
    
    // Secret actions (double click and long press)
    const secretBox = document.getElementById('secret-box');
    let pressTimer;
    
    secretBox.addEventListener('dblclick', revealSecret);
    
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(revealSecret, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function revealSecret() {
        secretBox.classList.add('secret-activated');
        secretBox.querySelector('p').textContent = 'Secret revealed! 🎉';
        
        setTimeout(() => {
            secretBox.classList.remove('secret-activated');
            secretBox.querySelector('p').textContent = 'Double click or long press me!';
        }, 2000);
    }
    
    // ========== Interactive Elements ========== //
    
    // Color changing button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#6200ea', '#009688', '#ff5722', '#e91e63', '#3f51b5'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1}`;
    });
    
    // Image gallery
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ========== //
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formMessage = document.getElementById('form-message');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        const error = nameInput.nextElementSibling;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, error, 'Name is required');
            return false;
        } else {
            showSuccess(nameInput, error);
            return true;
        }
    }
    
    function validateEmail() {
        const error = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, error, 'Email is required');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, error, 'Please enter a valid email');
            return false;
        } else {
            showSuccess(emailInput, error);
            return true;
        }
    }
    
    function validatePassword() {
        const error = passwordInput.nextElementSibling;
        
        if (passwordInput.value.length < 8) {
            showError(passwordInput, error, 'Password must be at least 8 characters');
            return false;
        } else {
            showSuccess(passwordInput, error);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function showSuccess(input, errorElement) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
    }
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            formMessage.textContent = 'Form submitted successfully!';
            formMessage.className = 'success';
            
            // In a real app, you would send data to server here
            setTimeout(() => {
                userForm.reset();
                formMessage.className = '';
                formMessage.textContent = '';
            }, 3000);
        } else {
            formMessage.textContent = 'Please fix the errors in the form.';
            formMessage.className = 'error';
        }
    });
});