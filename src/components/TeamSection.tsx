import { Code, Palette, Brain } from 'lucide-react';

export default function TeamSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="section-title text-5xl md:text-6xl font-black mb-8 text-center animate-slide-up">
        Meet the <span className="text-gradient">Team</span>
      </h2>

      <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Built by a passionate developer focused on bringing AI innovation to everyone
      </p>

      <div className="glass-card p-12 rounded-3xl border border-cyan/20 max-w-2xl mx-auto hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col items-center">
          {/* <div className="w-24 h-24 bg-gradient-to-br from-cyan to-purple-500 rounded-full flex items-center justify-center glow-icon mb-6 animate-rotate-glow">
            <Brain className="w-12 h-12" />
          </div> */}

          <h3 className="text-3xl font-black text-center mb-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-gradient">Nithyashree CS</span>
          </h3>

          <p className="text-lg text-gray-400 text-center mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
            AI Research Engineer, Fullstack Developer, UX Designer
          </p>

          <div className="grid grid-cols-3 gap-6 w-full mb-8">
            <div className="text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-12 h-12 mx-auto mb-3 bg-cyan/10 rounded-lg flex items-center justify-center glow-icon animate-glow-pulse">
                <Brain className="w-6 h-6 text-cyan" />
              </div>
              <p className="font-semibold text-sm mb-1">AI Research</p>
              <p className="text-xs text-gray-500">ML models & algorithms</p>
            </div>

            <div className="text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/10 rounded-lg flex items-center justify-center glow-icon animate-glow-pulse">
                <Code className="w-6 h-6 text-purple-400" />
              </div>
              <p className="font-semibold text-sm mb-1">Fullstack</p>
              <p className="text-xs text-gray-500">Web & mobile dev</p>
            </div>

            <div className="text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.7s' }}>
              <div className="w-12 h-12 mx-auto mb-3 bg-cyan/10 rounded-lg flex items-center justify-center glow-icon animate-glow-pulse">
                <Palette className="w-6 h-6 text-cyan" />
              </div>
              <p className="font-semibold text-sm mb-1">UX Design</p>
              <p className="text-xs text-gray-500">User experience</p>
            </div>
          </div>

          <p className="text-center text-gray-400 leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            Nithyashree is passionate about democratizing AI through on-device machine learning, making advanced technology accessible to everyone without compromising privacy or performance.
          </p>

          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-cyan text-cyan hover:bg-cyan/10 transition-all font-semibold hover-scale-lg animate-scale-in" style={{ animationDelay: '0.9s' }}>
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-purple-500 text-purple-300 hover:bg-purple-500/10 transition-all font-semibold hover-scale-lg animate-scale-in" style={{ animationDelay: '1s' }}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-2xl text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '1.1s' }}>
          <div className="text-4xl font-black text-cyan mb-3">2025</div>
          <p className="text-gray-400">Arm AI Developer Challenge Entry</p>
        </div>

        <div className="glass-card p-8 rounded-2xl text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-4xl font-black text-purple-400 mb-3">100%</div>
          <p className="text-gray-400">Open Source & Free to Use</p>
        </div>

        <div className="glass-card p-8 rounded-2xl text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '1.3s' }}>
          <div className="text-4xl font-black text-cyan mb-3">∞</div>
          <p className="text-gray-400">Possibilities with Air Gestures</p>
        </div>
      </div>
    </div>
  );
}
