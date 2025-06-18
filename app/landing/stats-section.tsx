"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface StatCardProps {
  count: string
  title: string
  description: string
  image: string
}

const StatCard = ({ count, title, description, image }: StatCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        setIsHovered(true)
        console.log(isHovered)
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Overlay */}
      <div className="relative h-64 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
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
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const stats = [
    {
      count: "300+",
      title: "Delegates Expected",
      description:
        "Distinguished delegates from across the East African Community including government ministers, education officials, language experts, cultural ambassadors, youth leaders, and media representatives united in promoting Kiswahili for regional integration.",
      image: "/LOREM.png",
    },
    {
      count: "10+",
      title: "Distinguished Speakers",
      description:
        "Prestigious lineup featuring EAC Secretary General, Ministers from partner states, UNESCO representatives, language scholars, and youth innovators sharing insights on Kiswahili's role in education, technology, and sustainable development.",
      image: "/speakers.jpg",
    },
    {
      count: "8",
      title: "EAC Partner States",
      description:
        "All 8 EAC Partner States participating: Burundi, DR Congo, Kenya, Rwanda, Somalia, South Sudan, Uganda, and Tanzania - showcasing East African unity through our shared language heritage.",
      image: "/countries.jpg",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">KISWAHILI: LUGHA YA UMOJA</h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              The 4th EAC World Kiswahili Language Day brings together three transformative events — Media Briefing,
              Youth Engagement Symposium, and Main Celebrations - into one comprehensive platform. This integration aims
              to strengthen the role of Kiswahili in fostering regional integration, youth empowerment, and cultural
              preservation across the East African Community.
            </p>

            <p className="text-lg text-gray-700">
              <strong>Key objectives of the celebration include:</strong>
              <br />
              To promote Kiswahili as a language of unity, innovation, and development; enhance youth competencies in
              Kiswahili for regional integration and employment; showcase the role of artificial intelligence in
              inclusive Kiswahili education; and facilitate sustainable partnerships between educational institutions,
              governments, and communities in advancing our shared linguistic heritage.
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
  )
}
