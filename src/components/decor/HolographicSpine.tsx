const VERTEBRAE_Y = [6, 46, 86, 126, 166, 206, 246, 286, 326, 366, 406];

/** The wireframe holographic spine used in the hero — same path data as the original static build. */
export function HolographicSpine({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute inset-0 rounded-full bg-primary/25 blur-2xl" />
      <svg className="relative h-full w-full overflow-visible" viewBox="0 0 80 460">
        <defs>
          <linearGradient id="spineGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c43dff" />
            <stop offset="100%" stopColor="#ff4fa3" />
          </linearGradient>
        </defs>
        <rect x={2} y={0} width={76} height={460} rx={38} fill="none" stroke="url(#spineGrad)" strokeWidth={1} opacity={0.35} />
        <line x1={40} x2={40} y1={4} y2={456} stroke="url(#spineGrad)" strokeWidth={1} opacity={0.4} />
        <g fill="rgba(196,61,255,0.1)" stroke="url(#spineGrad)" strokeWidth={1.2}>
          {VERTEBRAE_Y.map((y) => (
            <rect key={y} x={23} y={y} width={34} height={26} rx={10} />
          ))}
        </g>
        <g opacity={0.5} stroke="url(#spineGrad)" strokeWidth={0.8}>
          {VERTEBRAE_Y.map((y) => (
            <g key={y}>
              <line x1={23} x2={6} y1={y + 13} y2={y + 6} />
              <line x1={57} x2={74} y1={y + 13} y2={y + 6} />
            </g>
          ))}
        </g>
      </svg>
      <div className="absolute inset-x-[6%] h-[18px] animate-[scanMove_4s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,79,163,0.9),transparent)] blur-[3px]" />
      <style>{`
        @keyframes scanMove {
          0% { transform: translateY(-10%); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
