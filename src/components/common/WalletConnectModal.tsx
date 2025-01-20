import React from "react";
import {createPortal} from "react-dom";
import {FaTimes} from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/common/Button";
import {useWallet} from "@/context/Wallet";
import {getUser} from "@/utils/user";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import LoggedInComponent from "@/components/common/LoggenIn";

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const wallets = [
    {name: "Rainbow Wallet", icon: "/assets/wallets/rainbow.png"},
    {name: "MetaMask", icon: "/assets/wallets/metamask.png"},
    {name: "Coinbase Wallet", icon: "/assets/wallets/coinbase.png"},
    {name: "WalletConnect", icon: "/assets/wallets/walletconnect.png"},
];

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({isOpen, onClose}) => {
    const {connectWallet, disconnectWallet, connectedWallet} = useWallet();
    const alert = useAlert();
    const loader = useLoader();
    const user = getUser();

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
            <div className="bg-primary-900 p-6 rounded-xl shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-secondary-500 hover:text-white">
                    <FaTimes size={20}/>
                </button>

                <h2 className="text-2xl font-bold text-accent-400 mb-6 text-center">
                    {connectedWallet ? connectedWallet : "Connect Your Wallet"}
                </h2>

                {connectedWallet ? (
                    <LoggedInComponent
                        user={user}
                        disconnectWallet={disconnectWallet}
                        alert={alert}
                        loader={loader}
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {wallets.map((wallet) => (
                            <div
                                key={wallet.name}
                                className="flex items-center gap-3 bg-primary-700 p-4 rounded-lg"
                            >
                                <Image src={wallet.icon} alt={wallet.name} width={48} height={48}/>
                                <div className="flex-1">
                                    <h3 className="text-lg text-white">{wallet.name}</h3>
                                </div>
                                <Button
                                    label="Connect"
                                    onClick={() => connectWallet(wallet.name)}
                                    color="secondary"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default WalletConnectModal;
