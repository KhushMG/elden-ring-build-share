"use client";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
/* 
Displays a list of all builds associated with the user,
and allows users to share their profile page
*/

const UserProfilePage = ({ params }) => {
  // extracting clerk user id
  const { userId } = params;
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const fetchBuilds = async () => {
      const { data: builds, error } = await supabase
        .from("builds")
        .select("*")
        .eq("clerk_user_id", userId);

      if (error) {
        return <div> Error fetching builds</div>;
      } else {
        setBuilds(builds);
      }
    };
    fetchBuilds();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold"> Your Builds</h1>
      <ul className="space-y-4">
        {builds.map((build) => {
          <li key={build.id}>
            <a
              href={`/builds/${build.id}`}
              className="text-blue-500 underline-offset-2"
            >
              {build.build_name}
            </a>
          </li>;
        })}
      </ul>

      {/* Copy profile link */}
      <button
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        className="mt-5 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Copy Profile Link
      </button>
    </div>
  );
};

export default UserProfilePage;
