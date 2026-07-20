"use client";

import { motion } from "framer-motion";

const NODES = [
  { cx: 60, cy: 90, delay: 0 },
  { cx: 95, cy: 20, delay: 0.3 },
  { cx: 155, cy: 20, delay: 0.6 },
  { cx: 190, cy: 85, delay: 0.9 },
  { cx: 175, cy: 140, delay: 1.2 },
  { cx: 120, cy: 160, delay: 1.5 },
  { cx: 65, cy: 148, delay: 1.8 },
  { cx: 45, cy: 100, delay: 2.1 },
];

/** The wireframe holographic brain used in the hero — same path data as the original static build. */
export function HolographicBrain({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute inset-0 rounded-full bg-tertiary/30 blur-3xl" />
      <svg className="relative h-full w-full overflow-visible" viewBox="0 0 240 200">
        <defs>
          <linearGradient id="brainGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff4fa3" />
            <stop offset="100%" stopColor="#9d4dff" />
          </linearGradient>
        </defs>
        <g fill="none" opacity={0.9} stroke="url(#brainGrad)" strokeWidth={1.4}>
          <path d="M60 90 C40 60 55 25 95 20 C110 5 140 5 155 20 C190 25 205 55 190 85 C205 100 200 130 175 140 C170 160 145 170 120 160 C100 172 75 165 65 148 C40 145 30 115 45 100 C40 96 45 90 60 90 Z" />
          <path d="M120 25 C120 60 120 130 118 158" strokeOpacity={0.5} />
          <path d="M75 40 C90 55 90 80 75 95" strokeOpacity={0.4} />
          <path d="M165 40 C150 55 150 80 165 95" strokeOpacity={0.4} />
          <path d="M60 110 C85 120 95 140 85 150" strokeOpacity={0.4} />
          <path d="M180 110 C155 120 145 140 155 150" strokeOpacity={0.4} />
        </g>
        <g fill="#ff9ed4">
          {NODES.map((node) => (
            <motion.circle
              key={`${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r={2.5}
              animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.4, 1] }}
              transition={{ duration: 2.4, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <circle cx={120} cy={92} r={3} fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
