import React from "react";
import {motion} from "framer-motion";

interface Props {
    label?: string;
    onClick: () => void;
    color?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    disabled?: boolean;
}

const Button: React.FC<Props> = ({
                                     label,
                                     onClick,
                                     color = "primary",
                                     type = "button",
                                     children,
                                     fullWidth = false,
                                     icon,
                                     iconPosition = "left",
                                     disabled = false,
                                 }) => {
    const baseStyles =
        "relative font-semibold flex items-center justify-center gap-2 rounded-lg text-sm px-6 py-2 lg:px-8 lg:py-3 transition-transform duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden";

    const primaryStyles = `
    bg-gradient-to-r from-accent-500 to-accent-600 text-white 
    focus:ring-accent-500 
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent-500 before:to-accent-600 
    before:opacity-50 before:animate-gradient-slide before:z-0
    hover:before:opacity-100 hover:text-white
  `;

    const secondaryStyles = `
    bg-transparent text-accent-500 border-2 border-accent-500 
    focus:ring-accent-400 
    hover:text-white
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent-500 before:to-accent-600 
    before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20 before:z-0
  `;

    const contentStyles = "relative z-10 flex items-center gap-2";

    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
        <div
            className={`${
                fullWidth ? "w-full" : "w-auto"
            } flex justify-center items-center`}
        >
            <motion.div
                className={`relative ${fullWidth ? "w-full" : "w-auto"} ${
                    disabled ? "pointer-events-none" : ""
                }`}
                whileHover={{scale: disabled ? 1 : 1.05}}
                whileTap={{scale: disabled ? 1 : 0.95}}
            >
                <button
                    onClick={disabled ? undefined : onClick}
                    type={type as "button" | "submit" | "reset"}
                    disabled={disabled}
                    className={`${baseStyles} ${
                        color === "primary" ? primaryStyles : secondaryStyles
                    } ${disabled ? disabledStyles : ""} ${fullWidth ? "w-full" : "w-auto"}`}
                >
                    <span className={contentStyles}>
                        {icon && iconPosition === "left" && <span>{icon}</span>}
                        {children || label}
                        {icon && iconPosition === "right" && <span>{icon}</span>}
                    </span>
                </button>
            </motion.div>
        </div>
    );
};

export default Button;
