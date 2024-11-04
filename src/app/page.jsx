// app/page.js or your homepage file
"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to Elden Ring Build Share </h1>
      <Button>
        <a href="/profile"> 
        Go to Profile
        </a>
        </Button>
    </div>
  );
}
