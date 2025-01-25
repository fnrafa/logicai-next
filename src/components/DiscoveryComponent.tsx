import React, {useEffect, useState, useCallback, useRef} from "react";
import Button from "@/components/common/Button";
import InputField from "@/components/input/InputField";
import Image from "next/image";
import {useLoader} from "@/context/Loader";
import {useAlert} from "@/context/Alert";

interface MeshData {
    id: string;
    taskId: string;
    prompt: string;
    modelType: string;
    previewImage: string | null;
    user: { username: string };
}

interface MusicData {
    id: string;
    taskId: string;
    title: string;
    tags: string | null;
    imageUrl: string | null;
    user: { username: string };
}

const ITEMS_PER_PAGE = 12;

const DiscoveryComponent: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<"mesh" | "music">("mesh");
    const [searchQuery, setSearchQuery] = useState("");
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [musicList, setMusicList] = useState<MusicData[]>([]);
    const [filteredMeshList, setFilteredMeshList] = useState<MeshData[]>([]);
    const [filteredMusicList, setFilteredMusicList] = useState<MusicData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const loader = useLoader();
    const alert = useAlert();

    const fetchedMesh = useRef(false);
    const fetchedMusic = useRef(false);

    const fetchDataOnce = useCallback(
        async (
            url: string,
            setData: (data: any) => void,
            category: string,
            fetchedFlag: React.MutableRefObject<boolean>
        ) => {
            if (fetchedFlag.current) return;
            fetchedFlag.current = true;
            loader(true, {size: "large"});

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setData(data.data);
                } else {
                    alert(`Failed to fetch ${category} data`);
                }
            } catch {
                alert(`An error occurred while fetching ${category} data`);
            } finally {
                loader(false);
            }
        },
        [loader, alert]
    );

    useEffect(() => {
        if (activeCategory === "mesh") {
            fetchDataOnce(
                `${API_BASE_URL}/mesh`,
                (data) => {
                    setMeshList(data);
                    setFilteredMeshList(data);
                },
                "mesh",
                fetchedMesh
            ).then();
        } else {
            fetchDataOnce(
                `${API_BASE_URL}/music`,
                (data) => {
                    setMusicList(data);
                    setFilteredMusicList(data);
                },
                "music",
                fetchedMusic
            ).then();
        }
    }, [activeCategory, API_BASE_URL, fetchDataOnce]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredMeshList, filteredMusicList]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        if (activeCategory === "mesh") {
            setFilteredMeshList(
                meshList.filter(
                    (mesh) =>
                        mesh.prompt.toLowerCase().includes(query) ||
                        mesh.modelType.toLowerCase().includes(query)
                )
            );
        } else {
            setFilteredMusicList(
                musicList.filter(
                    (music) =>
                        music.title.toLowerCase().includes(query) ||
                        music.tags?.toLowerCase().includes(query)
                )
            );
        }
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return activeCategory === "mesh"
            ? filteredMeshList.slice(startIndex, endIndex)
            : filteredMusicList.slice(startIndex, endIndex);
    };

    const renderMeshCard = (mesh: MeshData) => (
        <div
            key={mesh.id}
            className="cursor-pointer bg-primary-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            onClick={() => (window.location.href = `/3d/${mesh.taskId}`)}
        >
            {mesh.previewImage ? (
                <div className="relative w-full h-40">
                    <Image
                        src={mesh.previewImage}
                        alt={mesh.prompt || "3D Model"}
                        fill
                        style={{objectFit: "cover"}}
                        priority
                        className="rounded-t-lg"
                    />
                </div>
            ) : (
                <div className="w-full h-40 bg-primary-700 flex items-center justify-center text-secondary-400">
                    No Image
                </div>
            )}
            <div className="p-4">
                <h3 className="text-lg font-bold text-white">{truncateText(mesh.prompt, 24)}</h3>
                <p className="text-sm text-secondary-400">Created by: {mesh.user.username}</p>
            </div>
        </div>
    );

    const renderMusicCard = (music: MusicData) => (
        <div
            key={music.id}
            className="cursor-pointer bg-primary-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            onClick={() => (window.location.href = `/music/${music.taskId}`)}
        >
            {music.imageUrl ? (
                <div className="relative w-full h-40">
                    <Image
                        src={music.imageUrl}
                        alt={music.title || "Music Cover"}
                        fill
                        style={{objectFit: "cover"}}
                        priority
                        className="rounded-t-lg"
                    />
                </div>
            ) : (
                <div className="w-full h-40 bg-primary-700 flex items-center justify-center text-secondary-400">
                    No Image
                </div>
            )}
            <div className="p-4">
                <h3 className="text-lg font-bold text-white">{music.title || "Untitled Music"}</h3>
                <p className="text-sm text-secondary-400">Created by: {music.user.username}</p>
            </div>
        </div>
    );

    const totalPages = Math.ceil(
        activeCategory === "mesh" ? filteredMeshList.length / ITEMS_PER_PAGE : filteredMusicList.length / ITEMS_PER_PAGE
    );

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div className="min-h-screen w-full text-white p-6">
            <div className="w-full mx-auto">
                <div className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg shadow-md mb-8">
                    <div className="flex flex-row items-center gap-4">
                        <InputField
                            name="search"
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search for Music or 3D models..."
                            className="flex-1"
                        />
                        <div className="flex w-36 h-12 justify-center items-center">
                            <Button label="Search" onClick={handleSearch} color="primary"/>
                        </div>
                    </div>
                    <div className="flex justify-center py-4 gap-4">
                        <div className="flex w-36 h-12 justify-center items-center">
                            <Button
                                label="3D Models"
                                onClick={() => setActiveCategory("mesh")}
                                color={activeCategory === "mesh" ? "primary" : "secondary"}
                            />
                        </div>
                        <div className="flex w-36 h-12 justify-center items-center">
                            <Button
                                label="Music"
                                onClick={() => setActiveCategory("music")}
                                color={activeCategory === "music" ? "primary" : "secondary"}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getPaginatedData().length > 0 ? (
                        getPaginatedData().map((item) =>
                            activeCategory === "mesh"
                                ? renderMeshCard(item as MeshData)
                                : renderMusicCard(item as MusicData)
                        )
                    ) : (
                        <div className="col-span-full text-center text-secondary-400">
                            No Data Found
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center mt-6">
                    <Button
                        label="Previous"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        color="secondary"
                    />
                    <p className="text-secondary-400">
                        Page {currentPage} of {totalPages}
                    </p>
                    <Button
                        label="Next"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        color="secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default DiscoveryComponent;
