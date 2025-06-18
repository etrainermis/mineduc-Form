"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function PartnersSection() {
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

    // Define positions for the two organizations
    const eacPosition = { x: canvas.width * 0.25, y: canvas.height * 0.5 }
    const rwandaPosition = { x: canvas.width * 0.75, y: canvas.height * 0.5 }

    // Particle system for connection
    class Particle {
      x: number
      y: number
      size: number
      color: string
      alpha: number
      targetX: number
      targetY: number
      progress: number
      direction: number // 1 for EAC to Rwanda, -1 for Rwanda to EAC

      constructor(startX: number, startY: number, targetX: number, targetY: number, direction: number) {
        this.x = startX
        this.y = startY
        this.size = Math.random() * 4 + 2
        this.color = direction === 1 ? "#00A9DE" : "#23AF57" // Blue for EAC->Rwanda, Green for Rwanda->EAC
        this.alpha = 1
        this.targetX = targetX
        this.targetY = targetY
        this.progress = 0
        this.direction = direction
      }

      update() {
        this.progress += 0.008

        if (this.progress >= 1) {
          // Reset particle
          this.progress = 0
          this.alpha = 1
          if (this.direction === 1) {
            this.x = eacPosition.x + 80
            this.y = eacPosition.y
          } else {
            this.x = rwandaPosition.x - 80
            this.y = rwandaPosition.y
          }
        } else {
          // Move along path with slight curve
          const t = this.progress
          const curveHeight = Math.sin(t * Math.PI) * 30 // Gentle curve

          this.x = this.x + (this.targetX - this.x) * 0.015
          this.y = this.y + (this.targetY - this.y) * 0.015 + curveHeight * (this.direction === 1 ? -1 : 1)

          // Fade in and out
          if (t < 0.2) {
            this.alpha = t / 0.2
          } else if (t > 0.8) {
            this.alpha = (1 - t) / 0.2
          }
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

        // Add glow effect
        ctx.shadowColor = this.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // Create particles
    const particles: Particle[] = []

    // Create particles flowing both ways
    for (let i = 0; i < 15; i++) {
      // EAC to Rwanda
      particles.push(
        new Particle(
          eacPosition.x + 80,
          eacPosition.y + (Math.random() - 0.5) * 20,
          rwandaPosition.x - 80,
          rwandaPosition.y + (Math.random() - 0.5) * 20,
          1,
        ),
      )

      // Rwanda to EAC
      particles.push(
        new Particle(
          rwandaPosition.x - 80,
          rwandaPosition.y + (Math.random() - 0.5) * 20,
          eacPosition.x + 80,
          eacPosition.y + (Math.random() - 0.5) * 20,
          -1,
        ),
      )
    }

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connection line
      ctx.beginPath()
      ctx.moveTo(eacPosition.x + 80, eacPosition.y)
      ctx.lineTo(rwandaPosition.x - 80, rwandaPosition.y)
      ctx.strokeStyle = "#E5E7EB"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw connection dots
      ctx.beginPath()
      ctx.arc(eacPosition.x + 80, eacPosition.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = "#00A9DE"
      ctx.fill()

      ctx.beginPath()
      ctx.arc(rwandaPosition.x - 80, rwandaPosition.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = "#23AF57"
      ctx.fill()

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hosted By
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#00A9DE] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl p-8 min-h-[400px] overflow-hidden">
          {/* Animated connections canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* EAC Logo */}
          <motion.div
            className="absolute left-16 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image src="/eac.jpeg" alt="East African Community" fill className="object-contain rounded-lg" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">East African Community</h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Regional intergovernmental organization promoting integration and cooperation
              </p>
            </div>
          </motion.div>

          {/* Republic of Rwanda Logo */}
          <motion.div
            className="absolute right-16 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image src="/repub.jpeg" alt="Republic of Rwanda" fill className="object-contain rounded-lg" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Republic of Rwanda</h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Host nation championing Kiswahili language development and regional unity
              </p>
            </div>
          </motion.div>

          {/* Partnership Badge */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="bg-gradient-to-r from-[#00A9DE] to-[#23AF57] text-white px-6 py-3 rounded-full shadow-lg">
              <p className="text-sm font-semibold text-center">Partnership</p>
              <p className="text-xs text-center opacity-90">for Unity</p>
            </div>
          </motion.div>
        </div>

        {/* Partnership Description */}
        <motion.div
          className="text-center mt-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            The 4th EAC World Kiswahili Language Day is a collaborative celebration between the
            <span className="font-semibold text-[#00A9DE]"> East African Community</span> and the
            <span className="font-semibold text-[#23AF57]"> Republic of Rwanda</span>, showcasing our shared commitment
            to promoting Kiswahili as a language of unity, innovation, and regional integration across East Africa.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
