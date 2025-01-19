import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import Image from "next/image";
import { FaDownload, FaTimes } from "react-icons/fa";
import Modal from "@/components/common/Modal";
import axios from "axios";

interface MeshData {
    id: string;
    prompt: string;
    previewImage: string;
    modelUrls: {
        glb: string;
        fbx: string;
    };
}

const ThreeDPage: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [models, setModels] = useState<MeshData[]>([]);
    const [selectedModel, setSelectedModel] = useState<MeshData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const apiKey = "msy_KMOffiMnQsIMK8ykplHS1eMQqerlsCyJ2f84";

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const { data } = await axios.post(
                "https://api.meshy.ai/openapi/v2/text-to-3d",
                {
                    mode: "preview",
                    prompt,
                    art_style: "realistic",
                    should_remesh: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const taskId = data.result;
            let result = null;

            while (!result || result.status !== "SUCCEEDED") {
                const response = await axios.get(`https://api.meshy.ai/openapi/v2/text-to-3d/${taskId}`, {
                    headers: { Authorization: `Bearer ${apiKey}` },
                });

                result = response.data;
                if (result.status !== "SUCCEEDED") {
                    await new Promise((res) => setTimeout(res, 5000));
                }
            }

            const newModel: MeshData = {
                id: result.id,
                prompt: result.prompt,
                previewImage: result.thumbnail_url,
                modelUrls: {
                    glb: result.model_urls.glb,
                    fbx: result.model_urls.fbx,
                },
            };

            setModels((prevModels) => [newModel, ...prevModels]);
        } catch (error) {
            console.error("Error generating 3D model:", error);
        } finally {
            setLoading(false);
            setPrompt("");
        }
    };

    const openModal = (model: MeshData) => {
        setSelectedModel(model);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedModel(null);
    };

    return (
        <div className="flex bg-background relative min-h-screen">
            <Sidebar />

            <main className="flex-1 p-4 md:p-6 lg:ml-64 flex flex-col items-center">
                <div className="w-full max-w-5xl bg-primary-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                    <Image
                        src="/assets/image/logicai-1.png"
                        alt="3D Model Generator"
                        fill
                        className="absolute inset-0 opacity-20 blur-sm rounded-xl"
                        style={{ objectFit: "cover" }}
                    />

                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-white text-center drop-shadow-lg mb-6 flex items-center justify-center gap-2">
                            Create a Stuning 3D Model
                        </h1>

                        <div className="flex w-full gap-4">
                            <InputField
                                name="prompt"
                                value={prompt}
                                onChange={setPrompt}
                                placeholder="Describe your 3D model idea..."
                                className="flex-1"
                            />
                            <Button
                                label={loading ? "Generating..." : "Generate"}
                                onClick={handleGenerate}
                                color="primary"
                                disabled={loading}
                                className="px-6 py-2 text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
                    {models.map((model) => (
                        <div
                            key={model.id}
                            onClick={() => openModal(model)}
                            className="cursor-pointer bg-secondary-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                            <img src={model.previewImage} alt={model.prompt} className="w-full h-48 object-cover" />
                            <div className="p-3">
                                <h3 className="text-md font-medium text-white truncate">{model.prompt}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedModel && isModalOpen && (
                    <Modal onClose={closeModal}>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 text-lg"
                        >
                            <FaTimes />
                        </button>

                        <div className="p-4 text-center">
                            <img
                                src={selectedModel.previewImage}
                                alt={selectedModel.prompt}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-bold text-white">{selectedModel.prompt}</h2>

                            <div className="mt-6 flex gap-3 justify-center">
                                <a
                                    href={selectedModel.modelUrls.glb}
                                    download
                                    className="flex items-center px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 text-sm"
                                >
                                    <FaDownload className="mr-2" /> Download GLB
                                </a>
                                <a
                                    href={selectedModel.modelUrls.fbx}
                                    download
                                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                                >
                                    <FaDownload className="mr-2" /> Download FBX
                                </a>
                            </div>
                        </div>
                    </Modal>
                )}
            </main>
        </div>
    );
};

export default ThreeDPage;
