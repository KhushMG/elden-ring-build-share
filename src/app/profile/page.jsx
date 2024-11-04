// app/profile/page.js
"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);

  
   useEffect(() => {
     const fetchSessionAndData = async () => {
       const {
         data: { session },
       } = await supabase.auth.getSession();

       if (!session) {
         // Redirect to sign-in page if no session exists
         router.push("/sign-in");
       } else {
         // Set profile data if session exists
         setProfileData(session.user.id);
       }
     };

     fetchSessionAndData();
   }, [router]);

  if (!profileData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Profile</h1>
      {"user id: " + profileData}

    </div>
  );
}
