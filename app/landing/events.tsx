"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function PartnersPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Define positions with proper spacing
    const rtbPosition = { x: canvas.width * 0.25, y: canvas.height * 0.5 }

    // Increased gap between lines and logos
    const lineEndGap = 80

    // For the blue line, make it extend closer to the image
    const blueLineEndGap = 10

    const positions = [
      { x: canvas.width * 0.75, y: canvas.height * 0.25, color: "#23AF57" }, // Green - Global Skills Connect
      { x: canvas.width * 0.75, y: canvas.height * 0.5, color: "#00A9DE" }, // Blue - Interministerial Summit
      { x: canvas.width * 0.75, y: canvas.height * 0.75, color: "#EC2227" }, // Red - TVET Expo
    ]

    // Particle system
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
      controlPoint1: { x: number; y: number }
      controlPoint2: { x: number; y: number }
      progress: number
      isCurved: boolean

      constructor(
        startX: number,
        startY: number,
        targetX: number,
        targetY: number,
        color: string,
        isCurved: boolean,
        isTopCurve: boolean,
      ) {
        this.x = startX
        this.y = startY
        this.size = Math.random() * 3 + 1
        this.speedX = 0
        this.speedY = 0
        this.color = color
        this.alpha = 1
        this.targetX = targetX
        this.targetY = targetY
        this.stage = 0 // 0: moving to target, 1: scattering
        this.progress = 0
        this.isCurved = isCurved

        // Control points for Bezier curve
        if (isCurved) {
          const midX = (startX + targetX) / 2
          if (isTopCurve) {
            // For top curve (green)
            this.controlPoint1 = { x: midX, y: startY - 80 }
            this.controlPoint2 = { x: midX, y: targetY - 80 }
          } else {
            // For bottom curve (red)
            this.controlPoint1 = { x: midX, y: startY + 80 }
            this.controlPoint2 = { x: midX, y: targetY + 80 }
          }
        } else {
          // Straight line (blue)
          this.controlPoint1 = { x: 0, y: 0 }
          this.controlPoint2 = { x: 0, y: 0 }
        }
      }

      update() {
        if (this.stage === 0) {
          // Move along path
          this.progress += 0.005

          if (this.progress >= 1) {
            // Reached target, start scattering
            this.stage = 1
            this.speedX = (Math.random() - 0.5) * 2
            this.speedY = (Math.random() - 0.5) * 2
          } else {
            // Calculate position along path
            if (this.isCurved) {
              // Cubic Bezier curve
              const t = this.progress
              const mt = 1 - t
              this.x =
                mt * mt * mt * this.x +
                3 * mt * mt * t * this.controlPoint1.x +
                3 * mt * t * t * this.controlPoint2.x +
                t * t * t * this.targetX
              this.y =
                mt * mt * mt * this.y +
                3 * mt * mt * t * this.controlPoint1.y +
                3 * mt * t * t * this.controlPoint2.y +
                t * t * t * this.targetY
            } else {
              // Linear interpolation for straight line
              this.x = this.x + (this.targetX - this.x) * 0.02
              this.y = this.y + (this.targetY - this.y) * 0.02
            }
          }
        } else {
          // Scatter
          this.x += this.speedX
          this.y += this.speedY

          // Fade out
          this.alpha -= 0.01
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

    // Create particle systems for each connection
    const particleSystems: Particle[][] = []
    let currentAnimation = 0 // 0: green, 1: blue, 2: red
    let animationTimer = 0
    const animationDelay = 300 // Frames between animations

    // Function to create a new wave of particles
    const createParticleWave = (targetIndex: number) => {
      const particles: Particle[] = []
      const target = positions[targetIndex]
      const isCurved = targetIndex !== 1 // Curve for green and red, straight for blue
      const isTopCurve = targetIndex === 0 // Top curve for green

      // Starting point with gap from RTB logo
      const startX = rtbPosition.x + 60 // Increased gap from RTB
      const startY = rtbPosition.y

      // End point with gap from destination logo
      const endX = target.x - (targetIndex === 1 ? blueLineEndGap : lineEndGap)
      const endY = target.y

      for (let i = 0; i < 30; i++) {
        particles.push(
          new Particle(
            startX + (Math.random() - 0.5) * 10,
            startY + (Math.random() - 0.5) * 10,
            endX,
            endY,
            target.color,
            isCurved,
            isTopCurve,
          ),
        )
      }

      particleSystems.push(particles)
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Starting point with gap from RTB logo
      const startX = rtbPosition.x + 60 // Increased gap from RTB
      const startY = rtbPosition.y

      // Draw static connection lines with proper curves and gaps
      ctx.lineWidth = 1.5

      // Green line (top curve)
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.bezierCurveTo(
        (startX + (positions[0].x - lineEndGap)) / 2,
        startY - 100, // Increased curve height
        (startX + (positions[0].x - lineEndGap)) / 2,
        positions[0].y - 100, // Increased curve height
        positions[0].x - lineEndGap,
        positions[0].y,
      )
      ctx.strokeStyle = positions[0].color + "80" // 50% opacity
      ctx.stroke()

      // Blue line (straight) - extend closer to the image
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(positions[1].x - blueLineEndGap, positions[1].y)
      ctx.strokeStyle = positions[1].color + "80" // 50% opacity
      ctx.stroke()

      // Red line (bottom curve)
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.bezierCurveTo(
        (startX + (positions[2].x - lineEndGap)) / 2,
        startY + 100, // Increased curve height
        (startX + (positions[2].x - lineEndGap)) / 2,
        positions[2].y + 100, // Increased curve height
        positions[2].x - lineEndGap,
        positions[2].y,
      )
      ctx.strokeStyle = positions[2].color + "80" // 50% opacity
      ctx.stroke()

      // Draw connection dots
      const dotRadius = 5

      // RTB dot
      ctx.beginPath()
      ctx.arc(startX, startY, dotRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#026FB4"
      ctx.fill()

      // Target dots
      positions.forEach((pos, index) => {
        ctx.beginPath()
        ctx.arc(pos.x - (index === 1 ? blueLineEndGap : lineEndGap), pos.y, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = pos.color
        ctx.fill()
      })

      // Update and draw particles
      for (let i = particleSystems.length - 1; i >= 0; i--) {
        const system = particleSystems[i]
        let allFaded = true

        for (const particle of system) {
          particle.update()
          particle.draw(ctx)

          if (particle.alpha > 0) {
            allFaded = false
          }
        }

        // Remove completely faded particle systems
        if (allFaded) {
          particleSystems.splice(i, 1)
        }
      }

      // Sequential animation logic
      animationTimer++

      if (animationTimer >= animationDelay) {
        animationTimer = 0

        // Move to next animation type
        currentAnimation = (currentAnimation + 1) % 3

        // Create new particles for current animation
        createParticleWave(currentAnimation)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start with green animation
    createParticleWave(0)

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Co-Hosted by</h1>
          <div className="w-full max-w-xl mx-auto mt-4 border-t-2 border-blue-500"></div>
        </div>
  
        <div className="relative border border-gray-200 rounded-lg p-8 mb-12 min-h-[600px] w-full bg-white shadow-lg">
          {/* Animated connections canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full pointer-events-none" />
  
          {/* Larger: Ministry of Education Logo */}
          <div className="absolute" style={{ left: "15%", top: "10%", transform: "translate(-50%, -50%)" }}>
            <div className="w-40 h-40 relative"> {/* Increased size */}
              <Image
                src="/mineduc.jpg"
                alt="Republic of Rwanda Ministry of Education"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
  
          {/* Larger: MIFOTRA Logo */}
          <div className="absolute" style={{ right: "15%", top: "10%", transform: "translate(50%, -50%)" }}>
            <div className="w-40 h-40 relative"> {/* Increased size */}
              <Image
                src="/MIFOTRA.webp"
                alt="MIFOTRA"
                width={200}
                height={200}
                className="object-contain"
              />
              <p className="text-xs text-center mt-1">MIFOTRA</p>
            </div>
          </div>
  
          {/* Smaller logos remain unchanged */}
          <div className="absolute" style={{ left: "15%", top: "35%", transform: "translate(-50%, -50%)" }}>
            <div className="w-35 h-25 relative">
              <Image src="/RTB.png" alt="Rwanda Polytechnic" width={120} height={80} className="object-contain" />
            </div>
          </div>
  
          <div className="absolute" style={{ left: "15%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <div className="w-30 h-20 relative">
              <Image src="/RP.jpg" alt="Rwanda TVET Board" width={100} height={80} className="object-contain" />
            </div>
          </div>
  
          <div className="absolute" style={{ left: "15%", top: "63%", transform: "translate(-50%, -50%)" }}>
            <div className="w-32 h-15 relative">
              <Image src="/PSF.jpg" alt="Private Sector Federation" width={100} height={40} className="object-contain " />
            </div>
          </div>
  
          <div className="absolute" style={{ left: "15%", top: "85%", transform: "translate(-50%, -50%)" }}>
            <div className="w-32 h-20 relative pt-4">
              <Image src="/DP.jpg" alt="Development Partners" width={120} height={80} className="object-contain" />
            </div>
          </div>
  
          <div className="absolute" style={{ right: "15%", top: "30%", transform: "translate(50%, -50%)" }}>
            <div className="w-48 h-20 relative">
              <Image src="/GLOBALSKILLS.jpg" alt="Rwanda FutureSkills Forum - Global Skills Connect" width={180} height={80} className="object-contain bg-green-500" />
            </div>
          </div>
  
          <div className="absolute" style={{ right: "15%", top: "50%", transform: "translate(50%, -50%)" }}>
            <div className="w-48 h-20 relative">
              <Image src="/INTERSUMMIT.jpg" alt="Rwanda FutureSkills Forum - Interministerial Summit" width={180} height={80} className="object-contain bg-blue-500" />
            </div>
          </div>
  
          <div className="absolute" style={{ right: "15%", top: "75%", transform: "translate(50%, -50%)" }}>
            <div className="w-48 h-20 relative">
              <Image src="/TVETEXPO.jpg" alt="Rwanda FutureSkills Forum - TVET Expo" width={180} height={80} className="object-contain bg-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
