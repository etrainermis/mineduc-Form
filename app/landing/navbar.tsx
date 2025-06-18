"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  const pathname = usePathname()

  // Determine if we're on the programme page
  const isProgrammePage = pathname === "/programme"

  // Array of logo images for the slideshow
  const logoImages = ["/Group.png", "/global.png", "/summit.png", "/tvet.png"]

  // Auto-advance logo slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logoImages.length)
    }, 2000) // Change logo every 2 seconds

    return () => clearInterval(interval)
  }, [logoImages.length])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programme", href: "/programme" },
    { name: "TVET-Expo", href: "/tvet" },
    { name: "Inter-ministerial Summit", href: "/summit" },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header
      className={`w-full ${isProgrammePage ? "bg-white" : "bg-[#EBF2F8]"} h-[138px] flex items-center relative z-50`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-16 w-48">
            {logoImages.map((src, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: currentLogoIndex === index ? 1 : 0,
                  zIndex: currentLogoIndex === index ? 10 : 0,
                }}
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Rwanda FutureSkills Forum Logo ${index + 1}`}
                  width={192}
                  height={64}
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`group relative py-2 ${pathname === link.href ? "font-semibold" : ""}`}
              onMouseEnter={() => setActiveLink(link.name)}
              onMouseLeave={() => setActiveLink(null)}
            >
              <span className="text-[#026FB4] font-medium">{link.name}</span>
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-[#026FB4] transition-all duration-300 group-hover:w-full",
                  (activeLink === link.name || pathname === link.href) && "w-full",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Register and Login Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link href="/login">
            <Button className="bg-white text-[#026FB4] border border-[#026FB4] hover:bg-[#026FB4] hover:text-white transition-colors duration-300 rounded-md px-6">
              Login
            </Button>
          </Link>
          <Link href="/delegate">
            <Button className="bg-[#026FB4] text-white hover:bg-[#025a91] transition-colors duration-300 rounded-md px-6">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#026FB4]" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#EBF2F8] shadow-lg z-50 py-4 px-4 animate-accordion-down">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[#026FB4] font-medium py-2 border-b border-[#026FB4]/20 ${pathname === link.href ? "font-semibold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-white text-[#026FB4] border border-[#026FB4] hover:bg-[#026FB4] hover:text-white transition-colors duration-300 w-full">
                  Login
                </Button>
              </Link>
              <Link href="/delegate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-[#026FB4] text-white hover:bg-[#025a91] transition-colors duration-300 w-full">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
