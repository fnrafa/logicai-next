import React, { useEffect, useState } from "react";
import { useAlert } from "@/context/Alert";
import { useLoader } from "@/context/Loader";
import { useRouter } from "next/router";
import { getToken } from "@/utils/user";
import Image from "next/image";
import axios from "axios";

interface MeshData {
    id: string;
    prompt: string;
    modelType: string;
    previewImage: string;
    taskId: string;
    createdAt: string;
}

const MeshAssets: React.FC = () => {
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const alert = useAlert();
    const loader = useLoader();
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const fetchUserMeshes = async () => {
        try {
            loader(true);
            const token = getToken();
            if (!token) {
                alert("User token not found. Please log in.", "error");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/mesh/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeshList(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to fetch mesh data.", "error");
        } finally {
            loader(false);
        }
    };

    useEffect(() => {
        fetchUserMeshes().then();
    }, []);

    if (!meshList.length) {
        return <p className="text-white text-center">No mesh assets found. Start generating!</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {meshList.map((mesh) => (
                <div
                    key={mesh.id}
                    onClick={() => router.push(`/3d/${mesh.taskId}`)}
                    className="cursor-pointer bg-primary-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                >
                    {mesh.previewImage ? (
                        <div className="relative w-full h-40">
                            <Image
                                src={mesh.previewImage}
                                alt={mesh.prompt || "3D Model Preview"}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-40 bg-primary-700 flex items-center justify-center text-secondary-400">
                            No Image
                        </div>
                    )}
                    <div className="p-4 space-y-2">
                        <h3 className="text-lg font-bold text-white">{mesh.prompt || "Untitled Model"}</h3>
                        <p className="text-sm text-secondary-400 truncate">{mesh.modelType || "No type available."}</p>
                        <p className="text-xs text-secondary-500">
                            Created: {new Date(mesh.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MeshAssets;
