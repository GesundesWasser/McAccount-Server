window.addEventListener('DOMContentLoaded', function() {
  // Your code here
  window.onload = function() {
    // Generate a random number between 1 and 10
    var randomBg = Math.floor(Math.random() * 10) + 1;
    
    // Set the background image
    document.body.style.backgroundImage = "url('../img/bedwars/" + randomBg + ".png')";
  };

  // Login form submission
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Simulate successful login
    // For demonstration purposes, let's assume the login is successful
    const username = document.getElementById('username').value;

    // Show success message or redirect to dashboard
    alert('Welcome, ' + username + '!'); // You can modify this to suit your needs
    // window.location.href = '/dashboard.html'; // You can uncomment this to redirect to a dashboard page
  });

  // Registration form submission
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const formData = new FormData(this);

    // Convert form data to JSON format
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    // Send the registration request using fetch API
    fetch('http://localhost:3000/register', { // Adjust the URL if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // Show success message
      alert(data);
      // Optionally, redirect to another page after successful registration
      // window.location.href = '/success.html';
    })
    .catch(error => {
      console.error('There was a problem with the registration:', error);
      // Show error message
      alert('There was a problem with the registration. Please try again later.');
    });
  });
});
