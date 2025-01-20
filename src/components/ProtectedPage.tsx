import React, {useState} from "react";
import WalletConnectModal from "@/components/common/WalletConnectModal";
import Button from "@/components/common/Button";
import Image from "next/image";

const ProtectedPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="text-center space-y-6 px-6 py-8 bg-primary-800 bg-opacity-90 rounded-xl shadow-lg w-full max-w-lg mx-4 md:mx-0"
            >
                <div className="flex justify-center">
                    <Image
                        src="/icon.png"
                        alt="Coming Soon Icon"
                        width={100}
                        height={100}
                        priority
                        className="object-contain"
                    />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                    Connect Required
                </p>
                <p className="text-sm md:text-base text-secondary-300 leading-relaxed">
                    Please connect your wallet to access this feature.
                </p>
                <div className="flex justify-center h-12">
                    <Button
                        label="Connect Wallet"
                        onClick={() => setIsModalOpen(true)}
                        color="primary"
                        className="px-6 py-2 text-sm md:text-base"
                    />
                </div>
                <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            </div>
        </div>
    );
};

export default ProtectedPage;
