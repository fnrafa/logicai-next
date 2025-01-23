import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Button from "@/components/common/Button";
import PromptExample from "@/components/PromptExample";
import {FaMagic, FaRegCompass} from "react-icons/fa";
import {useRouter} from "next/router";

const Banner: React.FC = () => {
    const router = useRouter();
    const [shapes, setShapes] = useState<Array<{ top: string; left: string; duration: string; delay: string }>>([]);

    useEffect(() => {
        const generatedShapes = Array.from({length: 15}).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: `${5 + Math.random() * 5}s`,
            delay: `${Math.random() * 3}s`,
        }));
        setShapes(generatedShapes);
    }, []);

    return (
        <section id="about"
                 className="relative py-20 lg:py-32 flex flex-col items-center justify-start overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
        >
            <div className="absolute inset-0 overflow-hidden z-10">
                {shapes.map((shape, index) => (
                    <div
                        key={index}
                        className="absolute w-16 h-16 md:w-20 md:h-20 rounded-lg opacity-30 animate-walk bg-accent-600"
                        style={{
                            top: shape.top,
                            left: shape.left,
                            animationDuration: shape.duration,
                            animationDelay: shape.delay,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="relative z-10 flex flex-col items-center mx-auto px-6 lg:px-10 gap-10"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <div className="w-full lg:w-3/4 text-left md:text-center space-y-6">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-900 text-center drop-shadow-lg mb-10 tracking-wide">
                        Empower Your Vision with <span className="text-white">Logic</span>
                        <span className="text-accent-400">AI</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-secondary-800">
                        LogicAI revolutionizes how ideas turn into reality. Unleash the power of artificial intelligence
                        to automate, innovate, and elevate your business.
                    </p>
                </div>

                <div className="flex h-12 justify-center gap-4 w-full items-center">
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
                <PromptExample/>
            </motion.div>
        </section>
    );
};

export default Banner;
