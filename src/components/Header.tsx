import { HeartIcon } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWedding } from "@/contexts/WeddingContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import scrollToElement from "@/utils/ScrollToElement";

// Types
interface Section {
    id: string;
    label: string;
    disabled?: boolean;
}

interface NavigationButtonProps {
    section: Section;
    onClick: (sectionId: string) => void;
    className?: string;
    isMobile?: boolean;
}

// Navigation Button Component - eliminates repeated button code
const NavigationButton: React.FC<NavigationButtonProps> = ({ 
    section, 
    onClick, 
    className = "", 
    isMobile = false 
}) => {
    const isDisabled = section.disabled || false;
    
    const buttonClasses = cn(
        "transition-colors uppercase",
        isMobile && "text-center border-b",
        isDisabled 
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-pink-600",
        className
    );

    return (
        <button
            className={buttonClasses}
            onClick={() => onClick(section.id)}
            disabled={isDisabled}
            type="button"
        >
            {section.label}
        </button>
    );
};

// Custom hook for IntersectionObserver management
const useIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit,
    dependencies: React.DependencyList = []
) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(callback, options);
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, dependencies);

    return observerRef;
};

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const { weddingData, isLoggedIn, logout, user } = useWedding();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("hero");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [headerPosition, setHeaderPosition] = useState("-translate-y-full");
    const [itemColor, setItemColor] = useState<"text-gray-600" | "text-wedding-cream">("text-gray-600");

    // Enhanced sections data with labels included
    const sections = useMemo<Section[]>(
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

    // Filter sections that should be rendered in navigation
    const navigationSections = useMemo(() => 
        sections.filter(section => 
            !['info', 'jewellery'].includes(section.id) && !section.disabled
        ), 
        [sections]
    );

    // Main section observer for active section tracking
    const mainObserverRef = useIntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        {
            root: null,
            rootMargin: "0px 0px -50% 0px", 
            threshold: 0.3,
        },
        [sections]
    );

    // Header visibility observer
    const headerVisibilityObserverRef = useIntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                setHeaderPosition("translate-y-0");
            } else {
                setHeaderPosition("-translate-y-full");
            }
        },
        {
            root: null,
            threshold: 0,
        },
        []
    );

    // Observe sections for main observer
    useEffect(() => {
        if (!mainObserverRef.current) return;

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                mainObserverRef.current?.observe(element);
            }
        });
    }, [sections, mainObserverRef]);

    // Observe header sentinel
    useEffect(() => {
        const sentinel = document.getElementById("top-sentinal");
        if (!sentinel || !headerVisibilityObserverRef.current) return;

        headerVisibilityObserverRef.current.observe(sentinel);
    }, [headerVisibilityObserverRef]);

    // Update item color based on active section
    useEffect(() => {
        setItemColor(
            activeSection === "details" || activeSection === "wishes"
                ? "text-wedding-cream"
                : "text-gray-600",
        );
    }, [activeSection]);

    const scrollToSection = useCallback((sectionId: string) => {
        // Check if the section is disabled
        const section = sections.find(s => s.id === sectionId);
        if (section?.disabled) {
            return; // Don't scroll to disabled sections
        }
        
        const element = document.getElementById(sectionId);
        
        // If element exists on current page, scroll to it
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setSidebarOpen(false);
            setIsMobileMenuOpen(false);
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
        setIsMobileMenuOpen(false);
    }, [navigate, user?.username, sections]);

    const toggleSidebar = useCallback(
        () => setSidebarOpen((prev) => !prev),
        [],
    );

    const closeSidebar = useCallback(() => setSidebarOpen(false), []);
    
    // Helper function to get section disabled state
    const isSectionDisabled = useCallback((sectionId: string) => {
        const section = sections.find(s => s.id === sectionId);
        return section?.disabled || false;
    }, [sections]);

    // Render navigation buttons using map instead of hardcoded buttons
    const renderNavigationButtons = (isMobile: boolean = false) => {
        return navigationSections.map((section) => (
            <NavigationButton
                key={section.id}
                section={section}
                onClick={scrollToSection}
                isMobile={isMobile}
            />
        ));
    };
    
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

                {/* Desktop Navigation - using renderNavigationButtons */}
                <div className="hidden md:flex space-x-6 font-light">
                    {renderNavigationButtons()}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && (
                            <Button onClick={logout} variant="outline">
                                Logout
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile menu toggle button */}
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

            {/* Mobile Menu - using renderNavigationButtons */}
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
                    {renderNavigationButtons(true)}
                    {isLoggedIn && (
                        <button
                            className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                            onClick={logout}
                            type="button"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};
