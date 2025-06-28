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

const Index: React.FC = () => {
    const { globalIsLoading } = useWedding();

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
