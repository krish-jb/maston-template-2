import type React from "react";
import { useEffect } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/contexts/WeddingContext";
import useSyncUsername from "@/hooks/useSyncUsername";
import Loading from "@/components/Loading";

const AllWishes: React.FC = () => {
    const { globalIsLoading, weddingWishes, loadAllWeddingWishes } = useWedding();   
    const navigate = useNavigate();
    const { username } = useParams();

    useSyncUsername(username);
    useEffect(() => {
        loadAllWeddingWishes();
        window.scrollTo(0, 0);
    }, [loadAllWeddingWishes]);

    
    if (globalIsLoading) {
        return <Loading />;
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-20">
            <Header />
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="font-Arima text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Wedding Wishes
                    </h2>
                    <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Beautiful messages from our loved ones
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {weddingWishes.map((wish, index) => (
                        <FadeIn key={`${wish.id}_fade_in`} delay={100 * index}>
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
                        </FadeIn>
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
