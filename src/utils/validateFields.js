// Email validation function
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple regex for valid email
  return emailRegex.test(email);
};

// Password validation function
export const validatePassword = (password) => {
  // minimum 5 characters & at least 1 special character
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/;
  return passwordRegex.test(password);
};