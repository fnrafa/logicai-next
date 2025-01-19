import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import AssetCard from "@/components/assets/AssetCard";

const ProgramAssets: React.FC = () => {
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 lg:ml-64">
                <h1 className="text-3xl font-bold text-secondary-50 mb-6">My Program Assets</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <AssetCard key={item} title={`Program Code ${item}`} path="#"  description={} image={}/>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProgramAssets;
