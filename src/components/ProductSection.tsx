import React, {useEffect, useRef} from "react";
import {motion} from "framer-motion";
import {FaRegCompass, FaMagic} from "react-icons/fa";
import {useRouter} from "next/router";
import Button from "@/components/common/Button";
import Image from "next/image";

const scrollingImages = [
    "/assets/image/3D.webp",
    "/assets/image/Music.webp",
    "/assets/image/Program.webp",
    "/assets/image/NFT.webp",
    "/assets/image/Metaverse.webp",
    "/assets/image/Game.webp",
];

const ProductionSection = () => {
    const router = useRouter();
    const topScrollRef = useRef(null);
    const bottomScrollRef = useRef(null);

    useEffect(() => {
        const scrollContinuously = (container, speed) => {
            let step = 0;

            const scroll = () => {
                if (!container) return;
                step += speed;
                if (step >= container.scrollWidth / 2) step = 0;
                if (step <= 0) step = container.scrollWidth / 2;
                container.style.transform = `translateX(-${step}px)`;
                requestAnimationFrame(scroll);
            };

            scroll();
        };

        if (topScrollRef.current) scrollContinuously(topScrollRef.current, 0.5);
        if (bottomScrollRef.current) scrollContinuously(bottomScrollRef.current, -0.5);
    }, []);

    return (
        <motion.section
            id="product"
            className="flex relative w-full h-[700px] overflow-hidden text-white items-center justify-center"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 0.8}}
        >
            <div className="flex absolute top-0 left-0 w-full h-1/2 overflow-hidden z-0 items-center justify-start">
                <div
                    ref={topScrollRef}
                    className="flex gap-4 will-change-transform"
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        transform: "translateX(0)",
                        width: `${scrollingImages.length * 2 * 24}rem`,
                    }}
                >
                    {scrollingImages.concat(scrollingImages).map((src, index) => (
                        <div
                            key={`top-${index}`}
                            className="relative w-96 h-72 flex-shrink-0"
                        >
                            <Image
                                src={src}
                                alt={`Scrolling Top ${index}`}
                                layout="fill"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{objectFit: "cover"}}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex absolute bottom-0 left-0 w-full h-1/2 overflow-hidden z-0 items-center justify-start">
                <div
                    ref={bottomScrollRef}
                    className="flex gap-4 will-change-transform"
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        transform: "translateX(0)",
                        width: `${scrollingImages.length * 2 * 24}rem`,
                    }}
                >
                    {scrollingImages.concat(scrollingImages).map((src, index) => (
                        <div
                            key={`bottom-${index}`}
                            className="relative w-96 h-72 flex-shrink-0"
                        >
                            <Image
                                src={src}
                                alt={`Scrolling Bottom ${index}`}
                                layout="fill"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{objectFit: "cover"}}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="relative z-10 flex flex-col items-center justify-center w-screen text-center bg-primary-900 bg-opacity-90 mx-auto p-12 md:p-18">
                <h1 className="text-2xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-white text-center tracking-wide">
                    Transform Ideas into Reality with AI-Powered Creativity
                </h1>
                <p className="mt-4 text-sm md:text-xl">
                    LogicAI empowers you to transform text into innovative 3D models, music, programs, NFTs, metaverse
                    assets, and games. Unleash your creativity with cutting-edge AI tools designed to explore, create,
                    and innovate effortlessly.
                </p>
                <div className="flex h-12 justify-center gap-4 w-full items-center mt-6">
                    <div className="flex w-36 justify-center items-center">
                        <Button
                            label="Discovery"
                            onClick={() => router.push("/discovery")}
                            icon={<FaRegCompass/>}
                            iconPosition="left"
                            color="secondary"
                        />
                    </div>
                    <div className="flex w-36 justify-center items-center">
                        <Button
                            label="Generate"
                            onClick={() => router.push("/feature")}
                            icon={<FaMagic/>}
                            iconPosition="left"
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ProductionSection;
