/**
 * Check if a string contains only numeric characters
 * @param {string} str - The string to check
 * @return {boolean} True if string contains only numbers, false otherwise
 */
const isNumericOnly = (str: string): boolean => {
  return /^\d+$/.test(str);
}

/**
 * Validate registration form data and returns any validation errors
 * @param {RegisterFormData} formData - The registration form data containing username, email, password and confirm_password
 * @return {RegisterFormErrors} formErrors - An object containing validation errors for each field if any
 */
const checkValidation = (formData: RegisterFormData): RegisterFormErrors => {
  const formErrors: RegisterFormErrors = {};

  if (!formData.username.trim()) {
    formErrors.username = ['Username is required'];
  } else if (formData.username.length < 3) {
    formErrors.username = ['Username must be at least 3 characters'];
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    formErrors.username = ['Username can only contain letters, numbers and underscores'];
  }

  if (!formData.email.trim()) {
    formErrors.email = ['Email is required'];
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    formErrors.email = ['Please enter a valid email address'];
  }

  if (!formData.password) {
    formErrors.password = ['Password is required'];
  } else {
    const passwordErrors: string[] = [];
    if (formData.password.length < 8) {
      passwordErrors.push('Password must be at least 8 characters');
    }
    if (isNumericOnly(formData.password)) {
      passwordErrors.push('Password cannot be entirely numeric');
    }

    if (passwordErrors.length > 0) {
      formErrors.password = passwordErrors
    }
  }

  if (!formData.confirm_password) {
    formErrors.confirm_password = ['Please confirm your password'];
  } else if (formData.password !== formData.confirm_password) {
    formErrors.confirm_password = ['Passwords do not match'];
  }

  return formErrors
}

export {
  isNumericOnly,
  checkValidation
}