import type React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useWedding } from "@/contexts/WeddingContext";

export const GallerySection: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <section id="gallery" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                    Gallery
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weddingData.gallery.slice(0, 3).map((photo) => (
                        <div key={photo.id} className="group cursor-pointer">
                            <AspectRatio ratio={4 / 3}>
                                <img
                                    src={photo.url}
                                    alt={photo.caption || "Wedding photo"}
                                    className="object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105 w-full h-full"
                                />
                            </AspectRatio>
                            {photo.caption && (
                                <p className="text-center text-gray-600 mt-2 text-sm">
                                    {photo.caption}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
