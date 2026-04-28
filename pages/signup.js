import { useState, useCallback } from 'react'
import Link from 'next/link'
import FormInput from '../components/FormInput'
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  getPasswordStrength,
} from '../lib/validation'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const passwordStrength = getPasswordStrength(formData.password)

  const validate = useCallback(() => {
    const newErrors = {}
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    const matchError = validatePasswordMatch(formData.password, formData.confirm)

    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError
    if (matchError) newErrors.confirm = matchError

    return newErrors
  }, [formData])

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const newErrors = validate()
      setErrors(newErrors)

      if (Object.keys(newErrors).length === 0) {
        setIsLoading(true)
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500))
          setIsSuccess(true)
          setTimeout(() => {
            alert('Account created successfully! Redirecting to login...')
          }, 500)
        } catch (err) {
          setErrors({ submit: 'Signup failed. Please try again.' })
        } finally {
          setIsLoading(false)
        }
      }
    },
    [validate]
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <form className="card max-w-md" onSubmit={handleSubmit} noValidate>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
          <p className="text-slate-400">Join Postanes — publish faster.</p>
        </div>

        {isSuccess && (
          <div className="p-4 mb-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 text-sm">✓ Account created successfully!</p>
          </div>
        )}

        {errors.submit && (
          <div className="p-4 mb-4 rounded-lg bg-red-500/10 border border-red-500/30" role="alert">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}

        <div className="space-y-5">
          <FormInput
            label="Full name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
            disabled={isLoading}
          />

          <FormInput
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            disabled={isLoading}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            strength={passwordStrength}
            hint={passwordStrength < 3 ? 'Use uppercase, numbers, and symbols' : 'Good password'}
            autoComplete="new-password"
            disabled={isLoading}
          />

          <FormInput
            label="Confirm password"
            name="confirm"
            type="password"
            placeholder="Repeat password"
            value={formData.confirm}
            onChange={handleChange}
            error={errors.confirm}
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`btn w-full mt-6 transition-all ${
            isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/30'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 inline animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </button>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

