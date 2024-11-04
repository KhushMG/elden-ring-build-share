// app/page.js or your homepage file
"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // If logged in, navigate to profile page
        router.push(`/profile/${session.user.id}`);
      }
    };

    checkUser();
  }, [router]);

  const handleGoToProfile = async () => {
    console.log("click")
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // Redirect to profile page if logged in
      router.push(`/profile/${session.user.id}`);
    } else {
      // Redirect to sign-in page if not logged in
      router.push("/sign-in");
    }
  };

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button onClick={handleGoToProfile}>Go to Profile</button>
    </div>
  );
}
