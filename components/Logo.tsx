import Link from "next/link";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 52, showText = true, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 no-underline group ${className}`}>
      {/* Doodle-style SVG logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
        style={{ filter: "drop-shadow(1px 1px 0 #2a5e2a)" }}
      >
        {/* Outer doodle circle - slightly wobbly */}
        <path
          d="M50 8
            C62 7, 76 10, 84 20
            C93 31, 95 45, 92 58
            C88 72, 78 83, 65 89
            C52 95, 37 94, 26 86
            C14 77, 7 63, 8 49
            C9 35, 17 20, 29 13
            C37 8, 44 9, 50 8Z"
          fill="#c8e6c8"
          stroke="#2a5e2a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner highlight circle */}
        <path
          d="M50 16
            C59 15, 70 18, 77 26
            C85 35, 86 47, 83 57
            C79 69, 70 78, 58 82
            C47 86, 35 83, 27 74
            C18 65, 16 51, 20 40
            C24 28, 35 17, 50 16Z"
          fill="#e8f5e8"
          stroke="none"
        />

        {/* Doodle X - hand drawn style */}
        <g stroke="#2a5e2a" strokeWidth="5" strokeLinecap="round">
          {/* X left top to right bottom */}
          <path d="M32 30 C38 38, 46 47, 52 55 C56 60, 62 67, 68 72" />
          {/* X right top to left bottom */}
          <path d="M68 30 C62 38, 54 47, 48 55 C44 60, 38 67, 32 72" />
        </g>

        {/* Magnifying glass handle - doodle style */}
        <path
          d="M72 74 L84 87"
          stroke="#2a5e2a"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Small scan dots for decoration */}
        <circle cx="20" cy="50" r="2.5" fill="#2a5e2a" opacity="0.6" />
        <circle cx="80" cy="50" r="2.5" fill="#2a5e2a" opacity="0.6" />
        <circle cx="50" cy="20" r="2" fill="#2a5e2a" opacity="0.5" />

        {/* Doodle radar sweep lines */}
        <path d="M50 50 L72 28" stroke="#2a5e2a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
        <path d="M50 50 L75 55" stroke="#2a5e2a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
      </svg>

      {showText && (
        <div className="flex flex-col -gap-1 leading-none">
          <span
            className="font-heading text-green-ink tracking-tight leading-none"
            style={{ fontSize: size * 0.45 }}
          >
            xscanx
          </span>
          <span
            className="font-mono text-ink-muted leading-none"
            style={{ fontSize: size * 0.16 }}
          >
            X profile scanner
          </span>
        </div>
      )}
    </Link>
  );
}
