import React from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import {motion} from "framer-motion";

interface FeatureCardProps {
    title: string;
    path: string;
    image: string;
    description: string;
    layout?: "horizontal" | "vertical";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
                                                     title,
                                                     path,
                                                     image,
                                                     description,
                                                     layout = "vertical",
                                                 }) => {
    const router = useRouter();

    return (
        <motion.div
            className={`group relative bg-primary-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform ${
                layout === "horizontal" ? "flex flex-col md:flex-row" : ""
            }`}
            initial={{opacity: 0, x: 0}}
            viewport={{once: false}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
        >
            <div className="relative w-full md:w-1/3 h-52 md:h-auto">
                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{objectFit: "cover"}}
                    className="transition-transform duration-500 opacity-80"
                />
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 w-full">
                <div>
                    <h3 className="text-2xl font-bold text-secondary-700 mb-2">
                        {title}
                    </h3>
                    <p className="text-secondary-400 mb-4">{description}</p>
                </div>
                <div className="w-full">
                    <Button
                        label="Try Now"
                        onClick={() => router.push(path)}
                        color="primary"
                        fullWidth={true}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureCard;
