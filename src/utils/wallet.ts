import {ethers} from "ethers";

interface WalletResponse {
    success: boolean;
    address?: string;
    error?: string;
}

export const connectWallet = async (walletName: string): Promise<WalletResponse> => {
    try {
        let provider;

        if (walletName === "MetaMask") {
            if (typeof window !== "undefined" && window["ethereum"]) {
                provider = new ethers.BrowserProvider(window["ethereum"]);
                await window["ethereum"].request({method: "eth_requestAccounts"});
            } else {
                return {success: false, error: "MetaMask is not installed. Please install MetaMask."};
            }
        } else {
            return {success: false, error: `${walletName} is not supported yet`};
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        localStorage.setItem("walletAddress", address);
        localStorage.setItem("connectedWallet", walletName);

        return {success: true, address};
    } catch (error: object) {
        if (error.message === "User closed modal") {
            return {success: false, error: "You closed the wallet connection modal."};
        }
        return {success: false, error: error.message || "Unknown error occurred"};
    }
};

export const disconnectWallet = async (): Promise<void> => {
    try {
        if (window["ethereum"] && window["ethereum"].request) {
            await window["ethereum"].request({
                method: "wallet_requestPermissions",
                params: [{eth_accounts: {}}],
            });
        }
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("connectedWallet");
    } catch (error: object) {
        console.error("Error disconnecting wallet:", error.message || "Unknown error occurred.");
    }
};

