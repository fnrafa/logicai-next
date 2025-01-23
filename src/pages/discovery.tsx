import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import ComingSoon from "@/components/ComingSoon";

const DiscoveryPage: React.FC = () => {
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex items-center justify-center p-6 lg:ml-64">
                <ComingSoon/>
            </main>
        </div>
    );
};

export default DiscoveryPage;
