"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sparkles, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Horoscope", href: "/horoscope" },
    { name: "Services", href: "/#services" },
    { name: "Learn", href: "#learn" },
    { name: "About", href: "#about" },
    { name: "For Astrologers", href: "/astrologer" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Sparkles className="h-6 w-6 text-purple-400 group-hover:text-yellow-400 transition-colors duration-300" />
                    <span className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white tracking-widest">
                        ASTRUX
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="ghost" className="text-zinc-300 hover:text-white">
                        Sign In
                    </Button>
                    <Button variant="default">Get Started</Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-zinc-300 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2" />
                    <Button variant="ghost" className="w-full justify-start text-zinc-300">
                        Sign In
                    </Button>
                    <Button variant="default" className="w-full">
                        Get Started
                    </Button>
                </div>
            )}
        </nav>
    )
}
