import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import {FaWallet} from "react-icons/fa";
import WalletConnectModal from "@/components/common/WalletConnectModal";
import {useWallet} from "@/context/Wallet";

const Header: React.FC = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {connectedWallet, isConnecting} = useWallet();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-primary-900 bg-opacity-70 shadow-lg backdrop-blur-md" : "bg-transparent"}`}>
            <nav className="px-4 lg:px-10 py-3">
                <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                    <button onClick={() => router.push("/")} className="relative w-32 md:w-44 h-10 md:h-14">
                        <Image src="/horizontal-white.png" alt="LogicAI Logo" fill
                               sizes="(max-width: 768px) 128px, (max-width: 1200px) 176px, 220px"
                               style={{objectFit: "contain"}} priority/>
                    </button>

                    <Button
                        label={isConnecting ? "Connecting..." : connectedWallet ? `${connectedWallet}` : "Connect Wallet"}
                        color={isScrolled ? "primary" : "secondary"}
                        onClick={() => setIsModalOpen(true)}
                        icon={<FaWallet size={18}/>}
                        iconPosition="left"
                    />
                </div>
            </nav>
            <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </header>
    );
};

export default Header;
