import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";
import {useLoader} from "@/context/Loader";
import {getToken} from "@/utils/user";

interface MusicData {
    id: string;
    title: string;
    tags: string;
    lyrics: string;
    audioUrl: string;
    imageUrl: string;
    state: string;
    createdAt: string;
    updatedAt: string;
}

const MusicResult: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [music, setMusic] = useState<MusicData | null>(null);
    const alert = useAlert();
    const loader = useLoader();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const fetchMusicResult = async (musicId: string) => {
        try {
            loader(true);

            const token = getToken();
            if (!token) {
                alert("User token not found. Please log in.", "error");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/music/result/${musicId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            setMusic(response.data.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to fetch music result.", "error");
        } finally {
            loader(false);
        }
    };

    useEffect(() => {
        if (router.isReady && id && typeof id === "string") {
            fetchMusicResult(id).then();
        }
    }, [router.isReady, id]);

    if (!music) {
        return <p className="text-white text-center">Loading music details...</p>;
    }

    return (
        <div
            className="relative flex flex-col items-center space-y-6 p-6 text-white min-h-screen w-full bg-cover bg-center rounded-lg overflow-hidden shadow-lg justify-center"
            style={{
                backgroundImage: `url('/assets/image/logicai-2.png')`,
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70 pointer-events-none"></div>
            <div className="relative z-10 w-full flex flex-col justify-center items-center">
                <div className="w-full max-w-4xl bg-primary-800 rounded-lg shadow-lg p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                        <div className="relative w-full md:w-1/2 h-64">
                            {music.imageUrl ? (
                                <Image
                                    src={music.imageUrl}
                                    alt={music.title || "Music Cover"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{objectFit: "cover"}}
                                    className="rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center h-full bg-primary-700 rounded-lg text-secondary-400">
                                    No cover image available.
                                </div>
                            )}
                        </div>

                        {/* Music Info */}
                        <div className="flex flex-col justify-between flex-1 space-y-4">
                            <div>
                                <h2 className="text-3xl font-semibold">{music.title || "Untitled Music"}</h2>
                                <p className="text-secondary-400">{music.tags || "No tags available."}</p>
                            </div>

                            {music.audioUrl ? (
                                <audio controls src={music.audioUrl} className="w-full rounded-lg">
                                    Your browser does not support the audio element.
                                </audio>
                            ) : (
                                <p className="text-secondary-400">Audio not available yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Lyrics */}
                    {music.lyrics && (
                        <div className="bg-primary-700 p-4 rounded-lg text-sm">
                            <h3 className="font-semibold text-lg mb-2">Lyrics</h3>
                            <p className="whitespace-pre-wrap">{music.lyrics}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                        {music.audioUrl && (
                            <Button
                                label="Download"
                                onClick={() => window.open("audioUrl" in music ? music.audioUrl : "", "_blank")}
                                color="primary"
                                className="w-full md:w-auto"
                            />
                        )}
                        <Button
                            label="Generate Again"
                            onClick={() => router.push("/music")}
                            color="secondary"
                            className="w-full md:w-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicResult;
