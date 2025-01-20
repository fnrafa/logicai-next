import React, {useState} from "react";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import {FaPlay, FaDownload} from "react-icons/fa";
import axios from "axios";
import {getToken} from "@/utils/user";

interface ProgramGenerationForm {
    prompt: string;
    language: "javascript" | "python" | "c";
}

const ProgramGeneration: React.FC = () => {
    const [form, setForm] = useState<ProgramGenerationForm>({
        prompt: "",
        language: "javascript",
    });
    const [code, setCode] = useState("// Write your JavaScript code here\nconsole.log('Hello, World!');");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const alert = useAlert();
    const loader = useLoader();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const handleChange = (field: keyof ProgramGenerationForm, value: any) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleGenerate = async () => {
        if (!form.prompt) {
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
                {
                    prompt: code.toString(),
                    instruction: form.prompt,
                },
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );

            setCode(response.data.data || "// No code generated.");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to generate code.", "error");
        } finally {
            setIsLoading(false);
            loader(false);
        }
    };

    const handleRun = async () => {
        try {
            setOutput("Running...");
            loader(true);

            if (form.language === "javascript") {
                const logs: string[] = [];
                const customConsole = {
                    log: (...args: any[]) => {
                        logs.push(args.map((arg) => String(arg)).join(" "));
                    },
                };

                const wrappedCode = `
          (function(console){
            ${code}
          })(customConsole);
        `;
                const execute = new Function("customConsole", wrappedCode);
                execute(customConsole);
                setOutput(logs.join("\n") || "No output returned.");
            } else {
                const token = getToken();
                if (!token) {
                    alert("User token not found. Please log in.", "error");
                    return;
                }   
                setOutput("Only javascript are supported");
            }
        } catch (error: any) {
            setOutput(error.message || "An error occurred while executing the code.");
        } finally {
            loader(false);
        }
    };

    const handleDownload = () => {
        const fileExtension = form.language === "python" ? "py" : form.language === "c" ? "c" : "js";
        const blob = new Blob([code], {type: "text/plain"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `code.${fileExtension}`;
        link.click();
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-primary-900 text-white lg:rounded-lg max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-4">Start Program Code Generation</h2>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 bg-primary-700 p-6 rounded-lg relative">
                    <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-[300px] lg:h-[400px] bg-primary-800 p-4 text-secondary-200 rounded font-mono"
                        spellCheck={false}
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-4">
                        <Button label="" onClick={handleRun} color="secondary" icon={<FaPlay/>}/>
                        <Button label="" onClick={handleDownload} color="secondary" icon={<FaDownload/>}/>
                    </div>
                </div>

                {/* Controls and Output */}
                <div className="flex flex-col flex-1 space-y-6">
                    {/* Language Selector */}
                    <div className="flex gap-4">
                        {["javascript", "python", "c"].map((lang) => (
                            <Button
                                key={lang}
                                label={lang.toUpperCase()}
                                onClick={() => handleChange("language", lang as "javascript" | "python" | "c")}
                                color={form.language === lang ? "primary" : "secondary"}
                            />
                        ))}
                    </div>

                    {/* Prompt Input */}
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <InputField
                            name="prompt"
                            value={form.prompt}
                            onChange={(value) => handleChange("prompt", value)}
                            placeholder="Enter your prompt to generate code"
                        />
                        <Button
                            label={isLoading ? "Generating..." : "Generate"}
                            onClick={handleGenerate}
                            color="secondary"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Execution Result */}
                    <div className="bg-primary-700 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Execution Result</h2>
                        <div
                            className="bg-primary-800 p-4 rounded text-secondary-200 min-h-[150px] lg:min-h-[300px] font-mono whitespace-pre-wrap"
                        >
                            {output || "No output yet. Run your code to see the result here."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramGeneration;
