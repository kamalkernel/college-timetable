"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function AirplaneDecorations() {
  const [plane1Msg, setPlane1Msg] = useState(false);
  const [plane2Msg, setPlane2Msg] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
      {/* 2D Soft Cartoon Clouds */}
      <div className="absolute top-2 left-4 sm:left-16 animate-cloud-drift opacity-80">
        <svg width="130" height="50" viewBox="0 0 140 60" fill="white" className="drop-shadow-sm">
          <ellipse cx="40" cy="40" rx="35" ry="20" />
          <ellipse cx="75" cy="30" rx="35" ry="25" />
          <ellipse cx="105" cy="42" rx="30" ry="18" />
        </svg>
      </div>

      <div className="absolute top-12 right-6 sm:right-28 animate-cloud-drift opacity-75" style={{ animationDelay: "-6s" }}>
        <svg width="150" height="60" viewBox="0 0 170 70" fill="white" className="drop-shadow-sm">
          <ellipse cx="50" cy="45" rx="40" ry="25" />
          <ellipse cx="90" cy="35" rx="45" ry="30" />
          <ellipse cx="130" cy="48" rx="35" ry="20" />
        </svg>
      </div>

      <div className="absolute bottom-16 left-1/3 animate-cloud-drift opacity-70 hidden md:block" style={{ animationDelay: "-11s" }}>
        <svg width="130" height="50" viewBox="0 0 130 55" fill="white" className="drop-shadow-sm">
          <ellipse cx="38" cy="38" rx="35" ry="18" />
          <ellipse cx="72" cy="28" rx="32" ry="22" />
          <ellipse cx="102" cy="38" rx="28" ry="16" />
        </svg>
      </div>

      {/* BIG 2D AIRPLANE 1: Red & White Monoplane Banking (Bottom Left) */}
      <motion.div
        className="pointer-events-auto absolute -left-2 bottom-3 sm:left-4 sm:bottom-8 z-10 w-40 h-40 sm:w-60 sm:h-60 cursor-pointer"
        whileHover={{ scale: 1.08, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setPlane1Msg(true);
          setTimeout(() => setPlane1Msg(false), 2500);
        }}
        title="Click to salute the captain!"
      >
        {plane1Msg && (
          <div className="absolute -top-6 left-12 bg-white border-2 border-black rounded-lg px-2 py-0.5 text-[10px] font-black font-mono shadow-[2px_2px_0px_#000] text-red-600 animate-bounce z-20">
            ✈️ Radar Contact: ON TIME!
          </div>
        )}

        <svg viewBox="0 0 220 220" className="w-full h-full drop-shadow-2xl">
          {/* Jet speed wind lines */}
          <line x1="20" y1="195" x2="65" y2="155" stroke="#ffffff" strokeWidth="4" strokeDasharray="8,6" opacity="0.9"/>
          <line x1="5" y1="170" x2="55" y2="130" stroke="#ffffff" strokeWidth="5" strokeDasharray="10,6" opacity="0.95"/>
          <line x1="45" y1="210" x2="85" y2="180" stroke="#ffffff" strokeWidth="3" strokeDasharray="6,6" opacity="0.8"/>
          
          <g transform="translate(45, 20)">
            {/* Main Wings */}
            <path d="M 60 40 L -8 100 L 14 112 L 60 72 Z" fill="#e11d48" stroke="#000000" strokeWidth="3.5" />
            <path d="M 60 40 L 128 100 L 106 112 L 60 72 Z" fill="#e11d48" stroke="#000000" strokeWidth="3.5" />
            <path d="M 60 46 L 8 95 L 18 102 L 60 67 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 60 46 L 112 95 L 102 102 L 60 67 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            
            {/* Fuselage Body */}
            <ellipse cx="60" cy="68" rx="18" ry="58" fill="#f8fafc" stroke="#000000" strokeWidth="3.5" />
            
            {/* Nose cone & Red Tip */}
            <path d="M 44 32 Q 60 6 76 32 Z" fill="#e11d48" stroke="#000000" strokeWidth="3.5" />
            
            {/* Cockpit Glass */}
            <ellipse cx="60" cy="46" rx="9" ry="15" fill="#0284c7" stroke="#000000" strokeWidth="2.5" />
            <ellipse cx="58" cy="43" rx="4" ry="9" fill="#ffffff" opacity="0.75" />
            
            {/* Tail Stabilizers */}
            <path d="M 60 105 L 36 138 L 49 140 L 60 122 Z" fill="#e11d48" stroke="#000000" strokeWidth="3" />
            <path d="M 60 105 L 84 138 L 71 140 L 60 122 Z" fill="#e11d48" stroke="#000000" strokeWidth="3" />
            
            {/* Propeller Hub & Blur */}
            <ellipse cx="60" cy="10" rx="28" ry="5.5" fill="#38bdf8" opacity="0.9" stroke="#000000" strokeWidth="1.5" />
            <circle cx="60" cy="10" r="5" fill="#000000" />
          </g>
        </svg>
      </motion.div>

      {/* BIG 2D AIRPLANE 2: Orange & Yellow Biplane (Top Right) */}
      <motion.div
        className="pointer-events-auto absolute -right-2 top-4 sm:right-6 sm:top-6 z-10 w-44 h-40 sm:w-64 sm:h-56 cursor-pointer"
        whileHover={{ scale: 1.08, rotate: 4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setPlane2Msg(true);
          setTimeout(() => setPlane2Msg(false), 2500);
        }}
        title="Click to rev the propeller!"
      >
        {plane2Msg && (
          <div className="absolute -bottom-4 right-10 bg-amber-300 border-2 border-black rounded-lg px-2 py-0.5 text-[10px] font-black font-mono shadow-[2px_2px_0px_#000] text-black animate-bounce z-20">
            🛩️ Cleared for Takeoff!
          </div>
        )}

        <svg viewBox="0 0 240 190" className="w-full h-full drop-shadow-2xl">
          {/* Contrail flight path */}
          <path d="M 0 150 Q 60 120 120 140" fill="none" stroke="#ffffff" strokeWidth="5" strokeDasharray="10,8" opacity="0.9"/>
          
          <g transform="translate(45, 10)">
            {/* Lower Wing */}
            <rect x="-5" y="72" width="145" height="24" rx="12" fill="#ea580c" stroke="#000000" strokeWidth="3.5" />
            
            {/* Upper Wing */}
            <rect x="-15" y="32" width="165" height="26" rx="13" fill="#f97316" stroke="#000000" strokeWidth="3.5" />
            
            {/* Struts */}
            <line x1="15" y1="45" x2="15" y2="75" stroke="#000000" strokeWidth="3.5" />
            <line x1="120" y1="45" x2="120" y2="75" stroke="#000000" strokeWidth="3.5" />
            
            {/* Fuselage Body */}
            <path d="M 45 38 L 90 38 L 82 130 L 53 130 Z" fill="#fbbf24" stroke="#000000" strokeWidth="3.5" />
            <rect x="54" y="80" width="27" height="42" fill="#f59e0b" stroke="#000000" strokeWidth="2" />
            
            {/* Cockpit */}
            <ellipse cx="67" cy="65" rx="11" ry="13" fill="#0284c7" stroke="#000000" strokeWidth="2.5" />
            <ellipse cx="65" cy="62" rx="5" ry="7" fill="#ffffff" opacity="0.75" />
            
            {/* Tail Wing */}
            <rect x="35" y="120" width="65" height="13" rx="6" fill="#ea580c" stroke="#000000" strokeWidth="3" />
            <path d="M 67 114 L 67 142 L 78 142 Z" fill="#ea580c" stroke="#000000" strokeWidth="2.5" />
            
            {/* Propeller spinner */}
            <ellipse cx="67" cy="30" rx="36" ry="6" fill="#f8fafc" opacity="0.9" stroke="#000000" strokeWidth="2" />
            <circle cx="67" cy="30" r="6" fill="#e11d48" stroke="#000000" strokeWidth="2" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
