// components/SolarSystemBackground.tsx - ULTRA EPIC 3D Background 🌌

export const SolarSystemBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Central Eclipse with 3 Rotating Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Eclipse Core */}
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(255,255,255,0.1)]"></div>
        
        {/* Ring 1 - Fastest */}
        <div className="absolute w-64 h-64 border-2 border-white/10 rounded-full animate-[spin_20s_linear_infinite] shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ left: '-64px', top: '-64px' }}></div>
        
        {/* Ring 2 - Medium */}
        <div className="absolute w-80 h-80 border-2 border-purple-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse] shadow-[0_0_30px_rgba(168,85,247,0.1)]" style={{ left: '-96px', top: '-96px' }}></div>
        
        {/* Ring 3 - Slowest */}
        <div className="absolute w-96 h-96 border-2 border-blue-500/10 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_30px_rgba(59,130,246,0.1)]" style={{ left: '-128px', top: '-128px' }}></div>
      </div>

      {/* 4 Orbital Light Spheres with Double Effects */}
      {/* Sphere 1 - Top (20s) */}
      <div 
        className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          {/* Main Sphere */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_60px_rgba(34,211,238,0.8)] animate-pulse"></div>
          {/* Blurred Halo */}
          <div className="absolute inset-0 w-8 h-8 rounded-full bg-cyan-400/50 blur-xl animate-ping"></div>
        </div>
      </div>

      {/* Sphere 2 - Right (15s) */}
      <div 
        className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8">
          {/* Main Sphere */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-[0_0_60px_rgba(236,72,153,0.8)] animate-pulse"></div>
          {/* Blurred Halo */}
          <div className="absolute inset-0 w-6 h-6 rounded-full bg-pink-400/50 blur-xl animate-ping"></div>
        </div>
      </div>

      {/* Sphere 3 - Bottom (25s) */}
      <div 
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite]"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          {/* Main Sphere */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-[0_0_60px_rgba(52,211,153,0.8)] animate-pulse"></div>
          {/* Blurred Halo */}
          <div className="absolute inset-0 w-7 h-7 rounded-full bg-green-400/50 blur-xl animate-ping"></div>
        </div>
      </div>

      {/* Sphere 4 - Left (18s) */}
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite_reverse]"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8">
          {/* Main Sphere */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_60px_rgba(251,191,36,0.8)] animate-pulse"></div>
          {/* Blurred Halo */}
          <div className="absolute inset-0 w-5 h-5 rounded-full bg-yellow-400/50 blur-xl animate-ping"></div>
        </div>
      </div>

      {/* 12 Floating Particles with Random Positions */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        ></div>
      ))}

      {/* 3 Large Blurred Orbs with Double Animation (pulse + float) */}
      {/* Orb 1 - Blue */}
      <div 
        className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
        style={{
          animation: 'pulse 4s ease-in-out infinite, float 6s ease-in-out infinite',
        }}
      ></div>

      {/* Orb 2 - Purple */}
      <div 
        className="absolute bottom-32 left-32 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
        style={{
          animation: 'pulse 5s ease-in-out infinite, float 8s ease-in-out infinite 1s',
        }}
      ></div>

      {/* Orb 3 - Cyan */}
      <div 
        className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{
          animation: 'pulse 6s ease-in-out infinite, float 7s ease-in-out infinite 2s',
        }}
      ></div>

      {/* Scanning Lines - Vertical */}
      <div 
        className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-scan-vertical"
      ></div>

      {/* Scanning Lines - Horizontal */}
      <div 
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-scan-horizontal"
      ></div>

      {/* Rotating Geometric Shapes */}
      {/* Diamond */}
      <div 
        className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-white/10 rotate-45 animate-[spin_30s_linear_infinite]"
      ></div>

      {/* Hexagon (approximated with rotated squares) */}
      <div className="absolute bottom-1/4 right-1/4">
        <div className="w-12 h-12 border-2 border-purple-500/10 rotate-60 animate-[spin_25s_linear_infinite_reverse]"></div>
      </div>

      {/* Triangle */}
      <div 
        className="absolute top-2/3 left-1/3 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-cyan-500/10 animate-[spin_20s_linear_infinite]"
      ></div>
    </div>
  );
};
