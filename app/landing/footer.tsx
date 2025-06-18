"use client";

import type React from "react";

// import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  // const [email, setEmail] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email) return;

  //   setIsSubmitting(true);
  //   console.log(isSubmitting);

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setIsSubmitted(true);
  //     console.log(isSubmitted);
  //     setEmail("");

  //     // Reset success message after 3 seconds
  //     setTimeout(() => {
  //       setIsSubmitted(false);
  //     }, 3000);
  //   }, 1000);
  // };

  return (
    <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Logo and Contact */}
          <div className="space-y-6">
            <div className="w-48 h-16 relative">
              <Image
                src="/eac.jpeg"
                alt="Rwanda FutureSkills Forum Logo"
                width={92}
                height={34}
                className="object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 pt-4">
                  Call Us
                </h3>
                <motion.a
                  href="tel:+250792401576"
                  className="text-lg font-medium text-gray-900 hover:text-[#026FB4] transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  +250 788 424 208
                </motion.a>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Email Us
                </h3>
                <motion.a
                  href="mailto:rwandafutureskillsforum@rtb.gov.rw"
                  className="text-lg font-medium text-gray-900 hover:text-[#026FB4] transition-colors break-all"
                  whileHover={{ scale: 1.05 }}
                >
                  eaccelebrations@mineduc.gov.rw
                </motion.a>
              </div>
            </div>
          </div>

{/*         
          <div className="space-y-6">
            ?

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#026FB4] focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="bg-[#026FB4] text-white px-6 py-3 rounded-md font-medium disabled:opacity-70"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Joining..." : isSubmitted ? "Joined!" : "Join"}
              </motion.button>
            </form>

            {isSubmitted && (
              <motion.p
                className="text-green-600 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you for subscribing to our newsletter!
              </motion.p>
            )}
          </div> */}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500">© 2025 4th EAC World Kiswahili Language Day Celebrations</p>
        </div>
      </div>
    </footer>
  );
}
