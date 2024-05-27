export function GeneratePassword(length = 12) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;"<>,.?/';
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export function generateStrongPassword(len = 12) {
  const spl = "!#$%&'*+,-.:;<=>?@^_`~",
    upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower = "abcdefghijklmnopqrstuvwxyz",
    digit = "1234567890";
  let password = "";
  let has_spl = false,
    has_upper = false,
    has_lower = false,
    has_digit = false;
  while (len > 0) {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        password += spl.at(Math.floor(Math.random() * spl.length));
        has_spl = true;
        break;
      case 1:
        password += upper.at(Math.floor(Math.random() * upper.length));
        has_upper = true;
        break;
      case 2:
        password += lower.at(Math.floor(Math.random() * lower.length));
        has_lower = true;
        break;
      case 3:
        password += digit.at(Math.floor(Math.random() * digit.length));
        has_digit = true;
        break;
    }
    len--;
  }
  if (!(has_spl && has_digit && has_upper && has_lower)) {
    password = generateStrongPassword();
  }
  return password;
}
