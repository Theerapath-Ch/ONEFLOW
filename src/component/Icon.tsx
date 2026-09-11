interface IconProps {
    symbol: string;
    color: string;
}

export default function Icon({
    symbol,
    color,
}: IconProps) {
    return (
        <div
            className="flex h-[58px] w-[58px] items-center justify-center rounded-[14px] border border-white/10 bg-[#272727]"
            style={{
                background:
                    symbol === "AMD"
                        ? "linear-gradient(135deg, #244ACF, #182C85)"
                        : "#272727",
            }}
        >
            {symbol === "AAPL" && (
                <span
                    className="text-[30px]"
                    style={{ color }}
                >
                    ●
                </span>
            )}

            {symbol === "AMD" && (
                <span className="text-[28px] font-black text-white">
                    ◩
                </span>
            )}

            {symbol === "TSLA" && (
                <span
                    className="text-[28px] font-black"
                    style={{ color }}
                >
                    T
                </span>
            )}

            {symbol === "NVDA" && (
                <span
                    className="text-[19px] font-black"
                    style={{ color }}
                >
                    ◉
                </span>
            )}

            {!["AAPL", "AMD", "TSLA", "NVDA"].includes(symbol) && (
                <span
                    className="text-[17px] font-extrabold"
                    style={{ color }}
                >
                    {symbol}
                </span>
            )}
        </div>
    );
}