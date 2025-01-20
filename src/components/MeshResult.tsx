import React, {useEffect, useState, useCallback} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Image from "next/image";
import {FaDownload, FaRedo} from "react-icons/fa";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {getToken} from "@/utils/user";

interface MeshData {
    id: string;
    prompt: string;
    modelType: string;
    modelUrlGlb: string;
    modelUrlFbx: string;
    modelUrlObj: string;
    modelUrlMtl: string;
    modelUrlUsdz: string;
    previewImage: string;
    state: string;
    createdAt: string;
    updatedAt: string;
}

const MeshResult: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [mesh, setMesh] = useState<MeshData | null>(null);
    const alert = useAlert();
    const loader = useLoader();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const fetchMeshResult = useCallback(async (meshId: string) => {
        try {
            loader(true);
            const token = getToken();
            if (!token) {
                alert("User token not found. Please log in.", "error");
                return;
            }
            const response = await axios.get(`${API_BASE_URL}/mesh/result/${meshId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setMesh(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to fetch mesh result.", "error");
        } finally {
            loader(false);
        }
    }, [alert, loader, API_BASE_URL]);

    useEffect(() => {
        if (router.isReady && id && typeof id === "string") {
            fetchMeshResult(id).then();
        }
    },[id]);

    if (!mesh) {
        return <p className="text-white text-center">Loading 3D model details...</p>;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center px-4 sm:px-6 py-8">
            <div className="w-full max-w-5xl bg-primary-800 rounded-lg shadow-lg p-6 sm:p-8 space-y-6 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="relative w-full md:w-1/2 h-64">
                        {mesh.previewImage ? (
                            <Image
                                src={mesh.previewImage}
                                alt={mesh.prompt || "3D Model Preview"}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{objectFit: "cover"}}
                                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div
                                className="flex items-center justify-center h-full bg-primary-700 rounded-lg text-secondary-400">
                                No preview image available.
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-bold">{mesh.prompt || "Untitled Model"}</h2>
                        <p className="text-secondary-400">{mesh.modelType || "Unknown type"}</p>
                    </div>
                </div>
                <div className="bg-primary-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Download Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mesh.modelUrlGlb && (
                            <Button
                                label="Download GLB"
                                onClick={() => window.open("modelUrlGlb" in mesh ? mesh.modelUrlGlb : "", "_blank")}
                                color="primary"
                                icon={<FaDownload/>}
                                iconPosition="left"
                            />
                        )}
                        {mesh.modelUrlFbx && (
                            <Button
                                label="Download FBX"
                                onClick={() => window.open("modelUrlFbx" in mesh ? mesh.modelUrlFbx : "", "_blank")}
                                color="primary"
                                icon={<FaDownload/>}
                                iconPosition="left"
                            />
                        )}
                        {mesh.modelUrlObj && (
                            <Button
                                label="Download OBJ"
                                onClick={() => window.open("modelUrlObj" in mesh ? mesh.modelUrlObj : "", "_blank")}
                                color="primary"
                                icon={<FaDownload/>}
                                iconPosition="left"
                            />
                        )}
                        {mesh.modelUrlMtl && (
                            <Button
                                label="Download MTL"
                                onClick={() => window.open("modelUrlMtl" in mesh ? mesh.modelUrlMtl : "", "_blank")}
                                color="primary"
                                icon={<FaDownload/>}
                                iconPosition="left"
                            />
                        )}
                        {mesh.modelUrlUsdz && (
                            <Button
                                label="Download USDZ"
                                onClick={() => window.open("modelUrlUsdz" in mesh ? mesh.modelUrlUsdz : "", "_blank")}
                                color="primary"
                                icon={<FaDownload/>}
                                iconPosition="left"
                            />
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        label="Generate Again"
                        onClick={() => router.push("/3d")}
                        color="secondary"
                        icon={<FaRedo/>}
                        iconPosition="left"
                    />
                </div>
            </div>
        </div>
    );
};

export default MeshResult;
