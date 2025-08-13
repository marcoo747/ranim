// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', function () {
  const passwordInput = document.querySelector('.password-wrapper input');
  const type = passwordInput.getAttribute('type');

  if (type === 'password') {
    passwordInput.setAttribute('type', 'text');
    this.textContent = '🙈'; // change icon
  } else {
    passwordInput.setAttribute('type', 'password');
    this.textContent = '👁️';
  }
});

// Simple form validation
document.querySelector('.login-form').addEventListener('submit', function (e) {
  const username = document.querySelector('input[type="text"]').value.trim();
  const password = document.querySelector('.password-wrapper input').value.trim();

  if (username === '' || password === '') {
    alert('Please enter both username/email and password.');
    e.preventDefault(); // prevent form submission
  }
});

function mockLogin(service) {
  alert('Logging in with ' + service);
}
