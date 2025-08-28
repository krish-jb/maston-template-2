import type React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ContactSection } from "@/components/ContactSection";
import Footer from "@/components/Footer";
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
import scrollToElement from "@/utils/ScrollToElement";
import useSyncUsername from "@/hooks/useSyncUsername";

const Index: React.FC = () => {
    const { globalIsLoading } = useWedding();
    const { username } = useParams();

    useSyncUsername(username);

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
