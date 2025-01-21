import React, {useState} from "react";
import {createPortal} from "react-dom";
import {FaTimes} from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/common/Button";
import {useWallet} from "@/context/Wallet";
import {getUser} from "@/utils/user";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import LoggedInComponent from "@/components/common/LoggedIn";

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const wallets = [
    {name: "Rainbow Wallet", icon: "/assets/wallets/rainbow.png", description: "A colorful Ethereum wallet."},
    {name: "MetaMask", icon: "/assets/wallets/metamask.png", description: "A popular Ethereum wallet."},
    {name: "Coinbase Wallet", icon: "/assets/wallets/coinbase.png", description: "Coinbase's crypto wallet."},
    {
        name: "WalletConnect",
        icon: "/assets/wallets/walletconnect.png",
        description: "Connect any wallet using WalletConnect.",
    },
    {name: "LogicAI", icon: "/icon.png", description: "Use your address and password to connect securely."},
];

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({isOpen, onClose}) => {
    const {connectWallet, disconnectWallet, connectedWallet} = useWallet();
    const alert = useAlert();
    const loader = useLoader();
    const user = getUser();

    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [form, setForm] = useState({address: "", password: ""});

    if (!isOpen) return null;

    const handleConnect = async () => {
        if (selectedWallet === "LogicAI") {
            if (!form.address) {
                alert("Address is required for LogicAI.", "error");
                return;
            }
            await connectWallet(selectedWallet, form.address, form.password);
        } else {
            await connectWallet(selectedWallet || "");
        }
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center overflow-auto">
            <div className="bg-primary-900 rounded-lg shadow-lg w-full max-w-4xl mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-secondary-500 hover:text-white z-10"
                >
                    <FaTimes size={24}/>
                </button>

                <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
                    {connectedWallet ? (
                        <div className="w-full p-6 overflow-auto justify-center">
                            <LoggedInComponent
                                user={user}
                                disconnectWallet={disconnectWallet}
                                alert={alert}
                                loader={loader}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="w-full md:w-1/3 bg-primary-800 p-4 md:rounded-l-lg">
                                <h3 className="text-lg font-bold text-white mb-4">Choose a Wallet</h3>
                                <ul className="space-y-4">
                                    {wallets.map((wallet) => (
                                        <li
                                            key={wallet.name}
                                            onClick={() => setSelectedWallet(wallet.name)}
                                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                                                selectedWallet === wallet.name
                                                    ? "bg-primary-700"
                                                    : "hover:bg-primary-700"
                                            }`}
                                        >
                                            <Image src={wallet.icon} alt={wallet.name} width={40} height={40}/>
                                            <span className="text-white">{wallet.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex-1 bg-primary-800 p-6 md:rounded-r-lg">
                                {selectedWallet === "LogicAI" ? (
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-xl font-bold text-accent-400 mb-2">
                                            Connect with LogicAI
                                        </h3>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            value={form.address}
                                            onChange={handleInputChange}
                                            className="p-3 bg-primary-700 text-white rounded-lg w-full"
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={form.password}
                                            onChange={handleInputChange}
                                            className="p-3 bg-primary-700 text-white rounded-lg w-full"
                                        />
                                        <Button label="Connect" onClick={handleConnect} color="secondary"/>
                                    </div>
                                ) : selectedWallet ? (
                                    <div>
                                        <h3 className="text-xl font-bold text-accent-400 mb-2">{selectedWallet}</h3>
                                        <p className="text-white">
                                            {wallets.find((wallet) => wallet.name === selectedWallet)?.description}
                                        </p>
                                        <Button
                                            label="Connect"
                                            onClick={handleConnect}
                                            color="secondary"
                                            className="mt-4"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-white text-center">Select a wallet to see details.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default WalletConnectModal;
