const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Toggle the navigation menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Handle the contact form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    console.log('Form Data:', formData); // Debugging log

    // Fetch request to the API endpoint
    fetch('/api/message', { // Updated endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        document.getElementById('contactForm').reset();
        alert(data.message); // Alert success message from server
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error sending your message: ' + error.message); // Improved error message
    });
});
