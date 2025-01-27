import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaWallet, FaBars, FaTimes } from "react-icons/fa";
import WalletConnectModal from "@/components/common/WalletConnectModal";
import Button from "@/components/common/Button";
import { useWallet } from "@/context/Wallet";
import Link from "next/link";

const Header: React.FC = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { connectedWallet, isConnecting } = useWallet();

    useEffect(() => {
        const handleScroll = () => {
            if (!isNavOpen) {
                setIsScrolled(window.scrollY > 50);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isNavOpen]);

    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isNavOpen]);

    const navItems = [
        { label: "About", path: "#about" },
        { label: "Product", path: "#product" },
        { label: "Studio", path: "#studio" },
        { label: "Web3", path: "https://docs.logicai.technology/logic-ai-token/tokenomic" },
        { label: "Documentation", path: "https://docs.logicai.technology/" },
    ];

    const handleNavigation = (path: string) => {
        setIsNavOpen(false);
        if (!path.startsWith("#")) {
            router.push(path).then();
        }
    };

    const headerBg = isNavOpen
        ? "bg-primary-900 shadow-lg"
        : isScrolled
            ? "bg-primary-900 shadow-lg"
            : "bg-transparent";

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}
        >
            <nav className="px-4 lg:px-10 py-3">
                <div className="flex justify-between items-center max-w-screen-xl mx-auto relative">
                    <button
                        onClick={() => router.push("/")}
                        className="relative w-32 md:w-44 h-10 md:h-14"
                    >
                        <Image
                            src="/horizontal-white.png"
                            alt="LogicAI Logo"
                            fill
                            sizes="(max-width: 768px) 128px, (max-width: 1200px) 176px, 220px"
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </button>

                    <ul className="hidden lg:flex space-x-6">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                {item.path.startsWith("#") ? (
                                    <Link href={item.path} className="text-white font-bold hover:text-accent-500 transition-colors" onClick={() => handleNavigation(item.path)}>
                                        {item.label}
                                    </Link>
                                ) : (
                                    <Link href={item.path} className="text-white font-bold hover:text-accent-500 transition-colors">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="absolute right-4 lg:hidden flex items-center space-x-4">
                        <button onClick={() => setIsModalOpen(true)}>
                            <FaWallet size={24} />
                        </button>
                        <button onClick={() => setIsNavOpen(!isNavOpen)}>
                            {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>

                    <div className="hidden lg:block">
                        <Button
                            label={
                                isConnecting
                                    ? "Connecting..."
                                    : connectedWallet
                                        ? `${connectedWallet}`
                                        : "Connect Wallet"
                            }
                            color={isNavOpen || isScrolled ? "primary" : "secondary"}
                            onClick={() => setIsModalOpen(true)}
                            icon={<FaWallet size={18} />}
                            iconPosition="left"
                        />
                    </div>
                </div>
            </nav>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-primary-900 z-60 transform transition-transform duration-300 ${
                    isNavOpen ? "translate-x-0" : "translate-x-full"
                } lg:hidden`}
            >
                <ul className="flex flex-col h-full p-6 space-y-6">
                    <li className="self-end">
                        <button
                            onClick={() => setIsNavOpen(false)}
                            className="text-white hover:text-primary-500 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>
                    </li>

                    {navItems.map((item) => (
                        <li key={item.label}>
                            {item.path.startsWith("#") ? (
                                <Link href={item.path} className="w-full text-left text-white hover:text-accent-600 transition-colors text-lg" onClick={() => handleNavigation(item.path)}>
                                    {item.label}
                                </Link>
                            ) : (
                                <Link href={item.path} className="w-full text-left text-white hover:text-accent-600 transition-colors text-lg">
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}

                    <li className="mt-auto">
                        <Button
                            label={
                                isConnecting
                                    ? "Connecting..."
                                    : connectedWallet
                                        ? `${connectedWallet}`
                                        : "Connect Wallet"
                            }
                            color="primary"
                            onClick={() => {
                                setIsNavOpen(false);
                                setIsModalOpen(true);
                            }}
                            icon={<FaWallet size={18} />}
                            iconPosition="left"
                            fullWidth
                        />
                    </li>
                </ul>
            </div>

            <WalletConnectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </header>
    );
};

export default Header;
