// "use client";

// import type React from "react";
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { BACKEND_URL } from "@/lib/config";
// import Image from "next/image";

// interface Speaker {
//   id: string;
//   name: string;
//   position: string;
//   shortDescription: string;
//   biography: string;
//   status: string;
//   published: boolean;
//   profile_picture_url: string | null;
// }

// export default function SpeakersPage() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [speakers, setSpeakers] = useState<Speaker[]>([]);
//   const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSpeakers = async () => {
//       try {
//         const response = await fetch(`${BACKEND_URL}/speakers/getAllSpeakers`, {
//           method: "GET",
//           headers: {
//             accept: "*/*",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`API error: ${response.status}`);
//         }

//         const data = await response.json();
//         // Filter only published speakers
//         const publishedSpeakers = data.filter(
//           (speaker: Speaker) => speaker.published
//         );
//         setSpeakers(publishedSpeakers);
//       } catch (error) {
//         console.error("Failed to fetch speakers:", error);
//         setError("Failed to load speakers");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSpeakers();
//   }, []);

//   // Completely redesigned animated border effect
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Store canvas dimensions to avoid null checks later
//     let canvasWidth = 0;
//     let canvasHeight = 0;

//     // Set canvas dimensions to match parent container
//     const resizeCanvas = () => {
//       const container = canvas.parentElement;
//       if (container) {
//         canvas.width = container.offsetWidth;
//         canvas.height = container.offsetHeight;
//         // Store dimensions for use in other functions
//         canvasWidth = canvas.width;
//         canvasHeight = canvas.height;
//       }
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Particle class for animated dots
//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       color: string;
//       alpha: number;
//       targetX: number;
//       targetY: number;
//       stage: number;
//       progress: number;

//       constructor(
//         startX: number,
//         startY: number,
//         targetX: number,
//         targetY: number
//       ) {
//         this.x = startX;
//         this.y = startY;
//         this.size = Math.random() * 2 + 1;
//         this.speedX = 0;
//         this.speedY = 0;

//         // Different blue shades
//         const blueShades = [
//           "#026FB4",
//           "#00A9DE",
//           "#0288D1",
//           "#01579B",
//           "#039BE5",
//         ];
//         this.color = blueShades[Math.floor(Math.random() * blueShades.length)];

//         this.alpha = 1;
//         this.targetX = targetX;
//         this.targetY = targetY;
//         this.stage = 0; // 0: moving to target, 1: scattering
//         this.progress = 0;
//       }

//       update() {
//         if (this.stage === 0) {
//           // Move along path
//           this.progress += 0.01;

//           if (this.progress >= 1) {
//             // Reached target, start scattering
//             this.stage = 1;
//             this.speedX = (Math.random() - 0.5) * 2;
//             this.speedY = (Math.random() - 0.5) * 2;
//           } else {
//             // Linear interpolation for movement
//             this.x = this.x + (this.targetX - this.x) * 0.05;
//             this.y = this.y + (this.targetY - this.y) * 0.05;
//           }
//         } else {
//           // Scatter
//           this.x += this.speedX;
//           this.y += this.speedY;

//           // Fade out
//           this.alpha -= 0.02;
//           if (this.alpha < 0) this.alpha = 0;
//         }
//       }

//       draw(ctx: CanvasRenderingContext2D) {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle =
//           this.color +
//           Math.floor(this.alpha * 255)
//             .toString(16)
//             .padStart(2, "0");
//         ctx.fill();
//       }
//     }

//     // Line segment class for the border
//     class LineSegment {
//       startX: number;
//       startY: number;
//       endX: number;
//       endY: number;
//       width: number;
//       color: string;
//       speed: number;
//       progress: number;
//       maxProgress: number;
//       side: number;
//       direction: number;

//       constructor(
//         side: number,
//         position: number,
//         length: number,
//         direction: number,
//         width: number,
//         height: number
//       ) {
//         this.side = side; // 0: top, 1: right, 2: bottom, 3: left
//         this.direction = direction; // 1: forward, -1: backward
//         this.width = Math.random() * 3 + 2;
//         this.speed = Math.random() * 0.01 + 0.005;
//         this.progress = 0;
//         this.maxProgress = Math.random() * 0.4 + 0.6; // How much of the segment to show (60-100%)

//         // Different blue shades
//         const blueShades = ["#026FB4", "#00A9DE", "#0288D1"];
//         this.color = blueShades[Math.floor(Math.random() * blueShades.length)];

//         // Set start and end positions based on side
//         switch (side) {
//           case 0: // Top
//             this.startX = direction > 0 ? position : position + length;
//             this.startY = 0;
//             this.endX = direction > 0 ? position + length : position;
//             this.endY = 0;
//             break;
//           case 1: // Right
//             this.startX = width;
//             this.startY = direction > 0 ? position : position + length;
//             this.endX = width;
//             this.endY = direction > 0 ? position + length : position;
//             break;
//           case 2: // Bottom
//             this.startX =
//               direction > 0 ? width - position : width - position - length;
//             this.startY = height;
//             this.endX =
//               direction > 0 ? width - position - length : width - position;
//             this.endY = height;
//             break;
//           case 3: // Left
//             this.startX = 0;
//             this.startY =
//               direction > 0 ? height - position : height - position - length;
//             this.endX = 0;
//             this.endY =
//               direction > 0 ? height - position - length : height - position;
//             break;
//           default:
//             this.startX = 0;
//             this.startY = 0;
//             this.endX = 0;
//             this.endY = 0;
//         }
//       }

//       update() {
//         this.progress += this.speed;
//         if (this.progress > 1) {
//           this.progress = 0;
//         }
//       }

//       draw(ctx: CanvasRenderingContext2D) {
//         const visibleProgress = Math.min(this.progress, this.maxProgress);
//         const startProgress = Math.max(
//           0,
//           this.progress - (1 - this.maxProgress)
//         );

//         // Calculate visible portion of the line
//         let drawStartX, drawStartY, drawEndX, drawEndY;

//         if (this.direction > 0) {
//           drawStartX = this.startX + (this.endX - this.startX) * startProgress;
//           drawStartY = this.startY + (this.endY - this.startY) * startProgress;
//           drawEndX = this.startX + (this.endX - this.startX) * visibleProgress;
//           drawEndY = this.startY + (this.endY - this.startY) * visibleProgress;
//         } else {
//           drawStartX = this.endX + (this.startX - this.endX) * startProgress;
//           drawStartY = this.endY + (this.startY - this.endY) * startProgress;
//           drawEndX = this.endX + (this.startX - this.endX) * visibleProgress;
//           drawEndY = this.endY + (this.startY - this.endY) * visibleProgress;
//         }

//         ctx.beginPath();
//         ctx.moveTo(drawStartX, drawStartY);
//         ctx.lineTo(drawEndX, drawEndY);
//         ctx.lineWidth = this.width;
//         ctx.strokeStyle = this.color;
//         ctx.lineCap = "round";
//         ctx.stroke();
//       }
//     }

//     // Create particles and line segments
//     const particles: Particle[] = [];
//     const lineSegments: LineSegment[] = [];

//     // Create line segments for each side
//     const segmentsPerSide = 8;
//     const createLineSegments = () => {
//       lineSegments.length = 0;

//       for (let side = 0; side < 4; side++) {
//         const sideLength = side % 2 === 0 ? canvasWidth : canvasHeight;

//         for (let i = 0; i < segmentsPerSide; i++) {
//           const position = Math.random() * sideLength;
//           const length = Math.random() * 80 + 40;
//           const direction = Math.random() > 0.5 ? 1 : -1;

//           lineSegments.push(
//             new LineSegment(
//               side,
//               position,
//               length,
//               direction,
//               canvasWidth,
//               canvasHeight
//             )
//           );
//         }
//       }
//     };

//     createLineSegments();

//     // Function to create particles
//     const createParticles = (x: number, y: number, count: number) => {
//       for (let i = 0; i < count; i++) {
//         // Random position along the border
//         let targetX, targetY;
//         const side = Math.floor(Math.random() * 4);

//         switch (side) {
//           case 0: // Top
//             targetX = Math.random() * canvasWidth;
//             targetY = 0;
//             break;
//           case 1: // Right
//             targetX = canvasWidth;
//             targetY = Math.random() * canvasHeight;
//             break;
//           case 2: // Bottom
//             targetX = Math.random() * canvasWidth;
//             targetY = canvasHeight;
//             break;
//           case 3: // Left
//             targetX = 0;
//             targetY = Math.random() * canvasHeight;
//             break;
//           default:
//             targetX = 0;
//             targetY = 0;
//         }

//         particles.push(new Particle(x, y, targetX, targetY));
//       }
//     };

//     // Create initial particles
//     const centerX = canvasWidth / 2;
//     const centerY = canvasHeight / 2;
//     createParticles(centerX, centerY, 50);

//     // Animation loop
//     let animationFrameId: number;
//     let lastParticleTime = 0;

//     const animate = (timestamp: number) => {
//       ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//       // Create new particles periodically
//       if (timestamp - lastParticleTime > 500) {
//         // Every 500ms
//         createParticles(centerX, centerY, 10);
//         lastParticleTime = timestamp;
//       }

//       // Draw subtle border
//       ctx.beginPath();
//       ctx.rect(0, 0, canvasWidth, canvasHeight);
//       ctx.lineWidth = 1;
//       ctx.strokeStyle = "#026FB440"; // Semi-transparent blue
//       ctx.stroke();

//       // Update and draw line segments
//       lineSegments.forEach((segment) => {
//         segment.update();
//         segment.draw(ctx);
//       });

//       // Update and draw particles
//       for (let i = particles.length - 1; i >= 0; i--) {
//         particles[i].update();
//         particles[i].draw(ctx);

//         // Remove faded particles
//         if (particles[i].alpha <= 0) {
//           particles.splice(i, 1);
//         }
//       }

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animationFrameId = requestAnimationFrame(animate);

//     // Handle window resize
//     const handleResize = () => {
//       resizeCanvas();
//       // Only recreate line segments if canvas exists
//       if (canvas) {
//         createLineSegments();
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   // Function to assign colors to speakers in rotation
//   const getSpeakerColor = (index: number) => {
//     const colors = ["#23AF57", "#EC2227", "#00A9DE"]; // Green, Red, Blue
//     return colors[index % colors.length];
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#026FB4]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900">
//             Meet The Speakers
//           </h1>
//         </div>

//         <div className="relative p-8 mb-12 min-h-[600px]">
//           {/* Animated border canvas */}
//           <canvas
//             ref={canvasRef}
//             className="absolute inset-0 w-full h-full pointer-events-none"
//           />

//           {/* Speakers grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
//             {speakers.map((speaker, index) => (
//               <SpeakerCard
//                 key={speaker.id}
//                 speaker={speaker}
//                 color={getSpeakerColor(index)}
//                 onClick={() => setSelectedSpeaker(speaker)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Speaker Modal */}
//       <AnimatePresence>
//         {selectedSpeaker && (
//           <SpeakerModal
//             speaker={selectedSpeaker}
//             onClose={() => setSelectedSpeaker(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// interface SpeakerCardProps {
//   speaker: Speaker;
//   color: string;
//   onClick: () => void;
// }

// function SpeakerCard({ speaker, color, onClick }: SpeakerCardProps) {
//   // Create rgba color with 10% opacity for background
//   const rgbaBackground = `${color}1A`; // 1A is 10% opacity in hex

//   // Create border gradient style
//   const borderGradient = {
//     borderWidth: "1.17px",
//     borderStyle: "solid",
//     borderImage: `linear-gradient(to right, ${color} 0%, ${color} 100%) 1`,
//     borderRadius: "16px", // Added border radius
//   };

//   return (
//     <motion.div
//       className="rounded-2xl overflow-hidden h-full cursor-pointer" // Added cursor-pointer
//       style={{
//         backgroundColor: rgbaBackground,
//         ...borderGradient,
//       }}
//       whileHover={{
//         scale: 1.05,
//         boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//         transition: { duration: 0.3 },
//       }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       onClick={onClick}
//     >
//       <div className="p-6 flex flex-col items-center text-center">
//         <div
//           className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2"
//           style={{ borderColor: color }}
//         >
//           <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
//             <Image
//               src={
//                 speaker.profile_picture_url ||
//                 "/placeholder.svg?height=200&width=200"
//               }
//               alt={`${speaker.name}`}
//               className="w-full h-full object-cover"
//               width={128}
//               height={128}
//               unoptimized={speaker.profile_picture_url?.startsWith(
//                 "/placeholder"
//               )}
//             />
//           </div>
//         </div>

//         <h3 className="text-lg font-medium text-gray-900 mb-1">
//           {speaker.name}
//         </h3>
//         <p className="text-sm text-gray-500 mb-1">{speaker.position}</p>
//         <p className="text-sm text-gray-600">{speaker.shortDescription}</p>
//       </div>
//     </motion.div>
//   );
// }

// interface SpeakerModalProps {
//   speaker: Speaker;
//   onClose: () => void;
// }

// function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
//   // Close modal when clicking outside
//   const modalRef = useRef<HTMLDivElement>(null);

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
//       onClose();
//     }
//   };

//   // Close on escape key
//   useEffect(() => {
//     const handleEscKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleEscKey);
//     return () => document.removeEventListener("keydown", handleEscKey);
//   }, [onClose]);

//   return (
//     <motion.div
//       className="fixed inset-0 bg-[#00000070] z-50 flex items-center justify-center p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={handleBackdropClick}
//     >
//       <motion.div
//         ref={modalRef}
//         className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//         transition={{ type: "spring", damping: 25 }}
//       >
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//           aria-label="Close"
//         >
//           <X size={20} />
//         </button>

//         <div className="p-6 flex flex-col items-center">
//           {/* Speaker image */}
//           <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-2 border-[#026FB4]">
//             <Image
//               src={
//                 speaker.profile_picture_url ||
//                 "/placeholder.svg?height=200&width=200"
//               }
//               alt={`${speaker.name}`}
//               className="w-full h-full object-cover"
//               width={128}
//               height={128}
//               unoptimized={speaker.profile_picture_url?.startsWith(
//                 "/placeholder"
//               )}
//             />
//           </div>

//           {/* Speaker info */}
//           <h3 className="text-xl font-bold text-gray-900 mb-1">
//             {speaker.name}
//           </h3>
//           <p className="text-md text-gray-700 mb-1">{speaker.position}</p>
//           <p className="text-sm text-gray-600 mb-4">
//             {speaker.shortDescription}
//           </p>

//           {/* Speaker bio */}
//           <p className="text-gray-700 text-center">{speaker.biography}</p>

//           {/* Close button */}
//           <button
//             onClick={onClose}
//             className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { BACKEND_URL } from "@/lib/config"
import Image from "next/image"

interface Speaker {
  id: string
  name: string
  position: string
  shortDescription: string
  biography: string
  status: string
  published: boolean
  profile_picture_url: string | null
}

export default function SpeakersPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const borderCanvasRef = useRef<HTMLCanvasElement>(null)
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const speakersPerPage = 8 // 2 rows of 4 speakers

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/speakers/getAllSpeakers`, {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        // Filter only published speakers
        const publishedSpeakers = data.filter((speaker: Speaker) => speaker.published)
        setSpeakers(publishedSpeakers)
      } catch (error) {
        console.error("Failed to fetch speakers:", error)
        setError("Failed to load speakers")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSpeakers()
  }, [])

  // Enhanced animated border effect with more dynamic elements
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Store canvas dimensions to avoid null checks later
    let canvasWidth = 0
    let canvasHeight = 0

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
        // Store dimensions for use in other functions
        canvasWidth = canvas.width
        canvasHeight = canvas.height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class for animated dots
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      targetX: number
      targetY: number
      stage: number
      progress: number

      constructor(startX: number, startY: number, targetX: number, targetY: number) {
        this.x = startX
        this.y = startY
        this.size = Math.random() * 2 + 1
        this.speedX = 0
        this.speedY = 0

        // Enhanced color palette with more vibrant blues
        const blueShades = ["#026FB4", "#00A9DE", "#0288D1", "#01579B", "#039BE5", "#29B6F6"]
        this.color = blueShades[Math.floor(Math.random() * blueShades.length)]

        this.alpha = 1
        this.targetX = targetX
        this.targetY = targetY
        this.stage = 0 // 0: moving to target, 1: scattering
        this.progress = 0
      }

      update() {
        if (this.stage === 0) {
          // Move along path with improved easing
          this.progress += 0.01

          if (this.progress >= 1) {
            // Reached target, start scattering
            this.stage = 1
            this.speedX = (Math.random() - 0.5) * 3 // Increased speed
            this.speedY = (Math.random() - 0.5) * 3
          } else {
            // Improved easing for smoother movement
            const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
            // Apply easing to the movement
            this.x = this.x + (this.targetX - this.x) * (0.05 * ease(this.progress))
            this.y = this.y + (this.targetY - this.y) * (0.05 * ease(this.progress))
          }
        } else {
          // Scatter with slight acceleration
          this.speedX *= 1.01
          this.speedY *= 1.01
          this.x += this.speedX
          this.y += this.speedY

          // Fade out
          this.alpha -= 0.02
          if (this.alpha < 0) this.alpha = 0
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle =
          this.color +
          Math.floor(this.alpha * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      }
    }

    // Enhanced line segment class for the border
    class LineSegment {
      startX: number
      startY: number
      endX: number
      endY: number
      width: number
      color: string
      speed: number
      progress: number
      maxProgress: number
      side: number
      direction: number
      glow: boolean

      constructor(side: number, position: number, length: number, direction: number, width: number, height: number) {
        this.side = side // 0: top, 1: right, 2: bottom, 3: left
        this.direction = direction // 1: forward, -1: backward
        this.width = Math.random() * 3 + 2
        this.speed = Math.random() * 0.01 + 0.005
        this.progress = Math.random() // Random starting position
        this.maxProgress = Math.random() * 0.4 + 0.6 // How much of the segment to show (60-100%)
        this.glow = Math.random() > 0.7 // Some lines will glow

        // Enhanced blue shades with more variety
        const blueShades = ["#026FB4", "#00A9DE", "#0288D1", "#29B6F6", "#4FC3F7"]
        this.color = blueShades[Math.floor(Math.random() * blueShades.length)]

        // Set start and end positions based on side
        switch (side) {
          case 0: // Top
            this.startX = direction > 0 ? position : position + length
            this.startY = 0
            this.endX = direction > 0 ? position + length : position
            this.endY = 0
            break
          case 1: // Right
            this.startX = width
            this.startY = direction > 0 ? position : position + length
            this.endX = width
            this.endY = direction > 0 ? position + length : position
            break
          case 2: // Bottom
            this.startX = direction > 0 ? width - position : width - position - length
            this.startY = height
            this.endX = direction > 0 ? width - position - length : width - position
            this.endY = height
            break
          case 3: // Left
            this.startX = 0
            this.startY = direction > 0 ? height - position : height - position - length
            this.endX = 0
            this.endY = direction > 0 ? height - position - length : height - position
            break
          default:
            this.startX = 0
            this.startY = 0
            this.endX = 0
            this.endY = 0
        }
      }

      update() {
        this.progress += this.speed
        if (this.progress > 1) {
          this.progress = 0
          // Occasionally change color when restarting
          if (Math.random() > 0.7) {
            const blueShades = ["#026FB4", "#00A9DE", "#0288D1", "#29B6F6", "#4FC3F7"]
            this.color = blueShades[Math.floor(Math.random() * blueShades.length)]
            this.glow = Math.random() > 0.7
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const visibleProgress = Math.min(this.progress, this.maxProgress)
        const startProgress = Math.max(0, this.progress - (1 - this.maxProgress))

        // Calculate visible portion of the line
        let drawStartX, drawStartY, drawEndX, drawEndY

        if (this.direction > 0) {
          drawStartX = this.startX + (this.endX - this.startX) * startProgress
          drawStartY = this.startY + (this.endY - this.startY) * startProgress
          drawEndX = this.startX + (this.endX - this.startX) * visibleProgress
          drawEndY = this.startY + (this.endY - this.startY) * visibleProgress
        } else {
          drawStartX = this.endX + (this.startX - this.endX) * startProgress
          drawStartY = this.endY + (this.startY - this.endY) * startProgress
          drawEndX = this.endX + (this.startX - this.endX) * visibleProgress
          drawEndY = this.endY + (this.startY - this.endY) * visibleProgress
        }

        // Add glow effect to some lines
        if (this.glow) {
          ctx.shadowBlur = 10
          ctx.shadowColor = this.color
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.moveTo(drawStartX, drawStartY)
        ctx.lineTo(drawEndX, drawEndY)
        ctx.lineWidth = this.width
        ctx.strokeStyle = this.color
        ctx.lineCap = "round"
        ctx.stroke()

        // Reset shadow
        ctx.shadowBlur = 0
      }
    }

    // Create particles and line segments
    const particles: Particle[] = []
    const lineSegments: LineSegment[] = []

    // Floating dots class for background effect
    class FloatingDot {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.5 + 0.1
        this.color = "#026FB4"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1
        if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1

        // Pulsate alpha
        this.alpha += Math.sin(Date.now() * 0.001) * 0.01
        this.alpha = Math.max(0.1, Math.min(0.6, this.alpha))
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle =
          this.color +
          Math.floor(this.alpha * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      }
    }

    const floatingDots: FloatingDot[] = []
    for (let i = 0; i < 50; i++) {
      floatingDots.push(new FloatingDot())
    }

    // Create line segments for each side
    const segmentsPerSide = 10 // Increased number of segments
    const createLineSegments = () => {
      lineSegments.length = 0

      for (let side = 0; side < 4; side++) {
        const sideLength = side % 2 === 0 ? canvasWidth : canvasHeight

        for (let i = 0; i < segmentsPerSide; i++) {
          const position = Math.random() * sideLength
          const length = Math.random() * 100 + 50 // Longer segments
          const direction = Math.random() > 0.5 ? 1 : -1

          lineSegments.push(new LineSegment(side, position, length, direction, canvasWidth, canvasHeight))
        }
      }
    }

    createLineSegments()

    // Function to create particles
    const createParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        // Random position along the border
        let targetX, targetY
        const side = Math.floor(Math.random() * 4)

        switch (side) {
          case 0: // Top
            targetX = Math.random() * canvasWidth
            targetY = 0
            break
          case 1: // Right
            targetX = canvasWidth
            targetY = Math.random() * canvasHeight
            break
          case 2: // Bottom
            targetX = Math.random() * canvasWidth
            targetY = canvasHeight
            break
          case 3: // Left
            targetX = 0
            targetY = Math.random() * canvasHeight
            break
          default:
            targetX = 0
            targetY = 0
        }

        particles.push(new Particle(x, y, targetX, targetY))
      }
    }

    // Create initial particles
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    createParticles(centerX, centerY, 80) // More initial particles

    // Animation loop
    let animationFrameId: number
    let lastParticleTime = 0

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Draw floating background dots
      floatingDots.forEach((dot) => {
        dot.update()
        dot.draw(ctx)
      })

      // Create new particles periodically
      if (timestamp - lastParticleTime > 400) {
        // More frequent particles
        createParticles(centerX, centerY, 15)
        lastParticleTime = timestamp
      }

      // Draw subtle border with gradient
      ctx.beginPath()
      ctx.rect(0, 0, canvasWidth, canvasHeight)
      ctx.lineWidth = 1

      // Create gradient border
      const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
      gradient.addColorStop(0, "#026FB440")
      gradient.addColorStop(0.5, "#00A9DE40")
      gradient.addColorStop(1, "#0288D140")
      ctx.strokeStyle = gradient
      ctx.stroke()

      // Update and draw line segments
      lineSegments.forEach((segment) => {
        segment.update()
        segment.draw(ctx)
      })

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw(ctx)

        // Remove faded particles
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
      // Only recreate line segments if canvas exists
      if (canvas) {
        createLineSegments()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Main container border animation
  useEffect(() => {
    const canvas = borderCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Store canvas dimensions
    let canvasWidth = 0
    let canvasHeight = 0

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        // Make canvas slightly larger than container to ensure border is visible
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
        canvasWidth = canvas.width
        canvasHeight = canvas.height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Brand colors
    const brandColors = ["#23AF57", "#EC2227", "#00A9DE"] // Green, Red, Blue

    // Border light class
    class BorderLight {
      x!: number
      y!: number
      size: number
      speed: number
      color: string
      progress: number
      clockwise: boolean
      glowSize: number
      pulseSpeed: number
      pulsePhase: number

      constructor() {
        this.clockwise = Math.random() > 0.5
        this.progress = Math.random()
        this.speed = Math.random() * 0.002 + 0.0005
        this.size = Math.random() * 4 + 3
        this.glowSize = Math.random() * 25 + 15
        this.pulseSpeed = Math.random() * 0.05 + 0.02
        this.pulsePhase = Math.random() * Math.PI * 2
        this.color = brandColors[Math.floor(Math.random() * brandColors.length)]

        // Initialize position
        this.updatePosition()
      }

      updatePosition() {
        const padding = 0 // Distance from the edge

        // Calculate position along the perimeter
        const perimeter = 2 * (canvasWidth + canvasHeight)
        const distance = this.progress * perimeter

        // Top edge
        if (distance < canvasWidth) {
          this.x = distance
          this.y = padding
        }
        // Right edge
        else if (distance < canvasWidth + canvasHeight) {
          this.x = canvasWidth - padding
          this.y = distance - canvasWidth
        }
        // Bottom edge
        else if (distance < 2 * canvasWidth + canvasHeight) {
          this.x = canvasWidth - (distance - canvasWidth - canvasHeight)
          this.y = canvasHeight - padding
        }
        // Left edge
        else {
          this.x = padding
          this.y = canvasHeight - (distance - 2 * canvasWidth - canvasHeight)
        }
      }

      update() {
        // Update progress along the path
        this.progress += this.clockwise ? this.speed : -this.speed

        // Keep progress in [0, 1] range
        if (this.progress > 1) this.progress -= 1
        if (this.progress < 0) this.progress += 1

        // Update position
        this.updatePosition()

        // Pulse the glow size
        this.glowSize = (Math.sin(Date.now() * this.pulseSpeed + this.pulsePhase) + 1) * 15 + 10
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize)
        gradient.addColorStop(0, this.color + "FF") // Full opacity at center
        gradient.addColorStop(0.5, this.color + "80") // 50% opacity
        gradient.addColorStop(1, this.color + "00") // Transparent at edge

        // Draw glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw core
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = "#FFFFFF"
        ctx.fill()
      }
    }

    // Create border lights
    const borderLights: BorderLight[] = []
    for (let i = 0; i < 30; i++) {
      borderLights.push(new BorderLight())
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Draw border
      ctx.beginPath()
      ctx.rect(0, 0, canvasWidth, canvasHeight)
      ctx.lineWidth = 6 // Thicker border

      // Create gradient for border
      const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
      gradient.addColorStop(0, "#23AF5780") // Green with 50% opacity
      gradient.addColorStop(0.33, "#EC222780") // Red with 50% opacity
      gradient.addColorStop(0.66, "#00A9DE80") // Blue with 50% opacity
      gradient.addColorStop(1, "#23AF5780") // Back to green

      ctx.strokeStyle = gradient

      // Add glow to the border
      ctx.shadowBlur = 15
      ctx.shadowColor = "#00A9DE"
      ctx.stroke()
      ctx.shadowBlur = 0

      // Update and draw border lights
      borderLights.forEach((light) => {
        light.update()
        light.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Function to assign colors to speakers in rotation
  const getSpeakerColor = (index: number) => {
    const colors = ["#23AF57", "#EC2227", "#00A9DE"] // Green, Red, Blue
    return colors[index % colors.length]
  }

  // Calculate pagination
  const indexOfLastSpeaker = currentPage * speakersPerPage
  const indexOfFirstSpeaker = indexOfLastSpeaker - speakersPerPage
  const currentSpeakers = speakers.slice(indexOfFirstSpeaker, indexOfLastSpeaker)
  const totalPages = Math.ceil(speakers.length / speakersPerPage)

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#026FB4]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Meet The Speakers</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from industry experts and thought leaders who are shaping the future
          </p>
        </div>

        {/* Main container with animated border */}
        <div className="relative p-8 mb-8 min-h-[600px] bg-white rounded-xl overflow-hidden shadow-lg">
          {/* Border animation canvas - positioned absolutely to cover the border */}
          <canvas
            ref={borderCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Inner content animation */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Speakers grid with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
            >
              {currentSpeakers.map((speaker, index) => (
                <SpeakerCard
                  key={speaker.id}
                  speaker={speaker}
                  color={getSpeakerColor(indexOfFirstSpeaker + index)}
                  onClick={() => setSelectedSpeaker(speaker)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination controls */}
          {speakers.length > speakersPerPage && (
            <div className="mt-12 flex justify-center items-center space-x-2 relative z-10">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentPage === page ? "bg-[#026FB4] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Speaker Modal */}
      <AnimatePresence>
        {selectedSpeaker && <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />}
      </AnimatePresence>
    </div>
  )
}

interface SpeakerCardProps {
  speaker: Speaker
  color: string
  onClick: () => void
}

function SpeakerCard({ speaker, color, onClick }: SpeakerCardProps) {
  // Create rgba color with 10% opacity for background
  const rgbaBackground = `${color}1A` // 1A is 10% opacity in hex

  return (
    <motion.div
      className="rounded-2xl overflow-hidden h-full cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
      style={{
        backgroundColor: rgbaBackground,
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderColor: color,
        borderRadius: "16px",
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 relative" style={{ borderColor: color }}>
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
            <Image
              src={speaker.profile_picture_url || "/placeholder.svg?height=200&width=200"}
              alt={`${speaker.name}`}
              className="w-full h-full object-cover"
              width={128}
              height={128}
              unoptimized={speaker.profile_picture_url?.startsWith("/placeholder")}
            />
          </div>
          {/* Decorative circle */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${color}`,
              opacity: 0.5,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-1">{speaker.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{speaker.position}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{speaker.shortDescription}</p>
      </div>
    </motion.div>
  )
}

interface SpeakerModalProps {
  speaker: Speaker
  onClose: () => void
}

function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  // Close modal when clicking outside
  const modalRef = useRef<HTMLDivElement>(null)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 bg-[#00000070] z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Decorative top border */}
        <div className="h-1.5 bg-gradient-to-r from-[#23AF57] via-[#EC2227] to-[#00A9DE]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 flex flex-col items-center">
          {/* Speaker image with animated border */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#026FB4] relative z-10">
              <Image
                src={speaker.profile_picture_url || "/placeholder.svg?height=200&width=200"}
                alt={`${speaker.name}`}
                className="w-full h-full object-cover"
                width={128}
                height={128}
                unoptimized={speaker.profile_picture_url?.startsWith("/placeholder")}
              />
            </div>

            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid #23AF57", // Green
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid #EC2227", // Red
                opacity: 0.2,
              }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid #00A9DE", // Blue
                opacity: 0.15,
              }}
              animate={{
                scale: [1, 1.45, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </div>

          {/* Speaker info */}
          <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
          <p className="text-md text-gray-700 mb-1">{speaker.position}</p>
          <p className="text-sm text-gray-600 mb-4">{speaker.shortDescription}</p>

          {/* Speaker bio */}
          <div className="text-gray-700 text-center max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            <p>{speaker.biography}</p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-[#23AF57] via-[#EC2227] to-[#00A9DE] text-white rounded-md transition-all hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
