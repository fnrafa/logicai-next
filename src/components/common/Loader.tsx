import React, {JSX} from "react";
import { FaCog, FaAtom } from "react-icons/fa";

interface LoaderProps {
    color?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    type?: "spin" | "pulse" | "bounce";
}

const Loader: React.FC<LoaderProps> = ({
                                           color = "primary",
                                           size = "medium",
                                           type = "spin",
                                       }) => {
    const colorClass = color === "primary" ? "text-accent-500" : "text-secondary-500";
    const sizeClass = size === "small" ? "w-8 h-8" : size === "large" ? "w-20 h-20" : "w-14 h-14";

    const SpinLoader = () => (
        <FaCog className={`${sizeClass} ${colorClass} animate-spin`} />
    );

    const PulseLoader = () => (
        <FaAtom className={`${sizeClass} ${colorClass} animate-pulse`} />
    );

    const BounceLoader = () => (
        <div className={`relative ${sizeClass}`}>
            <div className={`w-full h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 animate-bounce`}></div>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/20 to-transparent rounded-full blur-sm opacity-70"></div>
        </div>
    );

    const loaderMap: Record<string, JSX.Element> = {
        spin: <SpinLoader />,
        pulse: <PulseLoader />,
        bounce: <BounceLoader />,
    };

    return (
        <div role="status" className="flex justify-center items-center">
            {loaderMap[type]}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;
