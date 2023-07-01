// JavaScript code to change the background image
document.addEventListener('DOMContentLoaded', function() {
  var body = document.querySelector('body');
  var button = document.querySelector('#change-image-button');

  // Add an event listener to the button
  button.addEventListener('click', function() {
    // Change the background image URL
    body.style.backgroundImage = "url('C:/Users/Node/Desktop/stech2.jpg')";
  });
}); // Function to handle navigation active state
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links li a');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');

    if (currentPath === linkPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Function to handle mobile menu toggle
function toggleMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
}

// Run the setActiveNavLink function on page load
window.addEventListener('load', setActiveNavLink);

// Toggle mobile menu on menu icon click
document.querySelector('.menu-toggle').addEventListener('click', toggleMobileMenu);
document.addEventListener("DOMContentLoaded", function() {
  var chatbotMessages = document.getElementById("chatbot-messages");
  var userInput = document.getElementById("user-input");
  var sendButton = document.getElementById("send-button");

  function createBotMessage(message) {
    var messageElement = document.createElement("div");
    messageElement.className = "message bot-message";
    messageElement.innerHTML = "<p>" + message + "</p>";
    return messageElement;
  }

  function createUserMessage(message) {
    var messageElement = document.createElement("div");
    messageElement.className = "message user-message";
    messageElement.innerHTML = "<p>" + message + "</p>";
    return messageElement;
  }

  function sendMessage() {
    var userMessage = userInput.value.trim();
    if (userMessage !== "") {
      var messageElement = createUserMessage(userMessage);
      chatbotMessages.appendChild(messageElement);
      userInput.value = "";

      // Chatbot logic to generate responses
      var botMessage;
      if (userMessage.toLowerCase().includes("hi") || userMessage.toLowerCase().includes("hello")) {
        botMessage = "Hello! How can I assist you today?";
      } else if (userMessage.toLowerCase().includes("services") || userMessage.toLowerCase().includes("offerings")) {
        botMessage = "We offer a wide range of IT consulting services. How can we assist you specifically?";
      } else if (userMessage.toLowerCase().includes("contact") || userMessage.toLowerCase().includes("reach")) {
        botMessage = "You can reach us at info@consultingcompany.com or call us at +123456789.";
      } else if (userMessage.toLowerCase().includes("thank")) {
        botMessage = "You're welcome! If you have any more questions, feel free to ask.";
      } else {
        botMessage = "I'm sorry, I didn't understand that. How can I assist you?";
      }
      var botResponse = createBotMessage(botMessage);
      chatbotMessages.appendChild(botResponse);
      // End of chatbot logic
    }
  }

  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  });
});

 // Stripe configuration
 var stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
 var elements = stripe.elements();
 var card = elements.create('card');

 card.mount('#card-element');

 // Handle payment form submission
 document.getElementById('pay-button').addEventListener('click', function() {
   var name = document.getElementById('name').value;
   var email = document.getElementById('email').value;

   stripe.createToken(card).then(function(result) {
     if (result.error) {
       // Display error message
       var errorElement = document.getElementById('error-message');
       errorElement.textContent = result.error.message;
     } else {
       // Send token to your server for payment processing
       var token = result.token.id;
       var data = {
         token: token,
         name: name,
         email: email
       };

       // Send the token and additional data to your server
       fetch('/process-payment', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
       }).then(function(response) {
         if (response.ok) {
           // Payment successful, redirect to success page
           window.location.href = '/success';
         } else {
           // Payment failed, display error message
           var errorElement = document.getElementById('error-message');
           errorElement.textContent = 'Payment failed. Please try again.';
         }
       });
     }
   });
 });