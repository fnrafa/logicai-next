import React, {useEffect, useState, useCallback, useRef} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Image from "next/image";
import {FaDownload, FaRedo} from "react-icons/fa";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import {motion} from "framer-motion";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {getToken} from "@/utils/user";

interface MeshData {
    id: string;
    prompt: string;
    modelType: string;
    modelUrlGlb: string | null;
    modelUrlFbx: string | null;
    modelUrlObj: string | null;
    modelUrlMtl: string | null;
    modelUrlUsdz: string | null;
    previewImage: string | null;
}

const MeshResult: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [mesh, setMesh] = useState<MeshData | null>(null);
    const [fetchError, setFetchError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const alert = useAlert();
    const loader = useLoader();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const hasFetched = useRef(false);

    const fetchMeshResult = useCallback(
        async (meshId: string) => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            loader(true);
            try {
                const token = getToken();
                if (!token) {
                    alert("User token not found. Please log in.", "error");
                    setFetchError(true);
                    return;
                }
                const response = await axios.get(`${API_BASE_URL}/mesh/result/${meshId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setMesh(response.data.data);
            } catch (error: any) {
                setFetchError(true);
                alert(error.response?.data?.message || "Failed to fetch mesh result.", "error");
            } finally {
                loader(false);
            }
        },
        [alert, loader, API_BASE_URL]
    );

    useEffect(() => {
        if (router.isReady && id && typeof id === "string" && !mesh && !fetchError) {
            fetchMeshResult(id).then();
        }
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [id, router.isReady, mesh, fetchError, fetchMeshResult]);

    if (fetchError) {
        return (
            <div
                className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white text-center p-4"
            >
                <Image src="/icon.png" alt="Data not found" width={150} height={150}/>
                <p className="mt-4 text-lg font-semibold">Data not found</p>
            </div>
        );
    }

    if (!mesh) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
                <Loader size="large"/>
            </div>
        );
    }

    const downloadOptions = [
        {label: "GLB", url: mesh.modelUrlGlb},
        {label: "FBX", url: mesh.modelUrlFbx},
        {label: "OBJ", url: mesh.modelUrlObj},
        {label: "MTL", url: mesh.modelUrlMtl},
        {label: "USDZ", url: mesh.modelUrlUsdz},
    ].filter((option) => option.url);

    return (
        <motion.div
            className="min-h-screen w-full bg-gradient-to-tr from-secondary-50 via-primary-900 to-accent-600 text-white flex flex-col items-center px-6 py-12"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
        >
            <div className="flex flex-col md:flex-row w-full bg-primary-300 rounded-lg shadow-lg overflow-hidden">
                <motion.div
                    className="relative w-full md:w-2/3 aspect-video bg-primary-300"
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5, ease: "easeOut"}}
                >
                    {mesh.previewImage ? (
                        <Image
                            src={mesh.previewImage}
                            alt={mesh.prompt || "3D Model Preview"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No preview image available
                        </div>
                    )}
                </motion.div>

                <div className="w-full md:w-1/3 p-6 space-y-4">
                    <h1 className="text-2xl font-bold">Prompt: {mesh.prompt || "N/A"}</h1>
                    <p className="text-lg text-gray-300">Type: {mesh.modelType || "N/A"}</p>
                    {!isMobile ? (
                        <div className="space-y-2 w-full">
                            {downloadOptions.map((option) => (
                                <Button
                                    key={option.label}
                                    label={`Download ${option.label}`}
                                    onClick={() => window.open(option.url || "", "_blank")}
                                    color="primary"
                                    fullWidth={true}
                                    icon={<FaDownload/>}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="relative">
                            <select
                                className="bg-primary-400 text-white w-full rounded-lg p-2"
                                onChange={(e) => {
                                    const url = e.target.value;
                                    if (url) window.open(url, "_blank");
                                }}
                            >
                                <option value="">Select Download Format</option>
                                {downloadOptions.map((option) => (
                                    <option key={option.label} value={option.url || ""}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <Button
                    label="Generate Again"
                    onClick={() => router.push("/3d")}
                    color="secondary"
                    icon={<FaRedo/>}
                />
            </div>
        </motion.div>
    );
};

export default MeshResult;
