"use client"

import { useEffect, useRef } from "react"
import Navbar from "../landing/navbar"
import Footer from "../landing/footer"
import Image from "next/image"

export default function InterMinisterialSummit() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animation for timeline items when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    // Observe timeline items
    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => {
      observer.observe(item)
    })

    // Add initial animation to first item after a short delay
    setTimeout(() => {
      const items = document.querySelectorAll(".timeline-item")
      if (items.length > 0) {
        items[0].classList.add("visible")
      }
    }, 500)

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="container mx-auto py-16 px-4 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-16">
            THE <span style={{ color: "#00A9DE" }}>INTER-MINISTERIAL</span> SUMMIT
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full bg-opacity-10"
                style={{ borderRadius: "0.5rem" }}
              ></div>
              <div className="relative z-10 h-[400px] w-[400px]">
                <Image src="/Groupsummit.png" alt="Summit speaker" fill className="rounded-lg object-cover shadow-lg" />
              </div>
            </div>

            <div className="md:ml-24 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">INTRO:
              </h2>
              <p className="text-gray-700">
                
Welcome to the Rwanda TVET Future Skills Forum! This dynamic platform brings together key stakeholders, including government ministers, industry leaders, educators, and innovators, to shape the future of technical and vocational education and training in Rwanda. A highlight of this year&apos;s forum is our crucial inter-ministerial meeting, where high-level officials will convene to address pivotal strategies for TVET advancement. Discussions will center on aligning national education policy with emerging industry needs, ensuring our training programs are directly relevant to the evolving job market. Furthermore, ministers will collaborate on fostering a national ecosystem for lifelong learning and upskilling through TVET, exploring pathways for continuous skills development for all Rwandans. Join us as we collectively chart a course for a skilled and prosperous future for Rwanda.
              </p>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="container mx-auto py-16 px-4 md:py-24 relative">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-16">
            TOPICS TO BE COVERED IN THE <br />
            <span style={{ color: "#00A9DE" }}>SUMMIT</span>
          </h2>

          <div ref={timelineRef} className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "0",
                bottom: "0",
                width: "2px",
                backgroundColor: "#00A9DE",
                transform: "translateX(-50%)",
                zIndex: "1",
              }}
              className="timeline-line"
            ></div>

            {/* Topic 1 */}
            <div className="timeline-item mb-40 opacity-0">
              <div className="flex flex-col md:flex-row items-center">
                {/* Left side - Image */}
                <div className="md:w-[45%] flex justify-end pr-0 md:pr-12">
                  <div className="h-[400px] w-[300px] relative">
                    <Image src="/interone.jpg" alt="Topic 1" fill className="rounded-lg object-cover" />
                  </div>
                </div>

                {/* Center - Timeline dot and line */}
                <div className="md:w-[10%] relative flex justify-center my-8 md:my-0">
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#00A9DE",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: "2",
                      boxShadow: "0 0 10px rgba(0, 169, 222, 0.5)",
                    }}
                  >
                    <div style={{ width: "24px", height: "24px", backgroundColor: "white", borderRadius: "50%" }}></div>
                  </div>
                  {/* Horizontal line to the right */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "60px",
                      height: "2px",
                      backgroundColor: "#00A9DE",
                      zIndex: "1",
                    }}
                  ></div>
                </div>

                {/* Right side - Content */}
                <div className="md:w-[45%] pl-0 md:pl-12 mt-6 md:mt-0">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    Aligning National Education Policy with Emerging Industry Needs for TVET Advancement.
                  </h3>
                  <p className="text-gray-700">
                    This session would delve into the crucial need for seamless alignment between Rwanda&apos;s overarching
                    national education policy and the rapidly evolving demands of various industries. Ministers from the
                    ministries of education, trade and industry, ICT and innovation, and finance and economic planning
                    would convene to discuss how current educational frameworks can be adapted to proactively address
                    future skills gaps identified in key sectors. The discussion would center on strategies for
                    incorporating industry insights into TVET curriculum development, fostering stronger public-private
                    partnerships for practical training and internships, and establishing robust mechanisms for
                    continuous skills forecasting and policy adjustments.
                  </p>
                </div>
              </div>
            </div>

            {/* Topic 2 */}
            <div className="timeline-item mb-24 opacity-0">
              <div className="flex flex-col md:flex-row items-center">
                {/* Left side - Content */}
                <div className="md:w-[45%] pr-0 md:pr-12 order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    Fostering a National Ecosystem for Lifelong Learning and Upskilling through TVET.
                  </h3>
                  <p className="text-gray-700">
                    This meeting would focus on establishing a comprehensive national ecosystem that promotes lifelong
                    learning and continuous upskilling through the TVET framework. Ministers responsible for education,
                    labor and public service, youth and culture, and gender and family promotion would collaborate to
                    explore strategies for creating accessible and flexible pathways for individuals to acquire new
                    skills and adapt to changing job market demands throughout their careers. Discussions would
                    encompass the development of modular training programs, the recognition of prior learning (RPL)
                    mechanisms, and the leveraging of digital platforms for remote learning and skills delivery.
                  </p>
                </div>

                {/* Center - Timeline dot and line */}
                <div className="md:w-[10%] relative flex justify-center order-1 md:order-2 my-8 md:my-0">
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#00A9DE",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: "2",
                      boxShadow: "0 0 10px rgba(0, 169, 222, 0.5)",
                    }}
                  >
                    <div style={{ width: "24px", height: "24px", backgroundColor: "white", borderRadius: "50%" }}></div>
                  </div>
                  {/* Horizontal line to the left */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "50%",
                      width: "60px",
                      height: "2px",
                      backgroundColor: "#00A9DE",
                      zIndex: "1",
                    }}
                  ></div>
                </div>

                {/* Right side - Image */}
                <div className="md:w-[45%] pl-0 md:pl-12 order-1 md:order-3">
                  <div className="h-[400px] w-[300px] relative">
                    <Image src="/interthree.jpg" alt="Topic 2" fill className="rounded-lg object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .timeline-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .timeline-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (max-width: 768px) {
          .timeline-item {
            margin-bottom: 60px;
          }
        }

        .timeline-line {
          background: linear-gradient(to bottom, transparent 0%, #00A9DE 100%);
          background-size: 100% 1000%;
          animation: animateLine 3s ease-in-out forwards;
        }
        
        @keyframes animateLine {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
      `}</style>
    </div>
  )
}
