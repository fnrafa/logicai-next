import React, {useEffect, useState} from "react";
import Button from "@/components/common/Button";
import InputField from "@/components/input/InputField";
import Image from "next/image";

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

const DiscoveryComponent: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<"mesh" | "music">("mesh");
    const [searchQuery, setSearchQuery] = useState("");
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [musicList, setMusicList] = useState<MusicData[]>([]);
    const [filteredMeshList, setFilteredMeshList] = useState<MeshData[]>([]);
    const [filteredMusicList, setFilteredMusicList] = useState<MusicData[]>([]);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const fetchMeshData = () => {
        fetch(`${API_BASE_URL}/mesh`)
            .then((response) => {
                if (!response.ok) return Promise.reject("Failed to fetch mesh data");
                return response.json();
            })
            .then((data) => {
                setMeshList(data.data);
                setFilteredMeshList(data.data);
            })
            .catch(() => {
                setMeshList([]);
                setFilteredMeshList([]);
            });
    };

    const fetchMusicData = () => {
        fetch(`${API_BASE_URL}/music`)
            .then((response) => {
                if (!response.ok) return Promise.reject("Failed to fetch music data");
                return response.json();
            })
            .then((data) => {
                setMusicList(data.data);
                setFilteredMusicList(data.data);
            })
            .catch(() => {
                setMusicList([]);
                setFilteredMusicList([]);
            });
    };

    useEffect(() => {
        if (activeCategory === "mesh") {
            fetchMeshData();
        } else {
            fetchMusicData();
        }
    }, [activeCategory]);

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
                <h3 className="text-lg font-bold text-white">{mesh.prompt || "Untitled Model"}</h3>
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

    return (
        <div className="min-h-screen text-white p-6">
            <div className="max-w-5xl mx-auto">
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
                    {activeCategory === "mesh" && filteredMeshList.length > 0
                        ? filteredMeshList.map(renderMeshCard)
                        : activeCategory === "music" && filteredMusicList.length > 0
                            ? filteredMusicList.map(renderMusicCard)
                            : (
                                <div className="col-span-full text-center text-secondary-400">
                                    No Data Found
                                </div>
                            )}
                </div>
            </div>
        </div>
    );
};

export default DiscoveryComponent;
