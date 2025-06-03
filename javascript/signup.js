const startBtn = document.getElementById('startSignupBtn');
const signupForm = document.getElementById('signupForm');
const roleSelect = document.getElementById('userRole');
const studentIdGroup = document.getElementById('studentIdGroup');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
const passError = document.getElementById('passError');

let formVisible = false;

startBtn.addEventListener('click', () => {
  if (!formVisible) {
    // Show form, shrink and reposition button, change text to Back
    startBtn.classList.add('shrink');
    signupForm.classList.add('active');
    startBtn.textContent = 'Back';
    formVisible = true;
  } else {
    // Hide form, revert button size and text
    signupForm.classList.remove('active');
    startBtn.classList.remove('shrink');
    startBtn.textContent = 'Sign Up Now';
    formVisible = false;

    // Reset role select and hide student ID field
    roleSelect.value = '';
    studentIdGroup.style.display = 'none';

    // Clear any password errors on hide
    passError.textContent = '';
  }
});

// Toggle Student ID input visibility based on role select
roleSelect.addEventListener('change', () => {
  studentIdGroup.style.display = roleSelect.value === 'student' ? 'block' : 'none';
});

// Password match validation in real time
rePassword.addEventListener('input', () => {
  passError.textContent = password.value !== rePassword.value ? 'Passwords do not match.' : '';
});

