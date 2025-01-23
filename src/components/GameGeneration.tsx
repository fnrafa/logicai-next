import React, {useState} from "react";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import Image from "next/image";

const GameGeneration: React.FC = () => {
    const [form, setForm] = useState({
        prompt: "Simple Tetris Game",
    });

    const handleGenerateMesh = () => {
        alert("Coming soon! 🚀");
    };

    return (
        <div className="flex flex-col space-y-6 p-6 bg-primary-900 text-white lg:rounded-lg max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-4">Game Content Generation</h2>
            <div className="w-full bg-primary-700 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Generation Result</h2>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg">{`Task ID: 40314855-1b7a-4916-9197-b17fab494ed0`}</p>
                    <Image
                        src="/assets/images/dummy-result.jpg"
                        alt="Generated 3D content"
                        width={300}
                        height={200}
                        className="rounded-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
                <InputField
                    name="prompt"
                    value={form.prompt}
                    onChange={(value) => setForm({prompt: value})}
                    placeholder="Enter your Game generation prompt"
                />
                <div className="h-12 w-48 flex justify-center">
                    <Button
                        label="Generate"
                        onClick={handleGenerateMesh}
                        color="secondary"
                    />
                </div>
            </div>
            <div>
                <div className="h-12 w-full px-4 flex justify-center">
                    <Button
                        label="Show Advanced Options"
                        onClick={() => alert("No advanced options available.")}
                        color="secondary"
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
};

export default GameGeneration;
