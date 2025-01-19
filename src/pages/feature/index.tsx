import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import ServiceCard from "@/components/feature/FeatureCard";
import {FaTelegramPlane} from "react-icons/fa";
import Button from "@/components/common/Button";

const Feature: React.FC = () => {
    const featureData = [
        {
            title: "Text to 3D Models",
            path: "/3d",
            image: "/assets/image/3D.webp",
            description: "Create and explore high-quality 3D models powered by AI.",
        },
        {
            title: "Text to Music",
            path: "/music",
            image: "/assets/image/Music.webp",
            description: "Compose and discover unique AI-generated music.",
        },
        {
            title: "Text to Programs",
            path: "/program",
            image: "/assets/image/Program.webp",
            description: "Generate efficient code snippets with AI assistance.",
        },
        {
            title: "Text to NFT",
            path: "/nft",
            image: "/assets/image/NFT.webp",
            description: "Generate efficient code snippets with AI assistance.",
        },
        {
            title: "Text to Metaverse",
            path: "/metaverse",
            image: "/assets/image/Metaverse.webp",
            description: "Generate efficient code snippets with AI assistance.",
        },
        {
            title: "Text to Game",
            path: "/game",
            image: "/assets/image/Game.webp",
            description: "Generate efficient code snippets with AI assistance.",
        },
    ];

    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 p-6 lg:ml-64">
                <div className="relative py-10 px-2 md:px-10 rounded-2xl overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-900 text-center drop-shadow-lg mb-10 tracking-wide">
                            Unlock the Power of
                            <span className="text-white"> Logic</span>
                            <span className="text-accent-400">AI</span>
                        </h1>

                        <p className="text-secondary-500 text-center mb-8 text-lg max-w-3xl mx-auto">
                            Explore our cutting-edge AI services designed to transform your ideas into reality. Whether
                            it&#39;s 3D models, music, or code generation, LogicAI has you covered.
                        </p>

                        <div className="flex flex-col gap-8">
                            {featureData.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    title={service.title}
                                    path={service.path}
                                    image={service.image}
                                    description={service.description}
                                    layout="horizontal"
                                />
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <h2 className="text-3xl font-semibold text-secondary-700 mb-4">
                                Prefer Chat? Try Our Telegram Bot!
                            </h2>
                            <p className="text-secondary-500 mb-6">
                                Instantly generate AI content directly from Telegram. Fast, easy, and convenient.
                            </p>

                            <div className="flex justify-center items-center w-full mt-8">
                                <Button
                                    label="Generate on Telegram"
                                    onClick={() => window.open("https://t.me/YourAIBot", "_blank")}
                                    icon={<FaTelegramPlane/>}
                                    iconPosition="left"
                                    color="primary"
                                    fullWidth={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Feature;
