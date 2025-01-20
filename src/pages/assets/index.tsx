import React, {useEffect, useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import AssetCard from "@/components/assets/AssetCard";
import ProtectedPage from "@/components/ProtectedPage";
import {getUser, UserData} from "@/utils/user";

const MyAssets: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    if (!user) {
        return (
            <div className="flex bg-background min-h-screen">
                <Sidebar/>
                <main className="flex-1 flex items-center justify-center p-6 lg:ml-64">
                    <ProtectedPage/>
                </main>
            </div>
        );
    }

    const assetData = [
        {
            title: "3D Models",
            path: "/assets/3d",
            image: "/assets/image/3D.webp",
            description: "Explore stunning 3D models created with AI.",
        },
        {
            title: "Music",
            path: "/assets/music",
            image: "/assets/image/Music.webp",
            description: "Discover AI-generated music tracks.",
        },
    ];

    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 p-6 mt-8 md:mt-0 lg:ml-64">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-900 mb-10 text-center drop-shadow-lg">
                    My AI Assets
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {assetData.map((asset) => (
                        <AssetCard
                            key={asset.title}
                            title={asset.title}
                            path={asset.path}
                            image={asset.image}
                            description={asset.description}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MyAssets;
