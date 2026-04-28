import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized editor with instant saves and real-time collaboration',
    },
    {
      icon: '🎨',
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed themes for any topic',
    },
    {
      icon: '📊',
      title: 'Rich Analytics',
      description: 'Track readers, engagement, and growth with detailed stats',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-dark">
      <nav className="app-wrap">
        <div className="flex justify-end gap-3">
          <Link href="/login" className="nav-link">
            Login
          </Link>
          <Link href="/signup" className="nav-link">
            Sign up
          </Link>
        </div>
      </nav>

      <section className="app-wrap pt-12 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Open Beta
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Publishing,{' '}
                <span className="bg-gradient-to-r from-purple-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  reinvented
                </span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Postanes is a modern publishing platform designed for creators, writers, and teams. Write, publish, and
                grow your audience with beautiful, fast, and collaborative tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="btn text-center py-4 px-6 text-base font-semibold hover:shadow-lg hover:shadow-purple-500/40"
              >
                Start creating for free
              </Link>
              <Link
                href="/login"
                className="btn-secondary text-center py-4 px-6 text-base font-semibold hover:bg-white/10"
              >
                View docs
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">✓</div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">✓</div>
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">✓</div>
                <span>24/7 support</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-2xl rounded-2xl"
                aria-hidden
              />
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm">
                <svg width="100%" height="100%" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="heroGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="500" height="400" fill="url(#heroGrad)" opacity="0.1" />
                  <rect x="20" y="20" width="460" height="50" rx="8" fill="rgba(255,255,255,0.08)" />
                  <rect x="20" y="90" width="200" height="20" rx="4" fill="rgba(255,255,255,0.15)" />
                  <rect x="20" y="130" width="460" height="200" rx="8" fill="rgba(255,255,255,0.05)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
        <div className="app-wrap">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to publish</h2>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
              Powerful features built for modern creators and teams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 hover:border-white/20 hover:bg-white/8 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="app-wrap text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start publishing?</h2>
          <p className="text-slate-400 mb-8">Join thousands of creators already publishing on Postanes</p>
          <Link href="/signup" className="btn py-4 px-8 text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/40">
            Create account
          </Link>
        </div>
      </section>
    </div>
  )
}
