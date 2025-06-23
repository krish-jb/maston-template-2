
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { WeddingData, User, WeddingWishType } from "@/types/wedding";
import { WeddingContext } from "./WeddingContext";

const defaultWeddingData: WeddingData = {
    couple: {
        groomName: "John",
        brideName: "Jane",
        weddingQuote: "Two hearts becoming one, forever and always",
        image: "/placeholder.svg",
    },
    story: {
        title: "Our Love Story",
        content: "Once upon a time, two hearts found each other in this beautiful journey of life. Through laughter, tears, and countless memories, we discovered that we were meant to be together forever.",
        image: "/placeholder.svg",
    },
    weddingDetails: {
        event1: {
            title: "Wedding Ceremony",
            date: "June 15, 2024",
            time: "4:00 PM",
            venue: "St. Mary's Church",
            address: "123 Church Street, Cityville, State 12345",
        },
        event2: {
            title: "Reception Party",
            date: "June 15, 2024",
            time: "7:00 PM",
            venue: "Grand Ballroom",
            address: "456 Reception Ave, Cityville, State 12345",
        },
        toKnow1: {
            title: "Dress Code",
            description: "Semi-formal attire requested. Please avoid wearing white.",
        },
        toKnow2: {
            title: "Parking",
            description: "Free parking available at the venue. Valet service will be provided.",
        },
        toKnow3: {
            title: "Gifts",
            description: "Your presence is the only present we need. However, if you wish to give a gift, a monetary contribution would be appreciated.",
        },
    },
    schedule: [
        {
            id: "1",
            time: "4:00 PM",
            event: "Ceremony Begins",
            description: "Join us as we exchange vows and begin our journey together",
        },
        {
            id: "2",
            time: "5:00 PM",
            event: "Cocktail Hour",
            description: "Celebrate with drinks and appetizers",
        },
        {
            id: "3",
            time: "7:00 PM",
            event: "Reception Dinner",
            description: "Enjoy a delicious dinner with family and friends",
        },
        {
            id: "4",
            time: "9:00 PM",
            event: "Dancing & Celebration",
            description: "Dance the night away with live music",
        },
    ],
    gallery: [
        {
            id: "1",
            url: "/placeholder.svg",
            caption: "Our engagement photo",
        },
        {
            id: "2",
            url: "/placeholder.svg",
            caption: "First vacation together",
        },
        {
            id: "3",
            url: "/placeholder.svg",
            caption: "With our families",
        },
    ],
    moreInfo: {
        title: "Additional Information",
        content: "We are so excited to celebrate this special day with you. Please let us know if you have any dietary restrictions or special accommodations needed. We can't wait to see you there!",
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "contact@ourwedding.com",
        address: "123 Main Street, Cityville, State 12345",
    },
    jeweller: {
        title: "Our Wedding Jeweller",
        description:
            "Discover exquisite wedding rings and jewellery collections from our trusted partner.",
        shopName: "Edimannickal Gold and Diamonds",
        website:
            "https://www.instagram.com/edimannickalgoldanddiamonds?igsh=czd3ZzV3bjNvMQ==",
    },
};

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
    const [weddingWishes, setWeddingWishes] = useState<WeddingWishType[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [globalIsLoading, setGlobalIsLoading] = useState(false);

    useEffect(() => {
        // For now, we'll use mock authentication
        // You can replace this with your actual backend integration
        setGlobalIsLoading(false);
    }, []);

    const updateWeddingData = (data: Partial<WeddingData>) => {
        setWeddingData((prev) => {
            const updated = { ...prev, ...data };
            saveData(updated);
            return updated;
        });
    };

    const saveData = async (data: WeddingData) => {
        // Mock save function - replace with your backend call
        console.log("Saving data:", data);
    };

    const loadAllWeddingWishes = async () => {
        // Mock function - replace with your backend call
        console.log("Loading all wishes");
    };

    const addWish = async (wish: { name: string; message: string }) => {
        // Mock function - replace with your backend call
        const newWish: WeddingWishType = {
            id: Date.now().toString(),
            name: wish.name,
            message: wish.message,
        };
        setWeddingWishes(prev => [newWish, ...prev]);
    };

    const login = async (email: string, password: string) => {
        // Mock login - replace with your backend call
        if (email === "admin@test.com" && password === "password") {
            setUser({
                id: "1",
                email: email,
                isAuthenticated: true,
            });
            setIsLoggedIn(true);
            return { error: null };
        }
        return { error: { message: "Invalid credentials" } };
    };

    const signUp = async (email: string, password: string, fullName?: string) => {
        // Mock signup - replace with your backend call
        return { error: null };
    };

    const logout = async () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <WeddingContext.Provider
            value={{
                weddingData,
                weddingWishes,
                user,
                isLoggedIn,
                globalIsLoading,
                updateWeddingData,
                saveData,
                loadAllWeddingWishes,
                addWish,
                login,
                signUp,
                logout,
            }}
        >
            {children}
        </WeddingContext.Provider>
    );
};
