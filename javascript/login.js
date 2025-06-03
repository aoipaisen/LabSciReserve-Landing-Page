    document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.querySelector('.login-form');
      
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if(username.trim() === '' || password.trim() === '') {
          alert('Please fill in all fields');
          return;
        }
        
        // In a real app, you would send this to your server
        console.log('Login attempt:', { username, password });
        
        // Show success message
        alert('Login successful! Redirecting to dashboard...');
        
        // Redirect to dashboard (in a real application)
        // window.location.href = 'dashboard.html';
      });
    });
