"use client"

import Image from "next/image"
import Navbar from "../landing/navbar"
import Footer from "../landing/footer"

export default function VenuePage() {
  

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar with white background */}
      <div className="w-full bg-white">
        <Navbar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Explore the Venue Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                EXPLORE THE <span style={{ color: "#23AF57" }}>VENUE</span>
              </h1>
              <p className="text-gray-600 uppercase tracking-wider text-sm md:text-base">
                KIGALI CONFERENCE AND EXHIBITION VILLAGE
              </p>
            </div>

            {/* Venue Map Image */}
            <div className="mb-8">
              <Image
                src="/venue.png"
                alt="Venue Map"
                width={1000}
                height={600}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>

          

            {/* Floor Plan 1 */}
            <div className="mb-12">
              <h2 className="text-center text-lg font-medium mb-4">Exhibition - Tent 1/Kivu</h2>
              <Image
                src="/tentone.png"
                alt="Floor 1 Layout"
                width={800}
                height={400}
                className="w-full h-auto border border-gray-300 rounded-lg"
              />
            </div>

            {/* Floor Plan 2 */}
            <div className="mb-12">
              <h2 className="text-center text-lg font-medium mb-4">Exhibition - Tent 2</h2>
              <Image
                src="/tent2.png"
                alt="Floor 2 Layout"
                width={800}
                height={400}
                className="w-full h-auto border border-gray-300 rounded-lg"
              />
            </div>
          </section>

          {/* Additional Sections - Placeholders for more images */}
          <section className="mb-16">
            <div className="text-center mb-8">
            <h2 className="text-center text-lg font-medium mb-4">Hospitality and Toursim Exhibition - Tent 3</h2>
            </div>
            <div className="mb-8">
              <Image
                src="/tent3.png"
                alt="Venue Facilities"
                width={900}
                height={500}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
            <h2 className="text-center text-lg font-medium mb-4">Skills Competition - Tent/Under Construction</h2>
            </div>
            <div className="mb-8">
              <Image
                src="/tent4.png"
                alt="Conference Rooms"
                width={900}
                height={500}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </section>

          
        </div>
      </main>

      <Footer />
    </div>
  )
}
