import React from "react";

interface Props {
    label?: string;
    onClick: () => void;
    color?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
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
                                 }) => {
    const baseStyles =
        "font-semibold flex items-center justify-center gap-2 rounded-lg text-sm px-6 py-2 lg:px-8 lg:py-3 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 border-2 hover:border-none";

    const primaryStyles =
        "bg-gradient-to-r from-accent-500 to-accent-600 text-white border-accent-500 hover:from-accent-400 hover:to-accent-500 focus:ring-accent-500";

    const secondaryStyles =
        "bg-gradient-to-r from-transparent to-transparent text-white border-accent-500 hover:bg-gradient-to-r hover:from-accent-500 hover:to-accent-600 focus:ring-accent-400";

    return (
        <button
            onClick={onClick}
            type={type as "button" | "submit" | "reset"}
            className={`${baseStyles} ${
                color === "primary" ? primaryStyles : secondaryStyles
            } ${fullWidth ? "w-full" : "w-auto"}`}
        >
            {icon && iconPosition === "left" && <span>{icon}</span>}
            {children || label}
            {icon && iconPosition === "right" && <span>{icon}</span>}
        </button>
    );
};

export default Button;
