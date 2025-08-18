'use client';

export default function TextGlowLight({ text = 'Eclipx' }: { text?: string }) {
  return (
    <div className="heroTLight">
      <h2>{text}</h2>
      <h2 aria-hidden>{text}</h2>
      <style jsx>{`
        .heroTLight {
          position: relative;
          left: 0; right: 0; margin: 0 auto;
          height: 20em;
          padding-top: 2em;
          translate: 0 -1.6em;
          opacity: 0;
          animation: load 2s ease-in-out 0.6s forwards;
        }
        .heroTLight > h2 {
          position: absolute; left: 0; right: 0; margin: auto;
          width: fit-content;

          font-family: 'Hubot-Sans', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
          font-size: 7em;
          font-weight: 600;
          color: #4b6cb7;

          background:
            radial-gradient( 2em 2em at 50% 50%,
              transparent calc(var(--p) - 2em),
              #a7c7ff calc(var(--p) - 1em),
              #4b6cb7 calc(var(--p) - 0.4em),
              transparent var(--p)
            ),
            linear-gradient(90deg, #a7c7ff 0%, #4b6cb7 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          text-shadow: 0 2px 24px rgba(71, 128, 255, .18);

          --p: 0%;
          transition: --p 3s linear;
          animation: pulse 10s linear 1.2s infinite;
        }
        .heroTLight h2:nth-child(2) {
          background:
            radial-gradient( 2em 2em at 50% 50%,
              transparent calc(var(--p) - 2em),
              transparent calc(var(--p) - 1em),
              #a7c7ff calc(var(--p) - 1em),
              #4b6cb7 calc(var(--p) - 0.4em),
              transparent calc(var(--p) - 0.4em),
              transparent var(--p)
            );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: blur(16px) opacity(0.5);
          animation: pulse 10s linear 1.2s infinite;
        }

        @keyframes load { 0% { opacity: 0 } 100% { opacity: 1 } }

        @keyframes pulse {
          0% { --p: 0%; }
          50% { --p: 300%; }
          100% { --p: 300%; }
        }

        @property --p {
          syntax: '<percentage>';
          inherits: false;
          initial-value: 0%;
        }
      `}</style>
    </div>
  );
}