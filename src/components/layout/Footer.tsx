import React from "react";
import {FaMediumM, FaTelegram} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-primary-900 text-secondary py-8">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

                    <div className="text-center lg:text-left">
                        <h2 className="text-xl lg:text-2xl font-extrabold text-white">
                            Logic<span className="text-accent-500">AI</span>
                        </h2>
                        <p className="text-sm lg:text-base text-secondary-400 max-w-sm">
                            Empowering your ideas with cutting-edge AI solutions.
                            Innovate, automate, and elevate with LogicAI.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="https://t.me/LogicAIETH" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaTelegram size={24}/>
                        </a>
                        <a href="https://x.com/logicaiofficial" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaXTwitter size={24}/>
                        </a>
                        <a href="https://medium.com/@logicagentai" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaMediumM size={24}/>
                        </a>
                    </div>
                </div>

                <div className="mt-8 border-t border-secondary-700 pt-4 text-center">
                    <p className="text-xs text-secondary-500">
                        © 2025 LogicAI. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
