import React, {useState} from "react";
import {FaCopy, FaPencilAlt, FaSyncAlt} from "react-icons/fa";
import Button from "./Button";
import {saveUser, getUser, getToken} from "@/utils/user";
import axios from "axios";
import InputField from "@/components/input/InputField";
import Image from "next/image";

interface LoggedInComponentProps {
    user: ReturnType<typeof getUser>;
    disconnectWallet: () => void;
    alert: (message: string, type: "success" | "error" | "info") => void;
    loader: (state: boolean, options?: { type?: string; color?: string; size?: string }) => void;
}

const LoggedInComponent: React.FC<LoggedInComponentProps> = ({
                                                                 user,
                                                                 disconnectWallet,
                                                                 alert,
                                                                 loader,
                                                             }) => {
    const [username, setUsername] = useState<string | null>(user?.username || null);
    const [editMode, setEditMode] = useState(false);

    const refreshUserData = async () => {
        loader(true, {type: "spin", color: "primary", size: "medium"});

        try {
            const token = getToken();
            if (!token) {
                alert("User token not found. Please re-login.", "error");
                return;
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            const updatedUser = response.data.data;
            saveUser({
                id: user?.id || "unknown",
                username: updatedUser?.username || user?.username,
                address: user?.address || "",
                point: updatedUser?.point || user?.point,
                token: user?.token || "",
                walletType: user?.walletType || "unknown",
            });
            alert("User data refreshed successfully!", "success");
        } catch (error: any) {
            alert(error.message || "Failed to refresh user data.", "error");
        } finally {
            loader(false);
        }
    };

    const handleUpdateUsername = async () => {
        if (!username || username.length < 4 || username.length > 20) {
            alert("Username must be between 4 and 20 characters.", "error");
            return;
        }
        loader(true, {type: "spin", color: "primary", size: "medium"});

        try {
            const token = getToken();
            if (!token) {
                alert("User token not found. Please re-login.", "error");
                return;
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/username`,
                {username},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            saveUser({
                id: user?.id || "unknown",
                username,
                address: user?.address || "",
                point: user?.point || 0,
                token: user?.token || "",
                walletType: user?.walletType || "unknown",
            });
            setEditMode(false);
            alert("Username updated successfully!", "success");
        } catch (error: any) {
            alert(error.message || "Failed to update username.", "error");
        } finally {
            loader(false);
        }
    };

    const handleCopyAddress = () => {
        if (user?.address) {
            navigator.clipboard.writeText(user.address).then();
            alert("Wallet address copied to clipboard!", "success");
        }
    };

    const formattedAddress = user?.address
        ? `${user.address.slice(0, 5)}xxxxxxxxx`
        : "Unknown Address";

    return (
        <div className="space-y-6 relative px-4 sm:px-0">
            <div className="flex justify-center items-center space-x-2">
                <Image
                    src="/icon.png"
                    alt="Logic AI Logo"
                    width={28}
                    height={28}
                    className="sm:w-11 sm:h-11"
                />
                <p className="text-white font-bold text-xl sm:text-2xl"> Logic AI Points</p>
            </div>
            <p className="text-center font-bold text-3xl sm:text-4xl text-accent-500">
                {user?.point || 0}
            </p>

            <div className="text-center space-y-2">
                {editMode ? (
                    <div className="flex flex-col items-center gap-3">
                        <InputField
                            type="text"
                            value={username || ""}
                            onChange={(value) => setUsername(value)}
                            placeholder="Enter your username"
                            name="username"
                        />
                        <div className="flex w-full items-end justify-end gap-2">
                            <div className="h-10 w-24 sm:w-28 flex justify-center items-center">
                                <Button
                                    label="Cancel"
                                    onClick={() => {
                                        setUsername(user?.username || "");
                                        setEditMode(false);
                                    }}
                                    color="secondary"
                                />
                            </div>
                            <div className="h-10 w-24 sm:w-28 flex justify-center items-center">
                                <Button
                                    label="Save"
                                    onClick={handleUpdateUsername}
                                    color="primary"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row items-center justify-between bg-primary-800 rounded px-4 py-2">
                        <p className="font-bold text-white truncate">{username}</p>
                        <div className="flex h-12 items-center">
                            <Button
                                label="Edit"
                                icon={<FaPencilAlt/>}
                                onClick={() => setEditMode(true)}
                                color="secondary"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center space-y-2">
                <div className="flex items-center justify-between bg-primary-800 text-white px-4 py-2 rounded-md">
                    <p>{formattedAddress}</p>
                    <div className="flex h-12 justify-center">
                        <Button
                            label="Copy"
                            icon={<FaCopy/>}
                            onClick={handleCopyAddress}
                            color="secondary"
                        />
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-end gap-4">
                <div className="flex h-12 justify-center w-36">
                    <Button
                        label="Refresh"
                        icon={<FaSyncAlt/>}
                        onClick={refreshUserData}
                        color="primary"
                    />
                </div>
                <div className="flex h-12 justify-center w-36">
                    <Button
                        label="Disconnect"
                        onClick={disconnectWallet}
                        color="secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoggedInComponent;
