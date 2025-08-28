import { HeartIcon } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWedding } from "@/contexts/WeddingContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import scrollToElement from "@/utils/ScrollToElement";

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const { weddingData, isLoggedIn, logout, user } = useWedding();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("hero");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [headerPosition, setHeaderPosition] = useState("-translate-y-full");
    const [itemColor, setItemColor] = useState<
        "text-gray-600" | "text-wedding-cream"
    >("text-gray-600");

    const sections = useMemo(
        () => [
            { id: "hero", label: "Home", disabled: false },
            {
                id: "story",
                label: "Our Story",
                disabled: weddingData?.story?.disabled,
            },
            {
                id: "details",
                label: "Details",
                disabled: weddingData?.weddingDetails?.disabled,
            },
            { id: "schedule", label: "Schedule", disabled: false },
            { id: "gallery", label: "Gallery", disabled: false },
            {
                id: "wishes",
                label: "Wishes",
                disabled: weddingData?.wishDisabled,
            },
            {
                id: "contact",
                label: "Contact",
                disabled: weddingData?.contact?.disabled,
            },
            { id: "info", label: "Info", disabled: true },
            {
                id: "jewellery",
                label: "Jewellery",
                disabled: weddingData?.jeweller?.disabled,
            },
        ],
        [
            weddingData?.story?.disabled,
            weddingData?.weddingDetails?.disabled,
            weddingData?.wishDisabled,
            weddingData?.contact?.disabled,
            weddingData?.jeweller?.disabled,
        ],
    );

    const mainObserver = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px 0px -50% 0px",
            threshold: 0.3,
        };

        mainObserver.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                mainObserver.current?.observe(element);
            }
        });

        return () => {
            if (mainObserver.current) mainObserver.current.disconnect();
        };
    }, [sections]);

    const headerVisibilityObserver = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const sentinel = document.getElementById("top-sentinal");
        const header = document.getElementById("header");

        if (!sentinel || !header) return;

        const options = {
            root: null,
            threshold: 0,
        };

        headerVisibilityObserver.current = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setHeaderPosition("translate-y-0");
                } else {
                    setHeaderPosition("-translate-y-full");
                }
            },
            options,
        );

        headerVisibilityObserver.current.observe(sentinel);

        return () => {
            if (headerVisibilityObserver.current)
                headerVisibilityObserver.current.disconnect();
        };
    }, []);

    useEffect(() => {
        setItemColor(
            activeSection === "details" || activeSection === "wishes"
                ? "text-wedding-cream"
                : "text-gray-600",
        );
    }, [activeSection]);

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        
        // If element exists on current page, scroll to it
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setSidebarOpen(false);
            return;
        }
        
        // If element doesn't exist, navigate to main page first
        if (user?.username) {
            // Navigate to main page with the section hash
            navigate(`/${user.username}`);
            
            // Wait for navigation to complete, then scroll to section
            setTimeout(() => {
                const targetElement = document.getElementById(sectionId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
        
        setSidebarOpen(false);
    }, [navigate, user?.username])

    const toggleSidebar = useCallback(
        () => setSidebarOpen((prev) => !prev),
        [],
    );

    const closeSidebar = useCallback(() => setSidebarOpen(false), []);
    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 transition-all duration-300",
                headerPosition
                    ? "py-4 bg-white border-b border-gray-200/20 shadow-sm"
                    : "py-3 bg-transparent",
            )}
        >
            <nav className="flex container mx-auto px-4 md:px-6 items-center justify-between">
                <Link
                    to="/"
                    className={cn(
                        "text-xl font-Pacifico",
                        headerPosition ? "text-pink-500" : "text-black",
                    )}
                >
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="flex flex-row gap-2"
                        type="button"
                    >
                        <HeartIcon color={itemColor} width={25} />
                        {weddingData.couple.groomName[0]} &{" "}
                        {weddingData.couple.brideName[0]} Wedding
                        <HeartIcon color={itemColor} width={25} />
                    </button>
                </Link>

                <div className="hidden md:flex space-x-6 font-light">
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection("story")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Our Story
                    </button>
                    <button
                        onClick={() => scrollToSection("details")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Details
                    </button>
                    <button
                        onClick={() => scrollToSection("schedule")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Schedule
                    </button>
                    <button
                        onClick={() => scrollToSection("gallery")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Gallery
                    </button>
                    <button
                        onClick={() => scrollToSection("wishes")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Wishes
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Contact
                    </button>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && (
                            <Button onClick={logout} variant="outline">
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    type="button"
                >
                    <span
                        className={cn(
                            "block w-6 transition-all duration-300",
                            isMobileMenuOpen ? "opacity-0" : "opacity-100",
                        )}
                    >
                        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
                        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
                        <span className="block w-4 h-0.5 bg-foreground" />
                    </span>
                </button>
            </nav>

            <div
                className={cn(
                    "fixed bg-white inset-0 z-40 flex flex-col pt-24 px-6 duration-500 transition-opacity transform ease-in-out md:hidden w-screen h-screen",
                    isMobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0",
                )}
            >
                <button
                    className="absolute top-5 right-5 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Close menu"
                    type="button"
                >
                    <span className="block w-6 h-0.5 bg-foreground transform rotate-45 translate-y-0.5" />
                    <span className="block w-6 h-0.5 bg-foreground transform -rotate-45" />
                </button>

                <nav className="flex flex-col space-y-6 text-lg bg-white font-light">
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("hero")}
                        type="button"
                    >
                        Home
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("story")}
                        type="button"
                    >
                        Our Story
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("details")}
                        type="button"
                    >
                        Details
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("schedule")}
                        type="button"
                    >
                        Schedule
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("gallery")}
                        type="button"
                    >
                        Gallery
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("wishes")}
                        type="button"
                    >
                        Wishes
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("contact")}
                        type="button"
                    >
                        Contact
                    </button>
                    {isLoggedIn && (
                        <button
                            className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                            onClick={logout}
                            type="button"
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};
