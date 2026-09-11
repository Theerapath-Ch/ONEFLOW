import { ArrowUpRight } from "lucide-react";

import Icon from "../component/Icon";
import { Tools } from "../types/tools";

interface ToolCardProps {
    tools: Tools;
}

export default function ToolCard({
    tools,
}: ToolCardProps) {
    return (
        <div className="tool-card cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-[rgba(36,36,38,0.82)]">
            {/* Stock visual */}
            <div className="flex h-[145px] items-center justify-center bg-gradient-to-br from-white/[0.04] to-white/[0.01] px-[22px] py-[25px]">
                <Icon
                    symbol={tools.symbol}
                    color={tools.color}
                />
            </div>

            {/* Stock information */}
            <div className="px-[18px] pb-[17px] pt-[15px]">
                <div className="mb-[7px] flex items-center justify-between">
                    <span className="text-[13px] font-bold text-white">
                        {tools.symbol}
                    </span>

                    <span
                        className={`text-[11px] font-semibold ${tools.positive
                                ? "text-[#54D68A]"
                                : "text-[#FF6670]"
                            }`}
                    >
                        {tools.change}
                    </span>
                </div>

                <div className="text-[11px] uppercase tracking-[0.05em] text-[#85858C]">
                    {tools.name}
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-[15px] font-bold text-[#F5F5F7]">
                        {tools.price}
                    </span>

                    <ArrowUpRight
                        size={15}
                        className={
                            tools.positive
                                ? "text-[#54D68A]"
                                : "text-[#FF6670]"
                        }
                    />
                </div>
            </div>
        </div>
    );
}