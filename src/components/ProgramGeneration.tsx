import React, {useState} from "react";
import {useAlert} from "@/context/Alert";
import InputField from "@/components/input/InputField";
import Button from "@/components/common/Button";
import {FaPlay, FaDownload} from "react-icons/fa";

const ProgramGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [code, setCode] = useState("// Write your JavaScript code here\nconsole.log('Hello, World!');");
    const [output, setOutput] = useState("");
    const alert = useAlert();

    const handleGenerate = () => {
        alert("You need to login to generate code program. Please log in.", "error");
    };

    const handleRun = () => {
        const logs: string[] = [];
        const customConsole = {
            log: (...args: any[]) => {
                logs.push(args.map((arg) => String(arg)).join(" "));
            },
        };

        try {
            const wrappedCode = `
                (function(console){
                    ${code}
                })(customConsole);
            `;
            const execute = new Function("customConsole", wrappedCode);
            execute(customConsole);
            setOutput(logs.join("\n") || "No output returned.");
        } catch (error: any) {
            setOutput(error.message || "An error occurred while executing the code.");
        }
    };

    const handleDownload = () => {
        const blob = new Blob([code], {type: "text/javascript"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "code.js";
        link.click();
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-primary-900 text-white lg:rounded-lg max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-4">Start Code Program Content Generation</h2>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 bg-primary-700 p-6 rounded-lg relative">
                    <h2 className="text-2xl font-bold mb-4">File Editor</h2>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-[300px] lg:h-[400px] bg-primary-800 p-4 text-secondary-200 rounded font-mono"
                        spellCheck={false}
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-4">
                        <Button label="Run" onClick={handleRun} color="secondary" icon={<FaPlay/>}/>
                        <Button label="Download" onClick={handleDownload} color="secondary" icon={<FaDownload/>}/>
                    </div>
                </div>
                <div className="flex flex-col flex-1 space-y-6">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <InputField
                            name="prompt"
                            value={prompt}
                            onChange={(value) => setPrompt(value)}
                            placeholder="Enter your prompt to generate code"
                        />
                        <Button label="Generate" onClick={handleGenerate} color="secondary"/>
                    </div>
                    <div className="bg-primary-700 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Execution Result</h2>
                        <div
                            className="bg-primary-800 p-4 rounded text-secondary-200 min-h-[150px] lg:min-h-[300px] font-mono whitespace-pre-wrap">
                            {output || "No output yet. Run your code to see the result here."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramGeneration;
