import React from "react";
import {motion} from "framer-motion";
import Button from "@/components/common/Button";
import {FaTelegramPlane} from "react-icons/fa";

const TelegramBanner: React.FC = () => {
    return (
        <motion.div
            className="mt-16 text-center"
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: false}}
            transition={{duration: 0.8, ease: "easeOut"}}
        >
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-white text-center drop-shadow-lg mb-10 tracking-wide">
                Prefer Chat? Try Our Telegram Bot!
            </h1>
            <p className="text-secondary-500 mb-6">
                Instantly generate AI content directly from Telegram. Fast, easy, and convenient.
            </p>

            <div className="flex justify-center items-center w-full mt-8 h-12">
                <Button
                    label="Generate on Telegram"
                    onClick={() => window.open("https://t.me/logicai_telegrambot", "_blank")}
                    icon={<FaTelegramPlane/>}
                    iconPosition="left"
                    color="primary"
                    fullWidth={false}
                />
            </div>
        </motion.div>
    );
};

export default TelegramBanner;
