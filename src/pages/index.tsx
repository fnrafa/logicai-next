import React from "react";
import Banner from "@/components/Banner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TelegramBanner from "@/components/TelegramBanner";


const Home: React.FC = () => {
    return (
        <>
            <Header/>
            <main className="flex-grow subpixel-antialiased mb-24">
                <Banner/>
                <TelegramBanner/>
            </main>
            <Footer/>
        </>
    );
};

export default Home;
