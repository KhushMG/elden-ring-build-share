// app/signin/page.js
"use client";
import { useEffect } from "react";

export default function ProfilePage({ params }) {
const { id } = params;
  return (
    <div>
      <h1>Profile Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
}
