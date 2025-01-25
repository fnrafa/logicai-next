import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Loader from "@/components/common/Loader";

const NFTExample: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const container = mountRef.current;
        const scene = new THREE.Scene();
        let camera: THREE.PerspectiveCamera | null = null;

        if (container?.clientWidth && container?.clientHeight) {
            camera = new THREE.PerspectiveCamera(
                60,
                container.clientWidth / container.clientHeight,
                0.1,
                1000
            );
            camera.position.set(0, 10, 20);
        }

        const renderer = new THREE.WebGLRenderer({antialias: true});
        if (container?.clientWidth && container?.clientHeight) {
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
        renderer.shadowMap.enabled = true;
        if ("appendChild" in container) {
            container.appendChild(renderer.domElement);
        }

        const controls = new OrbitControls(camera!, renderer.domElement);
        controls.enableDamping = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const coinGeometry = new THREE.CylinderGeometry(5, 5, 0.5, 32);
        const coinMaterial = new THREE.MeshStandardMaterial({
            color: 0xf1c40f,
            metalness: 0.8,
            roughness: 0.6,
        });
        const coin = new THREE.Mesh(coinGeometry, coinMaterial);
        coin.rotation.x = Math.PI / 2;
        scene.add(coin);

        const animate = () => {
            requestAnimationFrame(animate);
            coin.rotation.y += 0.03;
            coin.rotation.x += 0.01;
            controls.update();
            renderer.render(scene, camera!);
        };

        const handleResize = () => {
            if (container?.clientWidth && container?.clientHeight) {
                const width = container.clientWidth;
                const height = container.clientHeight;
                renderer.setSize(width, height);
                camera!.aspect = width / height;
                camera!.updateProjectionMatrix();
            }
        };

        window.addEventListener("resize", handleResize);

        const loadAssets = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setIsLoaded(true);
            } catch {
                setError("Failed to load assets.");
            }
        };

        loadAssets().then();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            controls.dispose();
            if (container && container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return (
        <div className="w-full h-[300px] bg-primary-800 rounded-lg relative">
            {!isLoaded && !error && (
                <div className="absolute inset-0 flex justify-center items-center bg-primary-900">
                    <Loader size="large"/>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex justify-center items-center bg-red-500 text-white">
                    {error}
                </div>
            )}
            <div
                ref={mountRef}
                className="w-full h-full mx-auto overflow-hidden"
            />
        </div>
    );
};

export default NFTExample;
