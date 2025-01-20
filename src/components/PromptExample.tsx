import React, {useEffect, useState} from "react";
import Image from "next/image";
import {SiOpenai} from "react-icons/si";

const prompts = [
    "Futuristic 3D female character with glowing cyan elements in a cyber world.",
    "AI-powered workspace with holographic displays and futuristic design.",
    "Cyberpunk city at night with neon lights and flying vehicles."
];

const images = [
    "/assets/image/logicai-1.png",
    "/assets/image/logicai-2.png",
    "/assets/image/logicai-3.png"
];

const PromptExample: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const switchInterval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % prompts.length;
            setActiveIndex(nextIndex);
        }, 5000);

        return () => clearInterval(switchInterval);
    }, [activeIndex]);

    return (
        <div className="w-full lg:w-3/4 flex flex-col items-center space-y-8 relative px-4">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                    src={images[activeIndex]}
                    alt={`Generated Example ${activeIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    style={{objectFit: "cover"}}
                    priority
                    className="rounded-xl"
                />
            </div>
            <div
                className="absolute bottom-4 -left-2 md:bottom-8 md:-left-2 lg:-left-8 bg-primary-800 bg-opacity-90 border border-accent-500 text-accent-400 text-xs md:text-sm lg:text-base px-3 md:px-4 lg:px-5 py-1.5 md:py-2 lg:py-3 rounded-lg shadow-xl max-w-[80%] md:max-w-md"
            >
                <p className="font-bold mb-1">Prompt:</p>
                <p className="font-mono break-words leading-tight">
                    {prompts[activeIndex]}
                </p>
            </div>
        </div>
    );
};

export default PromptExample;
