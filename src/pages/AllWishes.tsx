import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/contexts/WeddingContext";

const AllWishes: React.FC = () => {
    const { weddingWishes, loadAllWeddingWishes } = useWedding();
    const navigate = useNavigate();

    useEffect(() => {
        loadAllWeddingWishes();
    }, [loadAllWeddingWishes]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        All Wedding Wishes
                    </h1>
                    <Button onClick={() => navigate("/")} variant="outline">
                        Back to Website
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {weddingWishes.map((wish) => (
                        <Card
                            key={wish.id}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader>
                                <CardTitle className="text-pink-600">
                                    {wish.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 italic">
                                    "{wish.message}"
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {weddingWishes.length === 0 && (
                    <div className="text-center text-gray-600 mt-12">
                        <p className="text-xl">
                            No wishes yet. Be the first to share your wishes!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllWishes;
