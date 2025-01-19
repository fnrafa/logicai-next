import React, {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import {FaDownload, FaTimes} from "react-icons/fa";
import Modal from "@/components/common/Modal";
import axios from "axios";
import {saveAs} from "file-saver";

interface CodeData {
    id: string;
    prompt: string;
    language: string;
    code: string;
}

const ProgramPage: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [language, setLanguage] = useState("Python");
    const [codes, setCodes] = useState<CodeData[]>([]);
    const [selectedCode, setSelectedCode] = useState<CodeData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWRmMTQxYzQtYTI2Zi00MzNjLWE1M2UtNThmNDllNmM1MzU2IiwidHlwZSI6ImFwaV90b2tlbiJ9.wRO-219xxSGELbjS4VV9KFabAcCfYWNsLObTeEGnVQA"; // Ganti dengan API Key Eden

    const handleGenerateCode = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const {data} = await axios.post(
                "https://api.edenai.run/v2/text/code_generation",
                {
                    providers: "openai",
                    prompt: prompt,
                    instruction: `Write a function in ${language.toLowerCase()}`,
                    temperature: 0.1,
                    max_tokens: 500,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(data)
            const generatedCode = data["openai/gpt-4o"]?.standardized_response?.generated_text;

            const newCode: CodeData = {
                id: Date.now().toString(),
                prompt: prompt,
                language: language,
                code: generatedCode,
            };

            setCodes((prevCodes) => [newCode, ...prevCodes]);
        } catch (error: object) {
            console.error("Error generating code:", error.message);
            alert("❌ Failed to generate code. Please try again.");
        } finally {
            setLoading(false);
            setPrompt("");
        }
    };

    const openModal = (code: CodeData) => {
        setSelectedCode(code);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCode(null);
    };

    const handleDownload = (code: string, language: string) => {
        const blob = new Blob([code], {type: "text/plain;charset=utf-8"});
        const extension = language === "Python" ? "py" : language === "JavaScript" ? "js" : "cpp";
        saveAs(blob, `generated_code.${extension}`);
    };

    return (
        <div className="flex bg-background relative min-h-screen">
            <Sidebar/>

            <main className="flex-1 p-6 lg:ml-64 flex flex-col items-center">


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-16">
                    {codes.map((code) => (
                        <div
                            key={code.id}
                            onClick={() => openModal(code)}
                            className="cursor-pointer bg-secondary-400 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white truncate">{code.prompt}</h3>
                                <p className="text-sm text-gray-400 mt-2">{code.language}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-4xl bg-primary-800 p-8 rounded-2xl shadow-xl fixed bottom-8">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-900 text-center drop-shadow-lg mb-6 flex items-center justify-center gap-2">
                        Text to Code Generator
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <InputField
                            name="prompt"
                            value={prompt}
                            onChange={setPrompt}
                            placeholder="Describe the program you want to generate..."
                            className="flex-1"
                        />

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="px-3 py-2 rounded-lg border-2 border-accent-400 bg-transparent text-white"
                        >
                            <option>Python</option>
                            <option>JavaScript</option>
                            <option>C++</option>
                        </select>

                        <Button
                            label={loading ? "Generating..." : "Generate"}
                            onClick={handleGenerateCode}
                            color="accent"
                            disabled={loading}
                            className="px-6 py-2 text-sm"
                        />
                    </div>
                </div>

                {selectedCode && isModalOpen && (
                    <Modal onClose={closeModal}>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 text-lg"
                        >
                            <FaTimes/>
                        </button>

                        <div className="p-4 text-left">
                            <h2 className="text-xl font-bold text-white mb-2">{selectedCode.prompt}</h2>
                            <pre className="bg-secondary-700 text-white p-4 rounded-lg max-h-64 overflow-y-auto">
                {selectedCode.code}
              </pre>

                            <div className="mt-6 flex gap-3">
                                <Button
                                    label="Download Code"
                                    onClick={() => handleDownload(selectedCode.code, selectedCode.language)}
                                    icon={<FaDownload/>}
                                    color="accent"
                                />
                            </div>
                        </div>
                    </Modal>
                )}
            </main>
        </div>
    );
};

export default ProgramPage;
