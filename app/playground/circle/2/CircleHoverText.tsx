'use client'

import {
  Factory,
  User,
  Layers3,
  Network,
  Globe,
  Code2,
  Brain,
  Landmark,
  Cpu,
  ServerCog,
  DatabaseZap,
  Blocks,
  ShieldCheck,
  FileCode2,
  Sparkle,
  Cloud,
} from 'lucide-react'

import NParticles from './NParticles'

export default function BuiltForPage() {
  const innerIcons = [
    User,
    Layers3,
    Network,
    Globe,
    Code2,
    Brain,
    Landmark,
  ]

  const outerIcons = [
    Cpu,
    ServerCog,
    DatabaseZap,
    Blocks,
    ShieldCheck,
    FileCode2,
    Sparkle,
    Cloud,
  ]

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden w-full">
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-reverse-slower {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse-slower {
          animation: spin-reverse-slower 40s linear infinite;
        }

        .bg-gradient-radial {
          background-image:
            radial-gradient(circle at center, rgba(0, 0, 0, 0), #f2f2f2 80%, #fff 100%),
            linear-gradient(rgba(56,189,248,0.09) .1em, transparent .1em),
            linear-gradient(90deg, rgba(56,189,248,0.09) .1em, transparent .1em);
          background-size:
            100% 100%,
            2.5rem 2.5rem,
            2.5rem 2.5rem;
          background-color: #F2F6F9;
        }

        .orbit-ring {
          border: 2px solid rgba(20, 120, 255, 0.12);
          border-radius: 9999px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 36px;
          height: 36px;
          margin-top: -18px;
          margin-left: -18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background-color: rgba(20,120,255,0.08);
          backdrop-filter: blur(4px);
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-none z-0" />
            {/* bg-gradient-radial */}

      {/* Advanced NParticles */}
      {/* <NParticles
        quantity={190}
        className="absolute inset-0 z-10"
        color="#e0f2ff"
      /> */}

      {/* Outer orbit ring + icons */}
      <div className="orbit-ring w-[480px] h-[480px] z-0" />
      <div className="absolute w-[480px] h-[480px] animate-spin-reverse-slower z-10 bg-[#f7f7f740] rounded-full inset-shadow-lg">
        {outerIcons.map((Icon, i) => {
          const angle = (360 / outerIcons.length) * i
          const titles = [
            "CPU", "Server", "Database", "Blocks", "Shield", "Code", "Sparkle", "Cloud"
          ];
          return (
            <div
              key={i}
              className="group"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateY(-240px)`,
                transformOrigin: 'center',
              }}
            >
              <div className="orbit-icon text-blue-600/80 group-hover:bg-blue-100/80 transition-colors duration-200">
                <Icon className="w-5 h-5" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                <span className="px-2 py-1 rounded bg-white text-[10px] text-blue-700 font-medium whitespace-nowrap">
                  {titles[i]}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Inner orbit ring + icons */}
      <div className="orbit-ring w-[300px] h-[300px] z-10" />
      <div className="absolute w-[300px] h-[300px] animate-spin-slow z-20 bg-[#f7f7f737] rounded-full inset-shadow-2xl">
        {innerIcons.map((Icon, i) => {
          const angle = (360 / innerIcons.length) * i
          const titles = [
            "User", "Layers", "Network", "Globe", "Code", "Brain", "Landmark"
          ];
          return (
            <div
              key={i}
              className="group"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateY(-150px)`,
                transformOrigin: 'center',
              }}
            >
              <div className="orbit-icon text-blue-600/80 group-hover:bg-blue-100/80 transition-colors duration-200">
                <Icon className="w-5 h-5" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                <span className="px-2 py-1 rounded bg-white text-[10px] text-blue-700 font-medium whitespace-nowrap">
                  {titles[i]}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* <NParticles
        quantity={40}
        className="absolute inset-0 z-10"
        color="#e0f2ff"
      /> */}

      {/* Center logo and label */}
      <div className="relative z-30 text-center">
        {/* <Logo /> */}
        {/* <Factory className="w-20 h-20 mx-auto text-blue-600 mb-4" /> */}
        <h3 className="text-blue-900 text-xl md:text-2xl font-semibold tracking-tight">
          Built for Scale <br /> and Performance
        </h3>
      </div>
    </div>
  )
}
