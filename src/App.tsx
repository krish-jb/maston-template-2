import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeddingProvider } from "./contexts/WeddingProvider";
import AllWishes from "./pages/AllWishes";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import LoginRoute from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <WeddingProvider>
                    <Routes>
                       <Route path="/login" element={<LoginRoute />} />
                        <Route path="/wishes/:username" element={<AllWishes />} />
                        <Route
                            path="/gallery/:username"
                            element={<Gallery />}
                        />
                        <Route path="/:username" element={<Index />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </WeddingProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
