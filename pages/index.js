import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Palette, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: 'Lightning Fast',
      description: 'Optimized editor with instant saves and real-time collaboration',
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-400" />,
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed themes for any topic',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
      title: 'Rich Analytics',
      description: 'Track readers, engagement, and growth with detailed stats',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="noise-bg" />
      
      {/* Navbar */}
      <nav className="relative z-10 app-wrap py-8 flex justify-between items-center">
        <div className="text-2xl font-bold font-outfit tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          POSTANES
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="nav-link">
            Log in
          </Link>
          <Link href="/signup" className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 app-wrap pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Introducing Open Beta
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-extrabold font-outfit text-white leading-[1.1] tracking-tight">
                Publishing,<br />
                <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  reinvented.
                </span>
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
                Postanes is the modern canvas for your thoughts. Beautiful typography, lightning speed, and a clutter-free experience for creators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/signup" className="btn-primary group">
                Start Creating Free
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="btn-secondary">
                View Documentation
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
                <span>Custom domains</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="hidden lg:block perspective-1000"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative glass-card border-white/20 p-2 overflow-hidden aspect-[4/3] flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-slate-900/50 flex flex-col p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-1/3 bg-white/10 rounded-full animate-pulse" />
                    <div className="h-4 w-full bg-white/5 rounded-full" />
                    <div className="h-4 w-full bg-white/5 rounded-full" />
                    <div className="h-20 w-full bg-white/[0.03] rounded-xl" />
                  </div>
                  <div className="flex-1" />
                  <div className="h-10 w-full bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-xl border border-white/5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative z-10 border-t border-white/[0.05]">
        <div className="app-wrap">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-outfit">Everything you need</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Powerful tools built into a seamless experience. Focus on writing, we handle the rest.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-card group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-outfit">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/[0.05] relative z-10 text-center">
        <div className="app-wrap">
          <p className="text-slate-500 text-sm">
            &copy; 2026 Postanes. All rights reserved. Built for the modern web.
          </p>
        </div>
      </footer>
    </div>
  )
}
