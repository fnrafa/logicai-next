import React from "react";
import Button from "@/components/common/Button";
import PromptExample from "@/components/PromptExample";
import {FaMagic, FaRegCompass} from "react-icons/fa";
import {useRouter} from "next/router";

const Banner: React.FC = () => {
    const router = useRouter();

    return (
        <section
            className="relative py-20 lg:py-32 flex flex-col items-center justify-start overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
            <div className="relative z-10 flex flex-col items-center mx-auto px-6 lg:px-10 gap-10">
                <div className="w-full lg:w-3/4 text-left md:text-center space-y-6">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-900 text-center drop-shadow-lg mb-10 tracking-wide">
                        Empower Your Vision with <span className="text-white">Logic</span><span
                        className="text-accent-400">AI</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-secondary-800">
                        LogicAI revolutionizes how ideas turn into reality. Unleash the power of artificial intelligence
                        to
                        automate, innovate, and elevate your business.
                    </p>
                </div>

                <div className="flex h-12 justify-center gap-4 w-full items-center">
                    <div className="flex w-36 justify-center items-center">
                        <Button label="Discovery" onClick={() => router.push("/feature")} icon={<FaRegCompass/>}
                                iconPosition="left" color="secondary"/>
                    </div>
                    <div className="flex w-36 justify-center items-center">
                        <Button label="Generate" onClick={() => router.push("/feature")} icon={<FaMagic/>}
                                iconPosition="left" color="primary"/>
                    </div>
                </div>
                <PromptExample/>
            </div>
        </section>
    );
};

export default Banner;
