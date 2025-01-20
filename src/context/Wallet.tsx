import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {connectWallet as connect, disconnectWallet as disconnect} from "@/utils/wallet";
import {saveUser, clearUser, getUser} from "@/utils/user";
import {useAlert} from "@/context/Alert";
import axios from "axios";
import {useLoader} from "@/context/Loader";
import {useRouter} from "next/router";

interface WalletContextType {
    connectedWallet: string | null;
    walletAddress: string | null;
    isConnecting: boolean;
    connectWallet: (walletName: string) => Promise<void>;
    disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const alert = useAlert();
    const loader = useLoader();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    useEffect(() => {
        const storedUser = getUser();
        if (storedUser) {
            setConnectedWallet(storedUser.walletType);
            setWalletAddress(storedUser.address);
        }
    }, []);

    const connectWallet = async (walletName: string) => {
        setIsConnecting(true);
        loader(true, {type: "spin", color: "primary", size: "large"});

        const result = await connect(walletName);

        if (result.success && result.address) {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/login`, {address: result.address});

                saveUser({
                    id: response.data.data.id,
                    username: response.data.data.username,
                    address: response.data.data.address,
                    point: response.data.data.point,
                    token: response.data.data.token,
                    walletType: walletName,
                });

                setConnectedWallet(walletName);
                setWalletAddress(result.address);

                alert(`Connected to ${walletName}: ${response.data.data.username}`, "success");
            } catch (error: object) {
                alert(error.message || "Failed to authenticate with the server.", "error");
            }
        } else {
            alert(result.error || "Failed to connect wallet", "error");
        }

        setIsConnecting(false);
        loader(false);
    };

    const disconnectWallet = async () => {
        loader(true, {type: "spin", color: "primary", size: "large"});
        await disconnect();
        clearUser();
        setConnectedWallet(null);
        setWalletAddress(null);
        loader(false);
        alert("Wallet disconnected", "info");
    };

    return (
        <WalletContext.Provider value={{connectedWallet, walletAddress, isConnecting, connectWallet, disconnectWallet}}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
