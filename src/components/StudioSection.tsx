import React from "react";
import {motion} from "framer-motion";
import Button from "@/components/common/Button";
import Image from "next/image";
import {FaMagic} from "react-icons/fa";
import {useRouter} from "next/router";

const StudioSection = () => {
    const router = useRouter();

    return (
        <motion.section
            id="studio"
            className="relative flex flex-col lg:flex-row items-center justify-between bg-gradient-to-br from-primary-900 to-secondary-50 text-white h-screen px-8 lg:px-24 overflow-hidden"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 1}}
        >
            <div className="flex flex-col gap-6 items-center lg:items-start lg:w-1/2 text-center lg:text-left z-10">
                <motion.h1
                    className="text-4xl lg:text-5xl font-bold font-Nunito bg-clip-text text-transparent bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600"
                    initial={{y: -50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8}}
                >
                    Shaping the Future of 3D Creation and Ownership
                </motion.h1>
                <motion.p
                    className="text-secondary-800 mt-4 text-lg lg:text-xl"
                    initial={{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8, delay: 0.2}}
                >
                    At LogicAI, we’re reimagining how 3D assets are created, shared, and owned.
                    Combining advanced artificial intelligence with blockchain technology, we
                    provide a seamless platform where creators can unleash their creativity,
                    showcase their work, and monetize their assets as NFTs.
                </motion.p>
                <motion.div
                    className="mt-6"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8, delay: 0.4}}
                >
                    <div className="flex w-38 h-10 justify-center items-center">
                        <Button
                            label="Generate Now"
                            onClick={() => router.push("/feature")}
                            color="primary"
                            icon={<FaMagic/>}
                        />
                    </div>
                </motion.div>
            </div>

            <div
                className="relative lg:w-1/2 flex justify-center lg:justify-end items-center z-0 w-full h-full overflow-visible"
            >
                <motion.div
                    className="absolute w-[320px] h-[240px] lg:w-[480px] lg:h-[360px] transform rotate-3"
                    initial={{opacity: 0, scale: 0.95}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                >
                    <Image
                        src="/assets/image/studio.png"
                        alt="3D Creation"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default StudioSection;
