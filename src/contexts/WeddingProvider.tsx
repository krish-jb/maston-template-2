import React, { useState, useEffect } from "react";
import { WeddingData, User, WeddingWishType } from "@/types/wedding";
import { WeddingContext } from "./WeddingContext";
import { Session } from "@supabase/supabase-js";
import uploadImage from "@/utils/UploadImage";
import { Json } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import {flushSync} from "react-dom";

const defaultWeddingData: WeddingData = {
   couple: {
      groomName: "John",
      brideName: "Jane",
      weddingQuote: "Two hearts becoming one, forever and always",
      image: "/placeholder.svg",
   },
   story: {
      title: "Our Love Story",
      content:
         "Once upon a time, two hearts found each other in this beautiful journey of life. Through laughter, tears, and countless memories, we discovered that we were meant to be together forever.",
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
         description:
            "Your presence is the only present we need. However, if you wish to give a gift, a monetary contribution would be appreciated.",
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
      content:
         "We are so excited to celebrate this special day with you. Please let us know if you have any dietary restrictions or special accommodations needed. We can't wait to see you there!",
   },
   contact: {
      phone: "+1 (555) 123-4567",
      email: "contact@ourwedding.com",
      address: "123 Main Street, Cityville, State 12345",
   },
   jeweller: {
      title: "Our Wedding Jeweller",
      description: "Discover exquisite wedding rings and jewellery collections from our trusted partner.",
      shopName: "Edimannickal Gold and Diamonds",
      website: "https://www.instagram.com/edimannickalgoldanddiamonds?igsh=czd3ZzV3bjNvMQ==",
   },
};

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
   const [weddingWishes, setWeddingWishes] = useState<Array<WeddingWishType>>([]);
   const [user, setUser] = useState<User | null>(null);
   const [session, setSession] = useState<Session | null>(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [globalIsLoading, setGlobalState] = useState(true);

   useEffect(() => {
      // Set up auth state listener
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
         flushSync(() => {
            setSession(session);
         })
         loadWeddingData(import.meta.env.VITE_WEBSITE_KEY);
         if (session?.user) {
            const mappedUser: User = {
               id: session.user.id,
               email: session.user.email || "",
               isAuthenticated: true,
            };
            setUser(mappedUser);
            setIsLoggedIn(true);
         } else {
            setUser(null);
            setIsLoggedIn(false);
         }
      });

      // Check for existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
         if (session?.user) {
            const mappedUser: User = {
               id: session.user.id,
               email: session.user.email || "",
               isAuthenticated: true,
            };
            setUser(mappedUser);
            setIsLoggedIn(true);
            loadWeddingData(import.meta.env.VITE_WEBSITE_KEY);
         }
      });

      return () => subscription.unsubscribe();
   }, []);

   const loadWeddingData = async (id: string) => {
      try {
         const { data: weddingData, error: weddingError } = await supabase
            .from("wedding_data")
            .select("data")
            .eq("id", id)
            .maybeSingle();

         const { data: wishData, error: wishError } = await supabase
            .from("guest_wishes")
            .select("id, name, message")
            .eq("variant", id)
            .order("created_at", { ascending: false })
            .limit(3);

         if (weddingError) {
            console.error("Error loading wedding data:", weddingError);
            return;
         }

         if (wishError) {
            console.error("Error loading wish data: ", wishError);
         }

         if (weddingData?.data) {
            setWeddingData(weddingData.data as unknown as WeddingData);
            setGlobalState(false);
         }

         if (wishData) {
            setWeddingWishes(wishData);
         }
      } catch (error) {
         console.error("Error loading wedding data:", error);
      }
   };

   const loadAllWeddingWishes = async () => {
      try {
         const { data: wishData, error: wishError } = await supabase
            .from("guest_wishes")
            .select("id, name, message")
            .eq("variant", import.meta.env.VITE_WEBSITE_KEY)
            .order("created_at", { ascending: false });

         if (wishError) {
            console.log("Error loading all wishes (Supabase error): ", wishError);
            return;
         }

         if (wishData) {
            setWeddingWishes(wishData);
         }
      } catch (error) {
         console.log("Error loading all wishes: ", error);
      }
   };

   const updateWeddingData = (data: Partial<WeddingData>) => {
      setWeddingData((prev) => {
         const updated = { ...prev, ...data };
         saveData(updated); // save to backend

         return updated;
      });
   };

   const updateGalleryImage = async (file: File | null, imageCaption: string | null, index: number) => {
      const updatedGallery = [...weddingData.gallery];

      if (index >= updatedGallery.length) {
         updatedGallery.push({
            id: `${updatedGallery.length}`,
            url: "",
            caption: imageCaption,
         });
      }

      if (file) {
         const imageUrl = await uploadImage(file, user, `gallery_image_${index}`);
         updatedGallery[index].url = imageUrl;
      }

      updatedGallery[index].caption = imageCaption;
      updateWeddingData({ gallery: updatedGallery });
   };

   const saveData = async (data: WeddingData) => {
      if (!user?.id) {
         console.error("No user logged in");
         return;
      }

      try {
         const { error } = await supabase.from("wedding_data").upsert(
            {
               user_id: user.id,
               data: data as unknown as Json,
               updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
         );

         if (error) {
            console.error("Error saving wedding data:", error);
         }
      } catch (error) {
         console.error("Error saving wedding data:", error);
      }
   };

   const addWish = async (wish: WeddingWishType) => {
      try {
         const { error } = await supabase.from("guest_wishes").insert({
            name: wish.name,
            message: wish.message,
            variant: import.meta.env.VITE_WEBSITE_KEY,
         });

         if (error) {
            console.log("Error adding new wish(Supabase error)", error);
         }
      } catch (error) {
         console.log("Error adding new wish", error);
      }
   };

   const login = async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      return { error };
   };

   const signUp = async (email: string, password: string, fullName?: string) => {
      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signUp({
         email,
         password,
         options: {
            emailRedirectTo: redirectUrl,
            data: {
               full_name: fullName,
            },
         },
      });
      return { error };
   };

   const logout = async () => {
      await supabase.auth.signOut();
   };

   return (
      <WeddingContext.Provider
         value={{
            weddingData,
            weddingWishes,
            setWeddingWishes,
            loadAllWeddingWishes,
            user,
            session,
            isLoggedIn,
            globalIsLoading,
            updateWeddingData,
            updateGalleryImage,
            saveData,
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
