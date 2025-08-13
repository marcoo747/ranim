document.querySelector('.signup-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const fullName = document.querySelector('#fullName').value.trim();
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const phone = document.querySelector('#phone').value.trim();
  const dob = document.querySelector('#dob').value.trim();
  const country = document.querySelector('#country').value;
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirmPassword').value.trim();

  // Basic validation for required fields
  if (!fullName || !username || !email || !dob || !country || !password || !confirmPassword) {
    alert('Please fill out all required fields.');
    return;
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  alert('Sign up successful!');
  // Add logic to actually handle the form submission (e.g., send data to the backend)
});

function updateFileName() {
  const fileInput = document.getElementById('photo');
  const fileName = fileInput.files[0] ? fileInput.files[0].name : 'No file chosen';
  
  // Update the text to show the selected file name
  document.querySelector('.file-input-text').textContent = fileName;
}
