import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/contexts/WeddingContext";

export const JewellerSection: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {weddingData.jeweller.title}
                    </h2>

                    <Card className="bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl text-yellow-700">
                                {weddingData.jeweller.shopName}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                {weddingData.jeweller.description}
                            </p>

                            <Button
                                onClick={() =>
                                    window.open(
                                        weddingData.jeweller.website,
                                        "_blank",
                                    )
                                }
                                className="bg-yellow-600 hover:bg-yellow-700"
                            >
                                Visit Our Jeweller
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};
