import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react'
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
          await new Promise((resolve) => setTimeout(resolve, 1500))
          setIsSuccess(true)
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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="noise-bg" />
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6 text-2xl font-bold font-outfit tracking-tighter text-white">
            POSTANES
          </Link>
          <h1 className="text-3xl font-bold text-white font-outfit mb-2">Create account</h1>
          <p className="text-slate-400">Join the future of publishing</p>
        </div>

        <div className="glass-card !p-8 md:!p-10">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait">
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Account created! Redirecting to login...
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <FormInput
                label="Full name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
                disabled={isLoading || isSuccess}
                icon={<User className="w-4 h-4" />}
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
                disabled={isLoading || isSuccess}
                icon={<Mail className="w-4 h-4" />}
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
                autoComplete="new-password"
                disabled={isLoading || isSuccess}
                icon={<Lock className="w-4 h-4" />}
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
                disabled={isLoading || isSuccess}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`btn-primary w-full group mt-2 ${
                isLoading || isSuccess ? 'opacity-50 cursor-not-allowed shadow-none' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : isSuccess ? (
                'Success'
              ) : (
                <div className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
