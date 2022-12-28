var code = document.getElementById("new-password");

var strengthbar = document.getElementById("pw_strength");
document.getElementById('complete_signup').classList.add("disabled")
code.addEventListener("keyup", function() {
  checkPassword(code.value);
});

function checkPassword(password) {
  var strength = 0;
  if (password.match(/[a-z]+/)) {
    strength++;
  }
  if (password.match(/[A-Z]+/)) {
    strength++;
  }
  if (password.match(/[0-9]+/)) {
    strength++;
  }
  if (password.match(/[$@#&!]+/)) {
    strength++;
  if (password.length >= 8 ) {
    strength++
  }
console.log(strength)
  }

//   if (password.length < 6) {
//     display.innerHTML = "minimum number of characters is 6";
//   }

//   if (password.length > 12) {
//     display.innerHTML = "maximum number of characters is 12";
//   }

  switch (strength) {
    case 0:
      strengthbar.style.width = '3%';
      document.getElementById('complete_signup').classList.add("disabled")
      document.getElementById('complete_signup').classList.remove("enabled");
      break;

    case 1:
      strengthbar.style.width = '20%';
      document.getElementById('complete_signup').classList.add("disabled")
      document.getElementById('complete_signup').classList.remove("enabled");
      break;

    case 2:
      strengthbar.style.width = '40%';
      document.getElementById('complete_signup').classList.add("disabled")
      document.getElementById('complete_signup').classList.remove("enabled");
      break;

    case 3:
      strengthbar.style.width = '60%';
      document.getElementById('complete_signup').classList.add("disabled")
      document.getElementById('complete_signup').classList.remove("enabled");
      break;

    case 4:
      strengthbar.style.width = '80%';
      document.getElementById('complete_signup').disabled = false;
      document.getElementById('complete_signup').classList.add("enabled");
      document.getElementById('complete_signup').classList.remove("disabled");
      break;
    case 5: 
      strengthbar.style.width = '100%';
      document.getElementById('complete_signup').disabled = false;
      document.getElementById('complete_signup').classList.add("enabled");
      document.getElementById('complete_signup').classList.remove("disabled");
      break;
  }
}

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