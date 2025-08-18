'use client'

import {
  Factory,
  User,
  Layers3,
  Network,
  Globe,
  Code2,
  Brain,
  ShoppingCart,
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

export default function BuiltForPage() {
  const innerIcons = [
    User,
    Layers3,
    Network,
    Globe,
    Code2,
    Brain,
    ShoppingCart,
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
    <>
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
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
          background-image: radial-gradient(circle at center, rgba(20, 120, 255, 0.12), white);
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
      <div className="absolute inset-0 bg-gradient-radial z-0" />

      {/* Outer orbit ring + icons */}
      <div className="orbit-ring w-[480px] h-[480px] z-0" />
      <div className="absolute w-[480px] h-[480px] animate-spin-reverse-slower z-10">
        {outerIcons.map((Icon, i) => {
          const angle = (360 / outerIcons.length) * i
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `
                  rotate(${angle}deg)
                  translateY(-240px)
                  rotate(-${angle}deg)
                `,
                transformOrigin: 'center',
              }}
            >
              <div className="orbit-icon text-blue-600/80">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Inner orbit ring + icons */}
      <div className="orbit-ring w-[300px] h-[300px] z-10" />
      <div className="absolute w-[300px] h-[300px] animate-spin-slow z-20">
        {innerIcons.map((Icon, i) => {
          const angle = (360 / innerIcons.length) * i
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `
                  rotate(${angle}deg)
                  translateY(-150px)
                  rotate(-${angle}deg)
                `,
                transformOrigin: 'center',
              }}
            >
              <div className="orbit-icon text-blue-600/80">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Center logo and label */}
      <div className="relative z-30 text-center">
        <Factory className="w-10 h-10 mx-auto text-blue-600 mb-4" />
        <h1 className="text-blue-900 text-xl md:text-2xl font-semibold leading-tight">
          Built for Scale <br /> and Performance
        </h1>
      </div>
    </div>
    //  button link to 2/circle
    <div className="fixed bottom-4 right-4">
      <a
        href="/playground/circle/2"
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
      >
        Go to Circle 2
      </a>
    </div>
    </>
  )
}
