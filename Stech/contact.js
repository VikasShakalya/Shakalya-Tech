// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Perform form validation (you can add your own validation logic)
  
    // Clear form inputs
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  
    // Display success message (you can customize this part)
    alert('Thank you for contacting us! We will get back to you soon.');
  }
  
  // Add form submit event listener
  document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
  