"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Explicitly import Image
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
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

    const links = [
        { name: "Panchang", href: "/panchang" },
        { name: "Muhurat", href: "/muhurat" },
        { name: "Kundli", href: "/kundli" },
        { name: "Horoscope", href: "/horoscope" },
        { name: "Devotional", href: "/devotional" },
    ]

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border py-3 shadow-sm"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="Astrux Logo"
                        width={140}
                        height={50}
                        className="h-12 w-auto object-contain dark:brightness-100"
                        priority
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <ModeToggle />
                    {/* Placeholder for Language Selector */}
                    <div className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">EN</div>
                    <Link href="/login">
                        <Button variant="outline" size="sm" className="rounded-full border-primary/50 hover:bg-primary/5 hover:text-primary">
                            Login
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Appearance</span>
                        <ModeToggle />
                    </div>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/5 hover:text-primary">
                            Login
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}
