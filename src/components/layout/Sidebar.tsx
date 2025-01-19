import React, {useState} from "react";
import {useRouter} from "next/router";
import {
    FaBars,
    FaMusic,
    FaCode,
    FaHome,
    FaTimes,
    FaFolderOpen,
    FaMagic,
    FaWallet,
    FaGlobeAsia,
    FaGamepad,
} from "react-icons/fa";
import Button from "@/components/common/Button";
import Image from "next/image";
import WalletConnectModal from "@/components/common/WalletConnectModal";
import {useWallet} from "@/context/Wallet";
import {RiNftLine} from "react-icons/ri";
import {Md3dRotation} from "react-icons/md";

const Sidebar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const {connectedWallet, isConnecting} = useWallet();

    const navItems = [
        {label: "Home", path: "/", icon: <FaHome/>},
        {label: "Feature", path: "/feature", icon: <FaMagic/>},
        {label: "My Assets", path: "/assets", icon: <FaFolderOpen/>},
        {label: "Text to 3D", path: "/3d", icon: <Md3dRotation/>},
        {label: "Text to Music", path: "/music", icon: <FaMusic/>},
        {label: "Text to Program", path: "/program", icon: <FaCode/>},
        {label: "Text to NFT", path: "/nft", icon: <RiNftLine/>},
        {label: "Text to Metaverse", path: "/metaverse", icon: <FaGlobeAsia/>},
        {label: "Text to Game", path: "/game", icon: <FaGamepad/>},
    ];

    const handleNavigation = (path: string) => {
        router.push(path).then(() => setIsOpen(false));
    };

    return (

        <>
            <button
                className={`lg:hidden fixed top-4 left-4 z-50 bg-primary-700 text-white p-2 rounded-md transition-transform duration-300 ${
                    isOpen ? "translate-x-64" : "translate-x-0"
                }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={20}/> : <FaBars size={20}/>}
            </button>
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-primary-900 shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300 z-40 flex flex-col`}
            >
                <div className="flex flex-col flex-1">
                    <button onClick={() => handleNavigation("/")} className="relative w-32 h-12 mx-auto mt-6">
                        <Image
                            src="/horizontal-white.png"
                            alt="LogicAI Logo"
                            fill
                            sizes="(max-width: 768px) 128px, (max-width: 1200px) 176px, 220px"
                            style={{objectFit: "contain"}}
                            priority
                        />
                    </button>
                    <div className="flex-1 overflow-y-auto mt-8 space-y-2 px-4">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
                                    router.pathname === item.path
                                        ? "bg-accent-500 text-white"
                                        : "hover:bg-primary-700 text-secondary"
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t border-primary-700">
                    <Button
                        label={isConnecting ? "Connecting..." : connectedWallet ? `${connectedWallet}` : "Connect Wallet"}
                        color="primary"
                        onClick={() => setIsModalOpen(true)}
                        icon={<FaWallet size={18}/>}
                        iconPosition="left"
                        fullWidth
                    />
                </div>
            </aside>
            <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    );
};

export default Sidebar;
