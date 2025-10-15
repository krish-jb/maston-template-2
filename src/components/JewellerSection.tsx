import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/contexts/WeddingContext";
import FadeIn from "./animations/FadeIn";

export const JewellerSection: React.FC = () => {
    const { weddingAd } = useWedding();
    if (!weddingAd || !weddingAd.Ad_section) {
        return null;
    }
    // Provide default values if weddingAd is null/undefined
    const safeWeddingAd = {
        Ad_section: {
            title: weddingAd.Ad_section.title || 'Our wedding cards',
            image: weddingAd.Ad_section.image || '/jeweller/ad-1.jpg',
            description: weddingAd.Ad_section.description || 'Discover our exclusive collection of fine wedding cards.',
            shopName: weddingAd.Ad_section.shopName || 'Luxury Cards',
            website: weddingAd.Ad_section.website || 'matson.app',
            disabled: weddingAd.Ad_section.disabled || false
        }
    };
    if (safeWeddingAd.Ad_section.disabled) {
        return null;
    }

    return (
        <section className="py-20 bg-gray-50">
            <FadeIn delay={100}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl flex flex-col items-center text-center mx-auto">
                        <h2 className="font-Arima  text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {safeWeddingAd.Ad_section.title}
                        </h2>
                        <div className="flex flex-col justify-center items-center w-full rounded-md overflow-hidden max-w-2xl">
                        <Card className="bg-white/80 backdrop-blur-sm">

                            <img
                                src={safeWeddingAd.Ad_section.image}
                                alt={safeWeddingAd.Ad_section.title}
                            />
                                <CardHeader>
                                    <CardTitle className="text-2xl text-yellow-700 font-Arima">
                                        {safeWeddingAd.Ad_section.shopName}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                        {safeWeddingAd.Ad_section.description}
                                    </p>

                                    <Button
                                        onClick={() =>
                                            window.open(
                                                safeWeddingAd.Ad_section.website,
                                                "_blank",
                                            )
                                        }
                                        className="bg-yellow-600 hover:bg-yellow-700"
                                    >
                                        Visit Our Website
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};
