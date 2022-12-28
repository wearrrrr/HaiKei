var code = document.getElementById("new-password");
document.getElementById('complete_login').classList.add("enabled")

const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#new-password');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye')
});