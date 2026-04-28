/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates email format
 * @param {string} email
 * @returns {string|null} error message or null if valid
 */
export function validateEmail(email) {
  if (!email?.trim()) return 'Email is required'
  if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email'
  return null
}

/**
 * Validates password strength
 * @param {string} password
 * @returns {string|null} error message or null if valid
 */
export function validatePassword(password) {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  return null
}

/**
 * Validates password confirmation
 * @param {string} password
 * @param {string} confirm
 * @returns {string|null} error message or null if valid
 */
export function validatePasswordMatch(password, confirm) {
  if (password !== confirm) return 'Passwords do not match'
  return null
}

/**
 * Validates name
 * @param {string} name
 * @returns {string|null} error message or null if valid
 */
export function validateName(name) {
  if (!name?.trim()) return 'Name is required'
  if (name.trim().length < 2) return 'Name must be at least 2 characters'
  return null
}

/**
 * Calculates password strength (0-4)
 * @param {string} password
 * @returns {number} strength level
 */
export function getPasswordStrength(password) {
  if (!password) return 0
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return Math.min(strength, 4)
}

/**
 * Gets password strength label
 * @param {number} strength
 * @returns {string} strength label
 */
export function getPasswordStrengthLabel(strength) {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[strength] || 'Strong'
}
