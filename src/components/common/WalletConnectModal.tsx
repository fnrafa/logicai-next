import React, {useState} from "react";
import {createPortal} from "react-dom";
import {FaTimes} from "react-icons/fa";
import Image from "next/image";
import Button from "./Button";
import {useWallet} from "@/context/Wallet";
import {getUser, saveUser, getToken} from "@/utils/user";
import axios from "axios";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";

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
    const [username, setUsername] = useState<string | null>(getUser()?.username || null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const loader = useLoader();
    const alert = useAlert();
    const user = getUser();

    const handleUpdateUsername = async () => {
        if (!username || username.length < 4 || username.length > 20) {
            alert("Username must be between 4 and 20 characters.");
            return;
        }
        setLoading(true);
        loader(true);

        try {
            const token = getToken();

            if (!token) {
                alert("User token not found. Please re-login.");
                return;
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/username`,
                {username},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            const user = getUser();
            saveUser({
                id: user?.id || "unknown",
                username,
                address: user?.address || "",
                point: user?.point || 0,
                token: user?.token || "",
                walletType: user?.walletType || "unknown",
            });

            setEditMode(false);
            alert("Username updated successfully!");
        } catch (error: object) {
            alert(error.message || "Failed to update username. Please try again.");
        } finally {
            setLoading(false);
            loader(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-primary-900 p-6 rounded-xl shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-secondary-500 hover:text-white">
                    <FaTimes size={20}/>
                </button>

                <h2 className="text-2xl font-bold text-accent-400 mb-6 text-center">
                    {connectedWallet ? connectedWallet : "Connect Your Wallet"}
                </h2>

                {connectedWallet ? (
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-white">Username:</p>
                            {editMode ? (
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={username || ""}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-primary-800 text-white px-4 py-2 rounded-md w-full"
                                        disabled={loading}
                                    />
                                    <Button
                                        label="Save"
                                        onClick={handleUpdateUsername}
                                        color="accent"
                                        disabled={loading}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-white">{username}</p>
                                    <Button
                                        label="Edit"
                                        onClick={() => setEditMode(true)}
                                        color="secondary"
                                        className="px-4"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-secondary-700">Points:</p>
                            <p className="font-bold text-white">{user?.point || 0}</p>
                        </div>
                        <div className="text-center">
                            <Button label="Disconnect" onClick={disconnectWallet} color="secondary"/>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {wallets.map((wallet) => (
                            <div key={wallet.name} className="flex items-center gap-3 bg-primary-700 p-4 rounded-lg">
                                <Image src={wallet.icon} alt={wallet.name} width={48} height={48}/>
                                <div className="flex-1">
                                    <h3 className="text-lg text-white">{wallet.name}</h3>
                                </div>
                                <Button label="Connect" onClick={() => connectWallet(wallet.name)} color="primary"/>
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
