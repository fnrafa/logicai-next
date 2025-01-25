import React, {useEffect, useState, useRef, useCallback} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Image from "next/image";
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaMusic,
    FaDownload,
} from "react-icons/fa";
import Loader from "@/components/common/Loader";
import {useAlert} from "@/context/Alert";

interface MusicData {
    id: string;
    title: string;
    tags: string;
    lyrics: string;
    audioUrl: string;
    imageUrl?: string;
}

const MusicResult: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const [music, setMusic] = useState<MusicData | null>(null);
    const [fetchError, setFetchError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showLyrics, setShowLyrics] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const alert = useAlert();
    const hasFetched = useRef(false);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const fetchMusicResult = useCallback(async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        try {
            const response = await axios.get(`${API_BASE_URL}/music/result/${id}`);
            setMusic(response.data.data);
        } catch {
            setFetchError(true);
            alert("Failed to fetch music data.");
        }
    }, [id, API_BASE_URL, alert]);

    useEffect(() => {
        if (router.isReady && typeof id === "string" && !music && !fetchError) {
            fetchMusicResult().then();
        }
    }, [id, router.isReady, music, fetchError, fetchMusicResult]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updateCurrentTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => {
                if (!isNaN(audio.duration)) {
                    setDuration(audio.duration);
                }
            };

            audio.addEventListener("timeupdate", updateCurrentTime);
            audio.addEventListener("loadedmetadata", updateDuration);

            return () => {
                audio.removeEventListener("timeupdate", updateCurrentTime);
                audio.removeEventListener("loadedmetadata", updateDuration);
            };
        }
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().then();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            if ("muted" in audioRef.current) {
                audioRef.current.muted = !isMuted;
            }
        }
    };

    const handleVolumeChange = (value: number) => {
        setVolume(value);
        if (audioRef.current) {
            if ("volume" in audioRef.current) {
                audioRef.current.volume = value;
            }
        }
    };

    const handleSeek = (value: number) => {
        if (audioRef.current) {
            if ("currentTime" in audioRef.current) {
                audioRef.current.currentTime = value;
            }
        }
        setCurrentTime(value);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

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

    if (!music) {
        return (
            <div
                className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-primary-900 to-black text-white">
                <Loader size="large"/>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-primary-900 via-black to-primary-800 text-white p-6">
            {music && (
                <audio
                    ref={audioRef}
                    src={music.audioUrl}
                    onLoadedMetadata={() => {
                        if (audioRef.current) {
                            if ("duration" in audioRef.current) {
                                setDuration(audioRef.current.duration);
                            }
                        }
                    }}
                ></audio>
            )}
            <div className="relative w-full max-w-4xl aspect-video bg-primary-800 rounded-lg overflow-hidden">
                {showLyrics ? (
                    <div className="p-4 h-full overflow-y-auto text-sm">
                        <h2 className="text-lg font-bold mb-4">Lyrics</h2>
                        <p className="whitespace-pre-wrap">{music.lyrics || "Lyrics are not available."}</p>
                    </div>
                ) : music.imageUrl ? (
                    <Image
                        src={music.imageUrl}
                        alt={music.title || "Music Cover"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-primary-400">
                        No image available
                    </div>
                )}
            </div>
            <div className="w-full max-w-4xl mt-6 flex flex-col items-center gap-4">
                <div className="w-full flex items-center gap-2">
                    <span className="text-sm text-primary-400">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        step="0.1"
                        value={currentTime}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="flex-grow accent-blue-500"
                    />
                    <span className="text-sm text-primary-400">{formatTime(duration)}</span>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="p-2 bg-primary-700 rounded-full hover:bg-primary-600"
                        >
                            {isPlaying ? <FaPause/> : <FaPlay/>}
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleMute}
                            className="p-2 bg-primary-700 rounded-full hover:bg-primary-600"
                        >
                            {isMuted ? <FaVolumeMute/> : <FaVolumeUp/>}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="w-24 accent-blue-500"
                        />
                        <button
                            onClick={() => setShowLyrics(!showLyrics)}
                            className="p-2 bg-primary-700 rounded-full hover:bg-primary-600"
                        >
                            <FaMusic/>
                        </button>
                        <button
                            onClick={() => window.open("audioUrl" in music ? music.audioUrl : "", "_blank")}
                            className="p-2 bg-primary-700 rounded-full hover:bg-primary-600"
                        >
                            <FaDownload/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicResult;
