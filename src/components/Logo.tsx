export function Logo({ className = "w-16 h-16", variant = "default" }: { className?: string, variant?: "default" | "white" }) {
  const isWhite = variant === "white";
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M35 60C21.1929 60 10 48.8071 10 35C10 21.1929 21.1929 10 35 10C37.5 10 40 10.5 42.2 11.3C47.5 4.5 56 0 65 0C81.5685 0 95 13.4315 95 30C95 31.2 94.9 32.3 94.7 33.4C103.3 36.5 110 44.8 110 55C110 68.8071 98.8071 80 85 80H35C21.1929 80 10 68.8071 10 55C10 41.1929 21.1929 30 35 30" fill={isWhite ? "white" : "url(#paint0_linear)"} opacity={isWhite ? "0.5" : "0.2"}/>
      <path d="M40 65C26.1929 65 15 53.8071 15 40C15 26.1929 26.1929 15 40 15C42.5 15 45 15.5 47.2 16.3C52.5 9.5 61 5 70 5C86.5685 5 100 18.4315 100 35C100 36.2 99.9 37.3 99.7 38.4C108.3 41.5 115 49.8 115 60C115 73.8071 103.8071 85 90 85H40Z" fill={isWhite ? "white" : "url(#paint1_linear)"}/>
      <path d="M70 25V45M60 35H80" stroke={isWhite ? "#3B76F6" : "white"} strokeWidth="6" strokeLinecap="round"/>
      {!isWhite && (
        <defs>
          <linearGradient id="paint0_linear" x1="10" y1="0" x2="110" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6096FD" />
            <stop offset="1" stopColor="#3B76F6" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="15" y1="5" x2="115" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8BB2FF" />
            <stop offset="1" stopColor="#3B76F6" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
