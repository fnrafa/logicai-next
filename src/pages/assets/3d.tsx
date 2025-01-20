import React, {useEffect, useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import {getUser} from "@/utils/user";
import ProtectedPage from "@/components/ProtectedPage";
import {UserData} from "@/utils/user";
import MeshAssets from "@/components/MeshAssets";

const MeshAssetsPage: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex items-center justify-center p-6 lg:ml-64">
                {user ? <MeshAssets/> : <ProtectedPage/>}
            </main>
        </div>
    );
};

export default MeshAssetsPage;
