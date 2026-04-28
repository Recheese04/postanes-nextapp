/**
 * Modern FormInput component with animated error display
 */
import { motion, AnimatePresence } from 'framer-motion'

export default function FormInput({ 
  label, 
  error, 
  required = true,
  hint,
  strength,
  icon,
  ...props 
}) {
  const hasError = !!error
  const strengthColors = ['', 'bg-red-500', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-400']
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

  return (
    <div className="input-group">
      {label && (
        <label className="label-modern" htmlFor={props.name}>
          {label}
          {required && <span className="text-purple-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          id={props.name}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${props.name}-error` : hint ? `${props.name}-hint` : undefined}
          className={`input-modern ${icon ? 'pl-11' : ''} ${
            hasError 
              ? 'border-red-500/40 focus:ring-red-500/30 focus:border-red-500/60' 
              : ''
          }`}
        />
      </div>

      {strength !== undefined && (
        <div className="flex items-center gap-3 mt-1">
          <div className="flex gap-1 flex-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i < strength ? 1 : 1 }}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < strength ? strengthColors[strength] : 'bg-white/[0.06]'
                }`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {strength > 0 && (
              <motion.span 
                key={strength}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-xs font-medium text-slate-400"
              >
                {strengthLabels[strength]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence mode="wait">
        {hasError && (
          <motion.div 
            id={`${props.name}-error`} 
            role="alert"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-400 text-sm flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {hint && !hasError && (
        <div id={`${props.name}-hint`} className="text-slate-500 text-xs ml-1">
          {hint}
        </div>
      )}
    </div>
  )
}
