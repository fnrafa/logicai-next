import React from "react";

interface Prop {
    text: string;
    color?: "primary" | "secondary";
    className?: string;
}

const Badge: React.FC<Prop> = ({text, color = "primary", className = ''}) => {
    return (
        <span
            className={`text-lg font-bold inline-flex items-center px-2 py-0.5 rounded border-2 ${
                color === "primary"
                    ? "bg-secondary text-primary-700 border-primary-700"
                    : "bg-primary-700 text-secondary border-secondary"
            } ${className}`}
        >
            {text}
        </span>
    );
};

export default Badge;
