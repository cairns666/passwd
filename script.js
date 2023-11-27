function generatePassword() {
  const quantity = document.getElementById('quantity').value;
  const passwordLength = document.getElementById('passwordLength').value;
  const passwordContainer = document.getElementById('password-container');
  const includeDigits = document.getElementById('digits').checked;
  const includeUppercase = document.getElementById('uppercase').checked;
  const includeLowercase = document.getElementById('lowercase').checked;
  const includeSpecialChars = document.getElementById('specialChars').checked;

 if (passwordLength < 4 || passwordLength > 128) {
   alert('密码长度应在4到128之间。');
   return;
 }

  const characters = generateCharacterString(includeDigits, includeUppercase, includeLowercase, includeSpecialChars);
  passwordContainer.innerHTML = '';

  for (let i = 0; i < quantity; i++) {
    let password = generateRandomPassword(passwordLength, characters);

    while (
      (includeDigits && !/\d/.test(password)) ||
      (includeUppercase && !/[A-Z]/.test(password)) ||
      (includeLowercase && !/[a-z]/.test(password)) ||
      (includeSpecialChars && !/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password))
    ) {
      password = generateRandomPassword(passwordLength, characters);
    }

    const passwordElement = document.createElement('div');
    passwordElement.textContent = password;
    passwordContainer.appendChild(passwordElement);
  }
}

function generateCharacterString(includeDigits, includeUppercase, includeLowercase, includeSpecialChars) {
  let characters = '';
  if (includeDigits) characters += '0123456789';
  if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (includeSpecialChars) characters += '!@#$%^&*()_+[]{}|;:,.<>?';
  return characters;
}

function generateRandomPassword(length, characters) {
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

function copyPasswords() {
  const passwords = document.getElementById('password-container').innerText;
  if (passwords) {
    navigator.clipboard.writeText(passwords);
    showCopyNotification();
  }
}

function showCopyNotification() {
  var a_idx = 0;
  var a = [
    "密码复制成功！"
  ];

  var $i = $("<span/>").text(a[a_idx]);
  a_idx = (a_idx + 1) % a.length;

  var colorR = Math.floor(Math.random() * 256);
  var colorG = Math.floor(Math.random() * 256);
  var colorB = Math.floor(Math.random() * 256);

  $i.css({
    "z-index": 9999999,
    "position": "fixed",
    "top": "50%",
    "left": "50%",
    "transform": "translate(-50%, -50%)",
    "font-weight": "bold",
    "font-size": "18px",
    "color": "rgb(" + colorR + "," + colorG + "," + colorB + ")",
    "background-color": "#fff",
    "padding": "10px",
    "border-radius": "8px",
    "box-shadow": "0 0 10px rgba(0, 0, 0, 0.1)",
  });

  $("body").append($i);

  $i.animate({
    "opacity": 0
  },
  1500,
  function() {
    $i.remove();
  });
}

