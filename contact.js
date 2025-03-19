// Listen for the form submit event
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Gather form values
  const name = document.getElementById('customerName').value;
  const email = document.getElementById('customerEmail').value;
  const feedback = document.getElementById('customerFeedback').value;

  // Adjusted template parameters based on your email template image
  const templateParams = {
    user_name: name,         // Changed variable name to match your template
    user_email: email,       // Changed variable name to match your template
    user_message: feedback   // Changed variable name to match your template
  };

  // Send the email using EmailJS
  // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs.
  emailjs.send('service_ugd0hn1', 'template_2ipjymi', templateParams)
    .then(function(response) {
       alert('Message sent successfully!');
       // Optionally, reset the form after success
       document.getElementById('contactForm').reset();
    }, function(error) {
       console.error('EmailJS error details:', error);
       alert('Failed to send the message. Please check the console for details.');
    });
});
