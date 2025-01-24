import React, {useEffect, useRef} from "react";
import {motion} from "framer-motion";
import Image from "next/image";

const product = [
    "/assets/product/1.png",
    "/assets/product/2.png",
    "/assets/product/3.png",
    "/assets/product/4.png",
    "/assets/product/5.png",
    "/assets/product/6.png",
    "/assets/product/7.png",
    "/assets/product/8.png",
    "/assets/product/9.png",
    "/assets/product/10.png",
    "/assets/product/11.png",
    "/assets/product/12.png",
    "/assets/product/13.png",
    "/assets/product/14.png",
    "/assets/product/15.png",
    "/assets/product/16.png",
    "/assets/product/17.png",
    "/assets/product/18.png",
    "/assets/product/19.png",
    "/assets/product/20.png",
];

const LogoComponent = () => {
    const scrollRef = useRef(null);

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

        if (scrollRef.current) scrollContinuously(scrollRef.current, 0.5);
    }, []);

    return (
        <motion.section
            id="product"
            className="flex w-full h-[64px] bg-accent-600 overflow-hidden text-white items-center justify-center"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 0.8}}
        >
            <div className="flex w-full overflow-hidden z-0 items-center justify-start">
                <div
                    ref={scrollRef}
                    className="flex gap-4 will-change-transform"
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        transform: "translateX(0)",
                        width: `${product.length * 2 * 24}rem`,
                    }}
                >
                    {product.concat(product).map((src, index) => (
                        <div
                            key={`top-${index}`}
                            className="relative w-60 h-36 flex-shrink-0"
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
        </motion.section>
    );
};

export default LogoComponent;
