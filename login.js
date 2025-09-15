document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginTitle = document.getElementById('login-title');
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('error-message');

  // Get the role from the URL (e.g., login.html?role=user)
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role');

  if (!role) {
    // If no role is specified, go back to the first page
    window.location.href = 'index.html';
    return;
  }

  // Update the title and placeholder based on the role
  loginTitle.textContent = `${role.charAt(0).toUpperCase() + role.slice(1)} Login`;
  emailInput.placeholder = `${role}@example.com`;

  // Handle the form submission
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value.toLowerCase();
    const expectedEmail = `${role}@example.com`;

    if (email === expectedEmail) {
      // Success! Redirect to the main portal page, passing the role along.
      window.location.href = `portal.html?role=${role}`;
    } else {
      // Show an error
      errorMessage.classList.remove('hidden');
    }
  });
});