import { Cpu, Zap, Eye, Code, Server } from 'lucide-react';

export default function TechStack() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="section-title text-5xl md:text-6xl font-black mb-8 text-center animate-slide-up">
        Built with <span className="text-gradient">Cutting-Edge AI</span>
      </h2>

      <p className="text-xl text-gray-400 text-center mb-20 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Optimized for Arm processors with state-of-the-art machine learning frameworks
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
        {[
          { name: 'TensorFlow.js', icon: Cpu, desc: 'On-device ML inference' },
          { name: 'MediaPipe', icon: Eye, desc: 'Hand tracking & pose' },
          { name: 'Arm NN', icon: Zap, desc: 'Arm optimization' },
          { name: 'WebGL', icon: Code, desc: 'GPU acceleration' },
          { name: 'JavaScript', icon: Server, desc: 'Runtime engine' },
        ].map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div key={idx} className="glass-card p-6 rounded-2xl text-center hover-lift transition-all-300 group animate-scale-in" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan to-purple-500 rounded-lg flex items-center justify-center glow-icon group-hover:scale-110 transition-transform-500 animate-rotate-glow">
                <Icon className="w-7 h-7" />
              </div>
              <p className="font-bold text-gray-200 mb-1">{tech.name}</p>
              <p className="text-xs text-gray-500">{tech.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-2xl border border-cyan/30 hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <div className="text-3xl font-black text-cyan mb-3">
            On-device AI
          </div>
          <p className="text-gray-400">
            100% local inference—all ML models run on your device, no cloud calls, no data transmission.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-purple-500/30 hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '0.9s' }}>
          <div className="text-3xl font-black text-purple-400 mb-3">
            Optimized for Arm
          </div>
          <p className="text-gray-400">
            Lightweight models compiled for Arm processors, ensuring peak performance on smartphones and embedded devices.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-cyan/30 hover-lift transition-all-300 animate-scale-in" style={{ animationDelay: '1s' }}>
          <div className="text-3xl font-black text-cyan mb-3">
            Runs in Browser
          </div>
          <p className="text-gray-400">
            No app installation required—experience AISX directly in your web browser with zero latency.
          </p>
        </div>
      </div>
    </div>
  );
}
