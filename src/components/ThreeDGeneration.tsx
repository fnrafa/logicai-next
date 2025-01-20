import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {useRouter} from "next/router";
import {getToken} from "@/utils/user";

interface MeshGenerationForm {
    prompt: string;
    art_style: "realistic" | "cartoon" | "sculpture";
    mode: "preview" | "final";
}

interface TaskResponse {
    taskId: string;
    state: string;
    prompt: string;
    createdAt: string;
}

const ThreeDGeneration: React.FC = () => {
    const [form, setForm] = useState<MeshGenerationForm>({
        prompt: "",
        art_style: "realistic",
        mode: "preview",
    });
    const [task, setTask] = useState<TaskResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const alert = useAlert();
    const loader = useLoader();
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const handleChange = (field: keyof MeshGenerationForm, value: any) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleGenerateMesh = async () => {
        try {
            setIsLoading(true);
            loader(true);

            const token = getToken();
            if (!token) {
                alert("You need to login to generate 3D content. Please log in.", "error");
                return;
            }

            const payload = {
                prompt: form.prompt,
                art_style: form.art_style,
                mode: form.mode,
            };

            const response = await axios.post(`${API_BASE_URL}/mesh/generate`, payload, {
                headers: {Authorization: `Bearer ${token}`},
            });

            setTask(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to generate 3D content.", "error");
        } finally {
            setIsLoading(false);
            loader(false);
        }
    };

    const checkResult = useCallback(async () => {
        if (!task?.taskId) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/mesh/result/${task.taskId}`);
            const result = response.data.data;

            if (result.state === "SUCCEEDED") {
                await router.push(`/3d/${result.taskId}`);
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to check result.", "error");
        }
    }, [task?.taskId, API_BASE_URL, router, alert]);

    useEffect(() => {
        if (task?.state === "pending") {
            const interval = setInterval(() => {
                checkResult().then();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [task, checkResult]);

    return (
        <div className="flex flex-col space-y-6 p-6 bg-primary-900 text-white lg:rounded-lg max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-4">Start 3D Content Generation</h2>
            <div className="w-full bg-primary-700 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Generation Result</h2>
                {task ? (
                    <div className="text-lg">
                        <p>{`Task ID: ${task.taskId}`}</p>
                        <p>{`Status: ${task.state === "pending" ? "In Progress" : task.state}`}</p>
                    </div>
                ) : (
                    <p className="text-secondary-400">No generation in progress. Start a new one below!</p>
                )}
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
                <InputField
                    name="prompt"
                    value={form.prompt}
                    onChange={(value) => handleChange("prompt", value)}
                    placeholder="Enter your 3D generation prompt"
                />
                <div className="h-12 w-48 flex justify-center">
                    <Button
                        label={isLoading ? "Generating..." : "Generate"}
                        onClick={handleGenerateMesh}
                        color="secondary"
                        disabled={isLoading || task?.state === "pending"}
                    />
                </div>
            </div>
            <div>
                <div className="h-12 w-full px-4 flex justify-center">
                    <Button
                        label={showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        color="secondary"
                        fullWidth
                    />
                </div>
                {showAdvanced && (
                    <div className="mt-4 space-y-4">
                        <h3 className="text-lg font-semibold">Select Mode</h3>
                        <div className="flex gap-4">
                            <Button
                                label="Preview"
                                onClick={() => handleChange("mode", "preview")}
                                color={form.mode === "preview" ? "primary" : "secondary"}
                            />
                            <Button
                                label="Final"
                                onClick={() => handleChange("mode", "final")}
                                color={form.mode === "final" ? "primary" : "secondary"}
                            />
                        </div>
                        <h3 className="text-lg font-semibold">Select Art Style</h3>
                        <div className="flex gap-4">
                            <Button
                                label="Realistic"
                                onClick={() => handleChange("art_style", "realistic")}
                                color={form.art_style === "realistic" ? "primary" : "secondary"}
                            />
                            <Button
                                label="Cartoon"
                                onClick={() => handleChange("art_style", "cartoon")}
                                color={form.art_style === "cartoon" ? "primary" : "secondary"}
                            />
                            <Button
                                label="Sculpture"
                                onClick={() => handleChange("art_style", "sculpture")}
                                color={form.art_style === "sculpture" ? "primary" : "secondary"}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreeDGeneration;
