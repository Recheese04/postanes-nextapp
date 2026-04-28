import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, ArrowRight, Github } from 'lucide-react'
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
          await new Promise((resolve) => setTimeout(resolve, 1200))
          setIsSuccess(true)
          // Simulate navigation delay
        } catch (err) {
          setErrors({ submit: 'Login failed. Please check your credentials.' })
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
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8 text-2xl font-bold font-outfit tracking-tighter text-white">
            POSTANES
          </Link>
          <h1 className="text-3xl font-bold text-white font-outfit mb-2">Welcome back</h1>
          <p className="text-slate-400">Continue your creative journey</p>
        </div>

        <div className="glass-card !p-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait">
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 font-bold">✓</div>
                  Login successful! Redirecting...
                </motion.div>
              )}
              
              {errors.submit && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {errors.submit}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
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
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                disabled={isLoading || isSuccess}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`btn-primary w-full group ${
                isLoading || isSuccess ? 'opacity-50 cursor-not-allowed shadow-none scale-100' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : isSuccess ? (
                'Success'
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0c1221] px-2 text-slate-500 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              className="btn-secondary w-full flex items-center justify-center gap-3 !py-3"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            New here?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
