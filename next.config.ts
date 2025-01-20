import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn2.suno.ai",
            },
            {
                protocol: "https",
                hostname: "assets.meshy.ai",
            },
        ],
    },
};

export default nextConfig;
