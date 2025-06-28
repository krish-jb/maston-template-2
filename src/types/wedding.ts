export interface WeddingData {
    couple: {
        groomName: string;
        brideName: string;
        weddingQuote: string;
        image: string;
    };
    story: {
        title: string;
        content: string;
        image: string;
    };
    weddingDetails: {
        event1: EventDetails;
        event2: EventDetails;
        toKnow1: ToKnow;
        toKnow2: ToKnow;
        toKnow3: ToKnow;
    };
    schedule: Array<{
        id: string;
        time: string;
        event: string;
        description: string;
    }>;
    gallery: Array<{
        id: string;
        url: string;
        caption: string;
    }>;
    moreInfo: {
        title: string;
        content: string;
    };
    contact: {
        phone: string;
        email: string;
        address: string;
        addressMapLink: string;
    };
    jeweller: {
        title: string;
        description: string;
        shopName: string;
        website: string;
    };
}

export interface EventDetails {
    title: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    addressMapLink: string;
}

export interface ToKnow {
    title: string;
    description: string;
}
export interface ScheduleItem {
    id: string;
    time: string;
    event: string;
    description: string;
}

export interface GalleryItem {
    id: string;
    url: string;
    caption: string | null;
}

export interface WeddingWishType {
    id: string;
    name: string;
    message: string;
}

export interface User {
    id: string;
    email: string;
    isAuthenticated: boolean;
}
