export default function LogosIcon() {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* L */}
            <path
                d="M8 8V30H30"
                stroke="url(#logosGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* O */}
            <rect
                x="14"
                y="10"
                width="18"
                height="18"
                rx="9"
                stroke="url(#logosGradient)"
                strokeWidth="4"
            />

            <defs>
                <linearGradient
                    id="logosGradient"
                    x1="8"
                    y1="8"
                    x2="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#6366F1" />
                    <stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
            </defs>
        </svg>
    );
}