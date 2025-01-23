import React from "react";
import Banner from "@/components/Banner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TelegramBanner from "@/components/TelegramBanner";
import ProductionSection from "@/components/ProductSection";
import PlanSection from "@/components/PlanSection";
import StudioSection from "@/components/StudioSection";
import LogoComponent from "@/components/LogoComponent";


const Home: React.FC = () => {
    return (
        <>
            <Header/>
            <main className="flex-grow subpixel-antialiased mb-24">
                <Banner/>
                <ProductionSection/>
                <StudioSection/>
                <PlanSection/>
                <LogoComponent/>
                <TelegramBanner/>
            </main>
            <Footer/>
        </>
    );
};

export default Home;
