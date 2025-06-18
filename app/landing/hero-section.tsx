"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image that spans both sections */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Top section with blue overlay */}
      <div className="relative h-[390px]">
        {/* Blue overlay with opacity */}
        <div className="absolute inset-0 w-full h-full bg-[#026FB4] opacity-50" />

        {/* Content for blue section */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            RWANDA FUTURESKILLS
            <br />
            FORUM 2025
          </motion.h1>

          <motion.p
            className="text-white text-sm md:text-lg max-w-3xl px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join	us	in	Kigali,	Rwanda,	for	the	Rwanda	FutureSkills	Forum	2025,	a	dynamic	platform	
combining	three	major	events:	TVET	Expo	,	Global	Skills	Connect	(1-5	June),	and	
Inter	Ministerial	Summit.	
          </motion.p>
        </div>
      </div>

      {/* Bottom section with green overlay */}
      <div className="relative h-[363px]">
        {/* Green overlay with opacity */}
        <div className="absolute inset-0 w-full h-full bg-[#23AF57] opacity-70" />

        {/* Content for green section */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Global Skills Connect Conference
          </motion.h2>

          <motion.p
            className="text-white text-sm md:text-base max-w-3xl mb-6 md:mb-8 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Global Skills Connect , and Inter Ministerial Summit(4-5 June) . Discover opportunities to connect, learn, and innovate in
            skills development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/delegate">
              <Button className="bg-white text-[#23AF57] hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium rounded-md">
                Book Your Spot
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
