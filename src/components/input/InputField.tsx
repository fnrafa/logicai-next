import React, {useState} from "react";

interface Props {
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
}

const InputField: React.FC<Props> = ({
                                         name,
                                         value,
                                         onChange,
                                         placeholder = "",
                                         type = "text",
                                         required = false,
                                     }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-5 py-3 bg-primary-700 text-white rounded-lg shadow-md transition-all duration-300 ${
                isFocused
                    ? "border-accent-500 ring-2 ring-accent-500"
                    : "border-primary-300 hover:border-accent-400"
            } focus:outline-none focus:ring-2 focus:ring-accent-500 placeholder-secondary-400`}
        />
    );
};

export default InputField;
