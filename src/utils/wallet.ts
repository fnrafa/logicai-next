import {BrowserProvider} from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

interface WalletResponse {
    success: boolean;
    address?: string;
    walletName?: string;
    error?: string;
}

let walletConnectProviderInstance: WalletConnectProvider | null = null;

export const connectWallet = async (walletName: string): Promise<WalletResponse> => {
    try {
        let provider: BrowserProvider | null = null;

        const ethereumObj = (window as any).ethereum;

        if (walletName === "MetaMask") {
            if (ethereumObj && ethereumObj.isMetaMask) {
                await ethereumObj.request({method: "eth_requestAccounts"});
                provider = new BrowserProvider(ethereumObj);
            } else {
                window.open("https://metamask.io/download/", "_blank");
                return {
                    success: false,
                    error: "MetaMask not installed. Redirecting to the download page.",
                };
            }
        } else if (walletName === "Rainbow Wallet") {
            if (ethereumObj && ethereumObj.isRainbow) {
                await ethereumObj.request({method: "eth_requestAccounts"});
                provider = new BrowserProvider(ethereumObj);
            } else {
                window.open("https://rainbow.me/download", "_blank");
                return {
                    success: false,
                    error: "Rainbow Wallet not installed. Redirecting to the download page.",
                };
            }
        } else if (walletName === "WalletConnect") {
            walletConnectProviderInstance = new WalletConnectProvider({
                rpc: {1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`},
                qrcode: true,
                bridge: "https://bridge.walletconnect.org",
            });
            await walletConnectProviderInstance.enable();
            provider = new BrowserProvider(walletConnectProviderInstance as any);
        } else {
            return {success: false, error: `${walletName} is not supported yet.`};
        }

        if (!provider) {
            return {success: false, error: "No provider found."};
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        localStorage.setItem("walletAddress", address);
        localStorage.setItem("connectedWallet", walletName);

        return {success: true, address, walletName};
    } catch (error: any) {
        if (error.code === -32603) {
            return {success: false, error: "User rejected the request."};
        }
        return {
            success: false,
            error: error.message || "An unknown error occurred.",
        };
    }
};

export const disconnectWallet = async (): Promise<void> => {
    try {
        const connectedWallet = localStorage.getItem("connectedWallet");
        if (connectedWallet === "WalletConnect" && walletConnectProviderInstance) {
            await walletConnectProviderInstance.disconnect();
            walletConnectProviderInstance = null;
        }
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("connectedWallet");
    } catch (error: any) {
        console.error("Error disconnecting wallet:", error.message || "An unknown error occurred.");
    }
};
