export function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="7" fill="#10b981" />
      {/* Code slash — forward track line */}
      <path d="M19 8L11 24" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
      {/* Progress chevron */}
      <path
        d="M23 13L27 17L23 21"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Dot anchor */}
      <circle cx="10" cy="22" r="2" fill="white" />
    </svg>
  )
}
