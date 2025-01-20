import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import ProgramGeneration from "@/components/ProgramGeneration";

const ProgramPage: React.FC = () => {
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex items-end justify-center p-6 lg:ml-64">
                <ProgramGeneration/>
            </main>
        </div>
    );
};

export default ProgramPage;
