import React from "react";
import { FaDownload } from "react-icons/fa";

interface MeshCardProps {
    title: string;
    previewImage: string;
    modelUrls: { glb: string; fbx: string };
}

const MeshCard: React.FC<MeshCardProps> = ({ title, previewImage, modelUrls }) => {
    return (
        <div className="bg-primary-800 rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
            <img src={previewImage} alt={title} className="w-full h-56 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <div className="flex gap-4">
                    <a
                        href={modelUrls.glb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-md shadow-md hover:opacity-90"
                    >
                        <FaDownload className="mr-2" /> GLB
                    </a>
                    <a
                        href={modelUrls.fbx}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md shadow-md hover:opacity-90"
                    >
                        <FaDownload className="mr-2" /> FBX
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MeshCard;
