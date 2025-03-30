// Typing Animation
const roles = [
  "Cloud Engineer",
  "Solutions Architect",
  "DevOps Engineer",
  "Cloud Solutions Developer",
];
let currentRole = 0;
let currentLetter = 0;
const typingSpeed = 100; // Speed of typing (in ms)
const pauseTime = 1500; // Pause time before switching roles (in ms)
const typewriterText = document.getElementById("typewriter-text");

function typeEffect() {
  if (currentRole === roles.length) {
    currentRole = 0; // Restart the loop of roles
  }

  const currentWord = roles[currentRole];
  const typedText = currentWord.slice(0, ++currentLetter);

  typewriterText.textContent = typedText;

  if (typedText.length === currentWord.length) {
    currentLetter = 0;
    currentRole++;
    setTimeout(typeEffect, pauseTime); // Wait before typing the next word
  } else {
    setTimeout(typeEffect, typingSpeed); // Continue typing
  }
}

typeEffect(); // Start the typing effect

// Initialize EmailJS
emailjs.init("RloG3IzFFAaDnMjUE"); // Your Public Key from EmailJS

// Function to Send Email
function sendMail() {
  console.log("sendMail() triggered!"); // Debugging log

  // Collect form field values
  const parms = {
    name: document.getElementById("name").value.trim(),
    reply_to: document.getElementById("email").value.trim(), // Maps to {{reply_to}}
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  console.log("Sending the following data:", parms); // Debugging log

  // Validate form inputs
  if (parms.name && parms.reply_to && parms.subject && parms.message) {
    emailjs
      .send("service_9v4dqka", "template_y2cromh", parms) // Updated Service ID
      .then(
        function (response) {
          alert("Message sent successfully! Thank you for contacting me.");
          console.log("SUCCESS:", response.status, response.text);
          document.getElementById("contact-form").reset(); // Clear the form fields
        },
        function (error) {
          alert("Failed to send the message. Please try again later.");
          console.error("ERROR:", error);
        }
      );
  } else {
    alert("Please fill in all fields before sending!");
  }
}

// Add Event Listener for Form Submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
  console.log("Form submitted"); // Debugging log
  event.preventDefault(); // Prevent default form submission
  console.log("Default submission prevented"); // Debugging log
  sendMail(); // Call sendMail
});
