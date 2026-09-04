"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isFlying: boolean;
  onComplete: () => void;
}

export function AirshowFlyby({ isFlying, onComplete }: Props) {
  return (
    <AnimatePresence>
      {isFlying && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Swooping Supersonic Jet / Biplane across screen */}
          <motion.div
            className="absolute -left-32 top-1/3"
            initial={{ x: "-10vw", y: "40vh", scale: 0.6, rotate: -20 }}
            animate={{
              x: ["0vw", "40vw", "70vw", "120vw"],
              y: ["35vh", "15vh", "28vh", "10vh"],
              scale: [0.7, 1.2, 1.1, 0.9],
              rotate: [-25, 5, -15, -30],
            }}
            transition={{ duration: 3.2, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
          >
            {/* Plane and heart smoke trail */}
            <div className="relative flex items-center">
              {/* Heart Smoke Contrail */}
              <div className="absolute right-12 top-6 flex items-center gap-2 opacity-90">
                <span className="text-xl animate-ping">💖</span>
                <span className="text-lg opacity-80">✨</span>
                <span className="text-sm opacity-60">☁️</span>
                <span className="text-xs opacity-40">💨</span>
              </div>

              {/* 2D Special Flyby Aeroplane */}
              <svg width="120" height="90" viewBox="0 0 120 90" className="drop-shadow-2xl">
                {/* Wings */}
                <path d="M 60 20 L 10 65 L 25 70 L 60 45 Z" fill="#e11d48" stroke="#000000" strokeWidth="2.5" />
                <path d="M 60 20 L 110 65 L 95 70 L 60 45 Z" fill="#e11d48" stroke="#000000" strokeWidth="2.5" />
                <path d="M 60 25 L 20 62 L 30 66 L 60 42 Z" fill="#fbcfe8" />
                <path d="M 60 25 L 100 62 L 90 66 L 60 42 Z" fill="#fbcfe8" />
                
                {/* Fuselage */}
                <ellipse cx="60" cy="45" rx="12" ry="38" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
                
                {/* Canopy */}
                <ellipse cx="60" cy="30" rx="6" ry="10" fill="#38bdf8" stroke="#000000" strokeWidth="2" />
                
                {/* Nose & Tail */}
                <path d="M 50 18 Q 60 2 70 18 Z" fill="#e11d48" stroke="#000000" strokeWidth="2.5" />
                <path d="M 60 70 L 45 88 L 52 89 L 60 78 Z" fill="#e11d48" stroke="#000000" strokeWidth="2" />
                <path d="M 60 70 L 75 88 L 68 89 L 60 78 Z" fill="#e11d48" stroke="#000000" strokeWidth="2" />
                
                {/* Propeller Spinner */}
                <ellipse cx="60" cy="5" rx="18" ry="3" fill="#fbbf24" opacity="0.9" />
                <circle cx="60" cy="5" r="3.5" fill="#e11d48" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
