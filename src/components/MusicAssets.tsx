import React, {useEffect, useState} from "react";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {useRouter} from "next/router";
import {getToken} from "@/utils/user";
import Image from "next/image";
import axios from "axios";

interface MusicData {
    id: string;
    title: string;
    tags: string;
    imageUrl: string;
    taskId: string;
    createdAt: string;
}

const MusicAssets: React.FC = () => {
    const [musicList, setMusicList] = useState<MusicData[]>([]);
    const alert = useAlert();
    const loader = useLoader();
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const fetchUserMusic = async () => {
        try {
            loader(true);
            const token = getToken();
            if (!token) {
                alert("User token not found. Please log in.", "error");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/music/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMusicList(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to fetch music data.", "error");
        } finally {
            loader(false);
        }
    };

    useEffect(() => {
        fetchUserMusic().then();
    }, []);

    if (!musicList.length) {
        return <p className="text-white text-center">No music assets found. Start generating!</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {musicList.map((music) => (
                <div
                    key={music.id}
                    onClick={() => router.push(`/music/${music.taskId}`)}
                    className="cursor-pointer bg-primary-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                >
                    {music.imageUrl ? (
                        <div className="relative w-full h-40">
                            <Image
                                src={music.imageUrl}
                                alt={music.title || "Music Cover"}
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
                        <h3 className="text-lg font-bold text-white">{music.title || "Untitled Music"}</h3>
                        <p className="text-sm text-secondary-400 truncate">{music.tags || "No tags available."}</p>
                        <p className="text-xs text-secondary-500">
                            Created: {new Date(music.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MusicAssets;