import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import ThreeDGeneration from "@/components/ThreeDGeneration";

const ThreeDPage: React.FC = () => {
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex items-end justify-center p-6 lg:ml-64">
                <ThreeDGeneration/>
            </main>
        </div>
    );
};

export default ThreeDPage;
