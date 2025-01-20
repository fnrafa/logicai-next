import React, {useEffect, useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import {getUser, UserData} from "@/utils/user";
import ProtectedPage from "@/components/ProtectedPage";
import MusicGeneration from "@/components/MusicGeneration";

const MusicPage: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex items-end justify-center p-6 lg:ml-64">
                {user ? <MusicGeneration/> : <ProtectedPage/>}
            </main>
        </div>
    );
};

export default MusicPage;
