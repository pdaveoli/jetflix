"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SecurityPage() {
  return (
    <div className="w-full min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
      <UserProfile 
        appearance={{
          elements: {
            rootBox: "w-full mx-auto max-w-4xl",
            card: "rounded-xl shadow-lg border border-gray-100",
          },
        }}
      />
    </div>
  );
}
