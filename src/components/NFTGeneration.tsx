import React, { useState } from "react";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import { FaPaperPlane } from "react-icons/fa";
import NFTExample from "@/components/NFTExample";

const NFTGeneration: React.FC = () => {
    const [form, setForm] = useState({
        prompt: "Simple clear gold coin",
    });

    return (
        <div className="flex flex-col space-y-6 p-6 bg-primary-900 text-white lg:rounded-lg max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-4">NFT Content Generation</h2>
            <div className="w-full bg-primary-700 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Generation Result</h2>
                <NFTExample />
            </div>
            <div className="flex flex-row items-center gap-4 mb-4">
                <InputField
                    name="prompt"
                    value={form.prompt}
                    onChange={(value) => setForm({ prompt: value })}
                    placeholder="Enter your NFT generation prompt"
                />
                <Button
                    label=""
                    onClick={() => {}}
                    color="secondary"
                    icon={<FaPaperPlane />}
                    disabled={true}
                />
            </div>
        </div>
    );
};

export default NFTGeneration;
