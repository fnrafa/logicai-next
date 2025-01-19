import React from "react";
import Banner from "@/components/Banner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


const Home: React.FC = () => {
    return (
        <>
            <Header/>
            <main className="flex-grow subpixel-antialiased">
                <Banner/>
            </main>
            <Footer/>
        </>
    );
};

export default Home;
