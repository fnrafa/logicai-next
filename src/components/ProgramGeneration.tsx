import React, {useState} from "react";
import axios from "axios";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {FaDownload, FaEye, FaFileArchive, FaRegPaperPlane, FaCode} from "react-icons/fa";
import JSZip from "jszip";
import {saveAs} from "file-saver";
import {getToken} from "@/utils/user";

interface ProgramGenerationForm {
    prompt: string;
}

interface GeneratedFile {
    fileName: string;
    content: string;
}

const ProgramGeneration: React.FC = () => {
    const [form, setForm] = useState<ProgramGenerationForm>({prompt: ""});
    const [generatedFile, setGeneratedFile] = useState<GeneratedFile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const alert = useAlert();
    const loader = useLoader();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const handleChange = (field: keyof ProgramGenerationForm, value: any) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const generateRandomString = () => Math.random().toString(36).substring(2, 10);

    const handleGenerate = async () => {
        if (!form.prompt.trim()) {
            alert("Please enter a prompt to generate code.", "error");
            return;
        }

        try {
            setIsLoading(true);
            loader(true);

            const token = getToken();
            if (!token) {
                alert("User token not found. Please log in.", "error");
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/code/generate`,
                {prompt: form.prompt, instruction: "Preferred HTML with style and script, no commentary"},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            const resultContent = response.data.data;
            setGeneratedFile({
                fileName: "index.html",
                content: resultContent,
            });
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to generate code.", "error");
        } finally {
            setIsLoading(false);
            loader(false);
        }
    };

    const handleDownloadFile = () => {
        if (generatedFile) {
            const blob = new Blob([generatedFile.content], {type: "text/html"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = generatedFile.fileName;
            link.click();
        }
    };

    const handleDownloadAsZip = async () => {
        if (generatedFile) {
            const zip = new JSZip();
            zip.file(generatedFile.fileName, generatedFile.content);

            const content = await zip.generateAsync({type: "blob"});
            const zipName = `${generateRandomString()}.zip`;
            saveAs(content, zipName);
        }
    };

    const handlePreviewWeb = () => {
        if (generatedFile) {
            const blob = new Blob([generatedFile.content], {type: "text/html"});
            const previewUrl = URL.createObjectURL(blob);
            window.open(previewUrl, "_blank");
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-primary-900 text-white lg:rounded-lg max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-4">Start Code Generation</h2>

            {generatedFile && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Generated Files</h2>
                    <div className="bg-primary-800 p-4 rounded-lg mb-4 flex items-center justify-between">
                        <span className="text-secondary-200">{generatedFile.fileName}</span>
                        <div className="flex gap-2">
                            <Button
                                label=""
                                icon={<FaCode/>}
                                onClick={() => setIsCodeModalOpen(true)}
                                color="primary"
                                title="Preview Code"
                            />
                            <Button
                                label=""
                                icon={<FaEye/>}
                                onClick={handlePreviewWeb}
                                color="secondary"
                                title="Preview Web"
                            />
                            <Button
                                label=""
                                icon={<FaDownload/>}
                                onClick={handleDownloadFile}
                                color="secondary"
                                title="Download File"
                            />
                        </div>
                    </div>
                    <Button
                        label="Download All as ZIP"
                        icon={<FaFileArchive/>}
                        onClick={handleDownloadAsZip}
                        color="secondary"
                        fullWidth
                    />
                </div>
            )}

            <div className="flex flex-row items-center gap-4 mb-4">
                <InputField
                    name="prompt"
                    value={form.prompt}
                    onChange={(value) => handleChange("prompt", value)}
                    placeholder="Enter your prompt to generate code"
                />
                <div className="h-12 flex justify-center items-center">
                    <Button
                        label=""
                        onClick={handleGenerate}
                        color="secondary"
                        icon={<FaRegPaperPlane/>}
                        disabled={isLoading || form.prompt.trim() === ""}
                    />
                </div>
            </div>

            {isCodeModalOpen && generatedFile && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4 z-50">
                    <div className="bg-primary-800 rounded-lg p-6 max-w-3xl w-full relative">
                        <h2 className="text-xl font-bold mb-4">Code Preview</h2>
                        <pre className="bg-primary-900 p-4 rounded-lg text-secondary-200 overflow-auto max-h-96">
                            {generatedFile.content}
                        </pre>
                        <button
                            onClick={() => setIsCodeModalOpen(false)}
                            className="absolute top-4 right-4 text-secondary-200 hover:text-white"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgramGeneration;
