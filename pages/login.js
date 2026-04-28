import { useState, useCallback } from 'react'
import Link from 'next/link'
import FormInput from '../components/FormInput'
import { validateEmail, validatePassword } from '../lib/validation'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = useCallback(() => {
    const newErrors = {}
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError

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
          await new Promise((resolve) => setTimeout(resolve, 1000))
          setIsSuccess(true)
          setTimeout(() => {
            alert('Login successful! Redirecting...')
          }, 500)
        } catch (err) {
          setErrors({ submit: 'Login failed. Please try again.' })
        } finally {
          setIsLoading(false)
        }
      }
    },
    [validate]
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <form className="card" onSubmit={handleSubmit} noValidate>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400">Sign in to continue to Postanes</p>
        </div>

        {isSuccess && (
          <div className="p-4 mb-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 text-sm">✓ Login successful!</p>
          </div>
        )}

        {errors.submit && (
          <div className="p-4 mb-4 rounded-lg bg-red-500/10 border border-red-500/30" role="alert">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}

        <div className="space-y-5">
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
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            disabled={isLoading}
            hint="Must be at least 8 characters"
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
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </button>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Create account
          </Link>
        </p>
      </form>
    </div>
  )
}

