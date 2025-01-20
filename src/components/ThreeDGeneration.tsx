import React, {useState} from "react";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";

const ThreeDGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const alert = useAlert();

    const handleGenerate = async () => {
        alert("You need to login to generate 3D content. Please log in.", "error");
        return;
    };

    return (
        <div className="flex flex-col space-y-6 p-6 bg-primary-900 text-white lg:rounded-lg max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-4">Start 3D Content Generation</h2>
            <div className="w-full bg-primary-700 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Generation Result</h2>
                <p className="text-secondary-400">No generation in progress. Start a new one below!</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
                <InputField
                    name="prompt"
                    value={prompt}
                    onChange={(value) => setPrompt(value)}
                    placeholder="Enter your 3D generation prompt"
                />
                <div className="h-12 w-48 flex justify-center">
                    <Button
                        label={"Generate"}
                        onClick={handleGenerate}
                        color="secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default ThreeDGeneration;
