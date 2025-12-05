import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <svg 
      viewBox="0 0 420 120" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Zema Logo"
    >
      {/* Z with speed lines */}
      <path d="M60 20H110L60 100H110" stroke="#E11D48" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 45H75" stroke="#E11D48" strokeWidth="10" strokeLinecap="round"/>
      <path d="M20 75H70" stroke="#E11D48" strokeWidth="10" strokeLinecap="round"/>
      <path d="M10 60H30" stroke="#E11D48" strokeWidth="10" strokeLinecap="round"/>
      
      {/* e - stylized */}
      <path d="M140 60C140 37.9086 157.909 25 180 25H190C212.091 25 230 37.9086 230 60V70H140C140 86.5685 153.431 100 170 100C185 100 195 95 200 90" stroke="#E11D48" strokeWidth="20" strokeLinecap="round"/>
      <circle cx="185" cy="60" r="10" fill="#E11D48"/>

      {/* m - rounded */}
      <path d="M250 100V50C250 38 258 30 270 30C282 30 290 38 290 50V100" stroke="#E11D48" strokeWidth="20" strokeLinecap="round"/>
      <path d="M290 50C290 38 298 30 310 30C322 30 330 38 330 50V100" stroke="#E11D48" strokeWidth="20" strokeLinecap="round"/>
      
      {/* a - rounded */}
      <circle cx="370" cy="70" r="25" stroke="#E11D48" strokeWidth="20"/>
      <path d="M395 40V100" stroke="#E11D48" strokeWidth="20" strokeLinecap="round"/>
    </svg>
  );
};