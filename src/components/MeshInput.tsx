import React, {useState} from "react";
import Button from "@/components/common/Button";

interface MeshInputProps {
    onGenerate: (prompt: string) => void;
}

const MeshInput: React.FC<MeshInputProps> = ({onGenerate}) => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setLoading(true);
        onGenerate(prompt);
        setPrompt("");
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4">
            <input
                type="text"
                placeholder="Enter your 3D model prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary-700 text-white placeholder-gray-400 border border-accent-400 focus:ring-2 focus:ring-accent-500"
                disabled={loading}
            />
            <Button
                type="submit"
                className={`px-6 py-3 rounded-lg text-white font-bold ${
                    loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-accent-500 to-accent-700 hover:opacity-90"
                }`}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate"}
            </Button>
        </form>
    );
};

export default MeshInput;
