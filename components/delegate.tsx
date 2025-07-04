// ... existing code ...
/*
All code commented out for registration closure.

"use client";

// ... (rest of the file is commented out)
*/

import React from "react";
import Link from "next/link";

export default function RegistrationClosed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <img src="/eac.jpeg" alt="eac world kiswahili" className="mx-auto mb-4 w-40" />
        </div>
        <h1 className="text-4xl font-bold text-blue-800 mb-4">REGISTRATION CLOSED!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Thank you for your interest in the 4th EAC World Kiswahili Language Day Celebrations
        </p>
        <p className="text-gray-500 mb-6">
          Registration for this event has now closed. Please check back for future events.
        </p>
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <span className="block font-semibold text-blue-700 mb-1">Stay Connected</span>
           
          </div>
        </div>
        <Link href="/" legacyBehavior>
          <a className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded transition">Return to Home</a>
        </Link>
      </div>
    </div>
  );
}
