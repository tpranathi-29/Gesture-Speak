import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Play, Zap, Eye, Cpu, Download, BookOpen, Smartphone } from 'lucide-react';
import FloatingParticles from './components/FloatingParticles';
import TechStack from './components/TechStack';
import TeamSection from './components/TeamSection';
import { useParallax, useScrollAnimation } from './hooks/useParallax';
import LiveDemo from './components/LiveDemo';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useParallax(0.3);
  const heroRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const techRef = useScrollAnimation();
  const teamRef = useScrollAnimation();
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-dark text-white overflow-hidden">
      <FloatingParticles scrollY={scrollY} />

      {/* --- 1. NAVBAR UPDATED --- */}
      <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-lg border-b border-cyan/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-18 h-18 bg-gradient-to-br from-cyan to-violet rounded-lg flex items-center justify-center logo-glow">
              <span className="text-lg font-black text-cyan">GestureSpeak</span>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
              GestureSpeak 
            </div>
          </a>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#how-it-works" className="hover:text-cyan transition-colors text-sm">How It Works</a>
            <a href="#tech-stack" className="hover:text-cyan transition-colors text-sm">Technology</a>
            <a href="#team" className="hover:text-cyan transition-colors text-sm">Team</a>
            <a href="https://github.com/Nithyacoorg2005" target="_blank" rel="noopener noreferrer" className="border border-cyan px-4 py-2 rounded-full text-xs hover:bg-cyan/10 transition-all font-semibold flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION UPDATED --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 opacity-40 pointer-events-none parallax-item" style={{
          background: `radial-gradient(circle at ${50 + scrollY * 0.05}% ${50 + scrollY * 0.03}%, rgba(0, 255, 255, 0.2), transparent 50%), radial-gradient(circle at ${30 - scrollY * 0.03}% ${70 + scrollY * 0.02}%, rgba(168, 85, 247, 0.2), transparent 50%)`,
        }} />

        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="mb-6 inline-block animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-cyan text-sm font-bold tracking-widest mb-6 animate-neon-flicker glow-text">
              THE FUTURE IS TOUCHLESS
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan via-purple-400 to-cyan bg-clip-text text-transparent animate-gradient block animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Speak with
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-cyan to-purple-400 bg-clip-text text-transparent animate-gradient block animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              a Wave
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            An Accessible Gesture-to-Speech Board
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.5s' }}>
            Experience touchless communication powered by real-time, on-device AI.
            Select and speak custom phrases, all with simple hand gestures.
            <span className="text-cyan font-semibold"> No cloud. No lag. 100% local.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => setShowDemo(true)}
              className="glow-button bg-gradient-to-r from-cyan to-purple-500 px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover-scale-lg transition-transform-500 animate-scale-in" 
              style={{ animationDelay: '0.6s' }}
            >
              Try Live Demo
            </button>
            <button className="border-button border-2 border-cyan px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover-lift transition-transform-500 animate-scale-in" style={{ animationDelay: '0.7s' }}>
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
            <button className="border-button border-2 border-purple-500 px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover-lift transition-transform-500 animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-sm font-semibold hover-lift transition-transform-500 animate-scale-in" style={{ animationDelay: '0.9s' }}>On-device AI</span>
            <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold hover-lift transition-transform-500 animate-scale-in" style={{ animationDelay: '1s' }}>Optimized for Arm</span>
            <span className="px-4 py-2 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-sm font-semibold hover-lift transition-transform-500 animate-scale-in" style={{ animationDelay: '1.1s' }}>Runs in Browser</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-cyan rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* --- 3. ABOUT SECTION UPDATED --- */}
      <section ref={aboutRef} id="about" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-black mb-8 text-center">
            What is <span className="text-gradient">GestureSpeak</span>?
          </h2>

          <div className="glass-card p-12 md:p-16 rounded-3xl mb-12 hover-lift transition-all-300">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              <span className="text-cyan font-bold">GestureSpeak</span> is a web-based assistive tool that turns your webcam into a touchless communication board. It uses on-device AI to recognize simple hand gestures.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Users can cycle through a  fully customizable list of phrases  (like "Yes," "No," or "I need help") using gestures like  Point Up  or  Victory . The  Thumb Up  gesture selects and speaks the phrase aloud. Every computation happens locally—no cloud dependency, no latency, no privacy concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-2xl text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan to-purple-500 rounded-lg flex items-center justify-center glow-icon animate-rotate-glow">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan">On-Device Processing</h3>
              <p className="text-gray-400 text-sm">All AI inference runs locally—no data sent to servers.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-cyan rounded-lg flex items-center justify-center glow-icon animate-rotate-glow">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan">Real-Time Response</h3>
              <p className="text-gray-400 text-sm">Sub-100ms gesture recognition with zero cloud latency.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan to-purple-500 rounded-lg flex items-center justify-center glow-icon animate-rotate-glow">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan">Privacy First</h3>
              <p className="text-gray-400 text-sm">Your gestures never leave your device or browser.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. HOW IT WORKS SECTION UPDATED --- */}
      <section id="how-it-works" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-black mb-20 text-center">
            How It <span className="text-gradient">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent glow-line"></div>

            <div className="step-card glass-card p-10 rounded-3xl text-center hover-lift transition-all-300 relative z-10 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan to-purple-500 rounded-full flex items-center justify-center glow-icon transform -rotate-12 hover:rotate-0 transition-transform-500 animate-float-up">
                <Eye className="w-12 h-12" />
              </div>
              <div className="text-4xl font-black mb-4 text-cyan">01</div>
              <h3 className="text-2xl font-bold mb-4">Detect</h3>
              <p className="text-gray-400 text-lg">
                AI identifies your hand and 21 finger landmarks using MediaPipe, tracking your pose in 3D space.
              </p>
            </div>

            <div className="step-card glass-card p-10 rounded-3xl text-center hover-lift transition-all-300 relative z-10 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-cyan rounded-full flex items-center justify-center glow-icon transform rotate-12 hover:rotate-0 transition-transform-500 animate-float-down">
                <Cpu className="w-12 h-12" />
              </div>
              <div className="text-4xl font-black mb-4 text-purple-400">02</div>
              <h3 className="text-2xl font-bold mb-4">Decode</h3>
              <p className="text-gray-400 text-lg">
                A lightweight neural network decodes your pose into a specific command, such as "Thumb Up" or "Point Up."
              </p>
            </div>

            <div className="step-card glass-card p-10 rounded-3xl text-center hover-lift transition-all-300 relative z-10 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan to-purple-500 rounded-full flex items-center justify-center glow-icon transform -rotate-12 hover:rotate-0 transition-transform-500 animate-float-up">
                <Zap className="w-12 h-12" />
              </div>
              <div className="text-4xl font-black mb-4 text-cyan">03</div>
              <h3 className="text-2xl font-bold mb-4">Control</h3>
              <p className="text-gray-400 text-lg">
                The command triggers an action—cycling through a list, or using the browser's speech API to speak a phrase aloud.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-black mb-8 text-center">
            See It In <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Demoed live on an Arm-based mobile device
          </p>
          <div className="glass-card p-2 rounded-3xl">
            <div className="aspect-video bg-gradient-to-br from-cyan/10 to-purple-500/10 rounded-2xl flex items-center justify-center border border-cyan/30">
              <div className="text-center">
                <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-cyan to-purple-500 rounded-full flex items-center justify-center glow-icon animate-pulse">
                  <Play className="w-14 h-14" />
                </div>
                <p className="text-2xl font-bold text-gray-300">Demo Video Coming Soon</p>
                <p className="text-gray-500 mt-3">YouTube / Local Video Embed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={techRef} id="tech-stack" className="py-32 px-6 relative">
        <TechStack />
      </section>

      <section ref={teamRef} id="team" className="py-32 px-6 relative">
        <TeamSection />
      </section>

      {/* --- 5. FOOTER UPDATED --- */}
      <footer className="py-20 px-6 border-t border-cyan/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              Built for the <span className="text-cyan font-bold">Arm AI Developer Challenge 2025</span>
            </p>
            <p className="text-xl mb-8 text-gray-400">
              Built with passion by <span className="text-cyan font-semibold">Nithyashree CS</span>
            </p>
          </div>

          <div className="flex justify-center gap-8 mb-12">
            <a href="https://github.com/Nithyacoorg2005" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors flex items-center gap-2">
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/nithyashreecoorg-cs-82b1b02b1/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors flex items-center gap-2">
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:nitya@aisx.dev" className="hover:text-cyan transition-colors flex items-center gap-2">
              <Mail className="w-6 h-6" />
              <span>Email</span>
            </a>
          </div>

          <p className="text-sm text-gray-600">
            © 2025 GestureSpeak – The Future is Touchless. All rights reserved.
          </p>
        </div>
      </footer>
      
      {showDemo && <LiveDemo onClose={() => setShowDemo(false)} />}
    </div>
  );
}

export default App;