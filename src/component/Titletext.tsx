"use client";
import {useState, useEffect } from "react";
const Titletext = () => {
    const texts = [
        "Discover Tools",
        "Make Something",
        "Smarter for You",
    ];
    const [textIndex, setTextIndex] = useState<number>(0);
    const [displayText, setDisplayText] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    useEffect(() => {
        const currentText = texts[textIndex];

        const typingSpeed = isDeleting ? 45 : 90;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(
                    currentText.substring(
                        0,
                        displayText.length + 1
                    )
                );

                if (displayText === currentText) {
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 1200);
                }
            } else {
                setDisplayText(
                    currentText.substring(
                        0,
                        displayText.length - 1
                    )
                );

                if (displayText === "") {
                    setIsDeleting(false);
                    setTextIndex(
                        (prev) =>
                            (prev + 1) % texts.length
                    );
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, textIndex]);
    return (

        <div>
            <h1 className="hero-title text-[clamp(42px,5vw,60px)] font-bold leading-[1.25] tracking-[-0.035em] text-[#F8F7FA]">
                <span>
                    {displayText}
                    <span className="typing-cursor" />
                </span>
            </h1>

            <p className="mt-[18px] text-sm tracking-[-0.01em] text-[#B7B4BF]">
                The best way to build your dream
            </p>
        </div>
    )
}

export default Titletext
