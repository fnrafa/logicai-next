import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import {getUser} from "@/utils/user";
import ComingSoon from "@/components/ComingSoon";
import ProtectedPage from "@/components/ProtectedPage";

const ProgramPage: React.FC = () => {
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

export default ProgramPage;
