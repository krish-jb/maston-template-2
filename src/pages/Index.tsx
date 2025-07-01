import type React from "react";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JewellerSection } from "@/components/JewellerSection";
import Loading from "@/components/Loading";
import { MoreInfoSection } from "@/components/MoreInfoSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { StorySection } from "@/components/StorySection";
import { WeddingDetailsSection } from "@/components/WeddingDetailsSection";
import { WishesSection } from "@/components/WishesSection";
import { useWedding } from "@/contexts/WeddingContext";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import scrollToElement from "@/utils/ScrollToElement";

const Index: React.FC = () => {
    const { globalIsLoading } = useWedding();
    const location = useLocation();

    useEffect(() => {
        const scrollTo = location.state?.scrollTo;
        if (scrollTo) {
            scrollToElement(scrollTo);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <StorySection />
            <WeddingDetailsSection />
            <ScheduleSection />
            <GallerySection />
            <WishesSection />
            <MoreInfoSection />
            <ContactSection />
            <JewellerSection />
            <Footer />
        </div>
    );
};

export default Index;
