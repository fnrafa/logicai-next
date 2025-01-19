import React from "react";
import Sidebar from "@/components/layout/Sidebar";

const ThreeDAssets: React.FC = () => {
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 p-6 lg:ml-64">
                <h1 className="text-3xl font-bold text-secondary-50 mb-6">My 3D Assets</h1>

            </main>
        </div>
    );
};

export default ThreeDAssets;
