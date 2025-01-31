import React from "react";
import Image from "next/image";

interface LoaderProps {
    size?: "small" | "medium" | "large";
}

const Loader: React.FC<LoaderProps> = ({
                                           size = "medium",
                                       }) => {
    const sizeClass =
        size === "small" ? "w-8 h-8" : size === "large" ? "w-20 h-20" : "w-14 h-14";
    const sizeValue =
        size === "small" ? 48 : size === "large" ? 80 : 72;

    return (
        <div
            role="status"
            className={`flex justify-center items-center ${sizeClass}`}
        >
            <Image
                src="/assets/gif/2.gif"
                alt="Loading..."
                width={sizeValue}
                height={sizeValue}
                priority
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;
