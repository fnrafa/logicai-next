import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {useRouter} from "next/router";
import {getToken} from "@/utils/user";

interface MusicGenerationForm {
    prompt: string;
    gpt_description_prompt?: string;
    title?: string;
    tags?: string;
}

interface TaskResponse {
    taskId: string;
    state: string;
    title: string;
    tags: string;
    createdAt: string;
}

const MusicGeneration: React.FC = () => {
    const [form, setForm] = useState<MusicGenerationForm>({
        prompt: "",
        gpt_description_prompt: "",
        title: "",
        tags: "",
    });
    const [task, setTask] = useState<TaskResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const alert = useAlert();
    const loader = useLoader();
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const handleChange = (field: keyof MusicGenerationForm, value: any) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleGenerateMusic = async () => {
        try {
            setIsLoading(true);
            loader(true);

            const token = getToken();
            if (!token) {
                alert("You need login to generate a music. Please log in.", "error");
                return;
            }

            const isCustomMode = !!form.prompt.trim();
            const payload = {
                prompt: isCustomMode ? form.prompt : form.gpt_description_prompt,
                gpt_description_prompt: form.gpt_description_prompt,
                title: form.title,
                tags: form.tags,
                custom_mode: isCustomMode,
                mv: "sonic-v3-5",
            };

            const response = await axios.post(`${API_BASE_URL}/music/generate`, payload, {
                headers: {Authorization: `Bearer ${token}`},
            });

            setTask(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to generate music.", "error");
        } finally {
            setIsLoading(false);
            loader(false);
        }
    };

    const checkResult = useCallback(async () => {
        if (!task?.taskId) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/music/result/${task.taskId}`);
            const result = response.data.data;

            if (result.state === "succeeded") {
                await router.push(`/music/${result.taskId}`);
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
            <h2 className="text-3xl font-bold text-center mb-4">Start New Music Generation</h2>
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
                    name="gpt_description_prompt"
                    value={form.gpt_description_prompt || ""}
                    onChange={(value) => handleChange("gpt_description_prompt", value)}
                    placeholder="Enter a description prompt"
                />
                <div className="h-12 w-48 flex justify-center">
                    <Button
                        label={isLoading ? "Generating..." : "Generate"}
                        onClick={handleGenerateMusic}
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
                        <InputField
                            name="prompt"
                            value={form.prompt}
                            onChange={(value) => handleChange("prompt", value)}
                            placeholder="Enter your lyrics prompt (optional)"
                        />
                        <InputField
                            name="title"
                            value={form.title || ""}
                            onChange={(value) => handleChange("title", value)}
                            placeholder="Optional title"
                        />
                        <InputField
                            name="tags"
                            value={form.tags || ""}
                            onChange={(value) => handleChange("tags", value)}
                            placeholder="Optional tags (comma-separated)"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicGeneration;
