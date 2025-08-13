// Toggle visibility for the password or confirm password field
function togglePassword(field) {
  const passwordField = document.getElementById(field); // Get the password field dynamically
  const toggleIcon = document.getElementById(`toggle-${field}`); // Get the corresponding eye icon dynamically

  // Toggle the password visibility for the correct field
  if (passwordField.type === 'password') {
    passwordField.type = 'text'; // Show the password
    toggleIcon.textContent = '🙈'; // Change to closed eye emoji
  } else {
    passwordField.type = 'password'; // Hide the password
    toggleIcon.textContent = '👁️'; // Change to open eye emoji
  }
}


function updateFileName() {
  const fileInput = document.getElementById('photo');
  const fileName = fileInput.files[0] ? fileInput.files[0].name : 'No file chosen';
  document.querySelector('.file-input-text').textContent = fileName;
}
