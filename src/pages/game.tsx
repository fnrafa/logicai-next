import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import ComingSoon from "@/components/ComingSoon";
import ProtectedPage from "@/components/ProtectedPage";
import {getUser} from "@/utils/user";

const GamePage: React.FC = () => {
    const user = getUser();
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex items-center justify-center p-6 lg:ml-64">
                {user ? <ComingSoon/> : <ProtectedPage/>}
            </main>
        </div>
    );
};

export default GamePage;
