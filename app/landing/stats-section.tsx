"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface StatCardProps {
  count: string;
  title: string;
  description: string;
  image: string;
}

const StatCard = ({ count, title, description, image }: StatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        setIsHovered(true);
        console.log(isHovered);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Overlay */}
      <div className="relative h-64 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#026FB4]/70"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col text-white">
        <motion.h3
          className="text-3xl font-bold mb-2"
          // animate={{ scale: isHovered ? 1.1 : 1 }}
          // transition={{ duration: 0.3 }}
        >
          {count}
        </motion.h3>
        <h4 className="text-xl font-medium mb-4">{title}</h4>
        <p className="text-sm mb-6">{description}</p>

        {/* <div className="mt-auto">
          <motion.button
            className="text-sm font-medium flex items-center"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div> */}
      </div>
    </motion.div>
  );
};

export default function StatsSection() {
  const stats = [
    {
      count: "350+",
      title: "Participants",
      description:
        "Join over 350 passionate individuals from across sectors who are coming together to shape the future of skills development. From educators and students to innovators and policymakers, our participants represent a vibrant mix of experiences and insights. Their active engagement fuels meaningful dialogue and cross-sector collaboration throughout the forum.",
      image: "/LOREM.png",
    },
    {
      count: "30+",
      title: "Speakers",
      description:
        "Our lineup of over 30 distinguished speakers includes thought leaders, industry experts, government officials, and education pioneers. Each speaker brings valuable knowledge and real-world experience to the stage, delivering impactful presentations and guiding discussions that challenge thinking and inspire action.",
      image: "/speakers.jpg",
    },
    {
      count: "43",
      title: "countries represented",
      description:
        "With representatives from 43 countries across Africa and beyond, the forum is a truly global event. This diverse international presence fosters cultural exchange, promotes inclusive perspectives, and highlights innovative practices from around the world—all aimed at advancing technical and vocational education.",
      image: "/countries.jpg",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            GLOBAL SKILLS CONNECT
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              The Rwanda FutureSkills Forum 2025 combines three major events —
              TVET Expo, Global Skills Connect 2025, and an Inter Ministerial
              Summit - into one comprehensive platform. This integration aims to
              create stronger synergies between TVET, the Private Sector and the
              Government, ensuring a more effective and impactful skills
              development agenda at regional level.
            </p>

            <p className="text-lg text-gray-700">
              <strong>Rwanda Future Skills Forum objectives include:</strong>
              <br />
              To provide a strategic response to the skills development
              challenges in Africa and across key economic sectors; promote TVET
              at national and international level; enable the establishment of
              strong partnership between TVET providers and industries; and
              facilitate a sustainable adaptation of the skills development
              process.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              count={stat.count}
              title={stat.title}
              description={stat.description}
              image={stat.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
