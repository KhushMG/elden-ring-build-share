// components/SignInComponent.js
"use client";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

const SignInComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRedirect = "/profile";

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in:", error.message);
      router.push("/"); // Redirect to home page on error
    } else {
      // After successful sign-in, get the user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Construct the redirect URL using the user ID
        const userId = session.user.id;
        const redirectTo = searchParams.get("redirect") || `/profile/${userId}`;

        router.push(redirectTo); 
      }
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignInComponent;
