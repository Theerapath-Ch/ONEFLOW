"use client";

import { useMemo, useState, useEffect } from "react";

import {
    Search,
    Menu,
    TrendingUp,
    Blocks,
} from "lucide-react";
import Card from "../component/Cards";
import {
    Category,
    CategoryId,
    Tools,
} from "../types/tools";
import Navbar from "./Navbar";
import Titletext from "./Titletext";
// import  LogosIcon  from "./Logo";


const CATEGORIES: Category[] = [
    {
        id: "all",
        label: "All",
    },
    {
        id: "tech",
        label: "Technology",
    },
    {
        id: "finance",
        label: "Finance",
    },
    {
        id: "energy",
        label: "Energy",
    },
    {
        id: "healthcare",
        label: "Healthcare",
    },
];

const TOOLS: Tools[] = [
    {
        id: 1,
        symbol: "AAPL",
        name: "Apple Inc",
        category: "tech",
        price: "$227.16",
        change: "+1.24%",
        positive: true,
        color: "#FFFFFF",
    },
    {
        id: 2,
        symbol: "AMD",
        name: "AMD INC",
        category: "tech",
        price: "$164.38",
        change: "+2.81%",
        positive: true,
        color: "#FFFFFF",
    },
    {
        id: 3,
        symbol: "TSLA",
        name: "Tesla Inc",
        category: "tech",
        price: "$248.98",
        change: "-0.72%",
        positive: false,
        color: "#FF3B4A",
    },
    {
        id: 4,
        symbol: "NVDA",
        name: "NVIDIA INC",
        category: "tech",
        price: "$142.51",
        change: "+3.42%",
        positive: true,
        color: "#76B900",
    },
    {
        id: 5,
        symbol: "MSFT",
        name: "Microsoft Corp",
        category: "tech",
        price: "$421.27",
        change: "+0.94%",
        positive: true,
        color: "#42A5F5",
    },
    {
        id: 6,
        symbol: "AMZN",
        name: "Amazon.com Inc",
        category: "tech",
        price: "$198.46",
        change: "+1.73%",
        positive: true,
        color: "#FF9900",
    },
    {
        id: 7,
        symbol: "JPM",
        name: "JPMorgan Chase",
        category: "finance",
        price: "$217.33",
        change: "+0.48%",
        positive: true,
        color: "#2D7FF9",
    },
    {
        id: 8,
        symbol: "XOM",
        name: "Exxon Mobil",
        category: "energy",
        price: "$112.82",
        change: "-1.12%",
        positive: false,
        color: "#F6A623",
    },
];

export default function Content() {


    const [active, setActive] = useState<CategoryId>("all");

    const [query, setQuery] = useState<string>("");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();

        return TOOLS.filter((tool) => {
            const categoryMatch =
                active === "all" ||
                tool.category === active;

            const searchMatch =
                !q ||
                tool.symbol
                    .toLowerCase()
                    .includes(q) ||
                tool.name
                    .toLowerCase()
                    .includes(q);

            return categoryMatch && searchMatch;
        });
    }, [active, query]);

    return (
        <div className="bg min-h-screen overflow-hidden bg-[#070809] font-sans text-white">
            <Navbar />
            <section className="mx-auto max-w-[850px] px-6 pt-[68px] text-center">
                <Titletext/>
                {/* SEARCH */}
                <div className="search-box mx-auto mt-10 flex h-[42px] w-[410px] items-center rounded-[5px] border border-white/[0.12] bg-white/[0.22] px-3 backdrop-blur-[10px]">
                    <input
                        type="text"
                        value={query}
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                        ) => setQuery(e.target.value)}
                        placeholder="Search Tool" 
                        className="flex-1 border-none bg-transparent text-[11px] text-white outline-none placeholder:text-[#92929A]"
                    />
                    <Search
                        size={16}
                        className="text-[#D2D2D6]"
                    />
                </div>
                {/* Popular Tools */}
                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-3 text-[10.5px]">
                    <span className="text-[#D7D4DC]">
                        Popular Tools :
                    </span>
                    {[
                        "Parking-POS",
                        "EasyEng Read",
                    ].map((tool) => (
                        <button
                            key={tool}
                            onClick={() => setQuery(tool)}
                            className="cursor-pointer border-0 bg-transparent p-0 text-[10.5px] text-[#C4A8A8] transition hover:text-white"
                        >
                            {tool}
                        </button>
                    ))}
                </div>
            </section>
            {/* ================= Tools ================= */}
            <main className="mx-auto max-w-[1180px] px-8 pb-[100px] pt-[72px]">
                {/* <div className="mb-7 flex items-center justify-between">
                    <h2 className="text-[26px] font-semibold tracking-[-0.025em]">
                        Top Tools
                    </h2>
                    <TrendingUp
                        size={20}
                        className="text-[#9A9AA1]"
                    />
                </div> */}
                {/* CATEGORY */}
                <div className="mb-[26px] flex gap-[25px] overflow-x-auto border-b border-white/[0.07]">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() =>
                                setActive(category.id)
                            }
                            className={`whitespace-nowrap border-b-2 px-0 pb-3 text-[12.5px] font-semibold transition ${active === category.id
                                ? "border-[#FF8067] text-white"
                                : "border-transparent text-[#77777F] hover:text-white"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                {/* GRID */}
                {results.length === 0 ? (
                    <div className="py-[60px] text-center text-sm text-[#77777F]">
                        No tools found.
                    </div>
                ) : (
                    <div className="tool-grid grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[14px]">

                        {results.map((tool) => (
                            <Card
                                key={tool.id}
                                tools={tool}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}