document.addEventListener("DOMContentLoaded", function () {
   emailjs.init("GvY9-T9e5iZLicCOf"); // Replace with your actual EmailJS User ID

   document.getElementById("contact-form").addEventListener("submit", function (event) {
       event.preventDefault();

       var params = {
           name: document.getElementById("name").value.trim(), // Ensure "name" matches the template
           email: document.getElementById("email").value.trim(),
           message: document.getElementById("message").value.trim()
       };

       emailjs.send("service_vsqdoxh", "template_2g5ombg", params)
           .then(function (response) {
               document.getElementById("status").innerText = "Message Sent Successfully!";
               document.getElementById("contact-form").reset(); // Reset form after successful submission
           }, function (error) {
               document.getElementById("status").innerText = "Failed to Send Message!";
           });
   });
});
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }
});


