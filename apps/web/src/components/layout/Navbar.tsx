"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const links = [
        { name: "Panchang", href: "/panchang" },
        { name: "Muhurat", href: "/muhurat" },
        { name: "Kundli", href: "/kundli" },
        { name: "Horoscope", href: "/horoscope" },
        { name: "Devotional", href: "/devotional" },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black border-b border-white/10 py-3 sm:py-4">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo - Left */}
                    <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Astrux Logo"
                            width={56}
                            height={56}
                            className="h-10 sm:h-14 w-auto object-contain dark:brightness-100"
                            priority
                        />
                    </Link>

                    {/* Desktop Links - Center */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-3">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group whitespace-nowrap px-1"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <span className="text-muted-foreground/30">|</span>
                        <Link
                            href="/astrologer"
                            className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors relative group whitespace-nowrap px-1"
                        >
                            For Astrologers
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </div>

                    {/* CTA - Right */}
                    <div className="hidden md:flex items-center gap-4">
                        <Clock />
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-foreground p-2 -mr-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 p-4 sm:p-6 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-5">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-base sm:text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-lg px-4 py-3 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2" />
                    <Link
                        href="/astrologer"
                        className="text-base sm:text-lg font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg px-4 py-3 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        For Astrologers
                    </Link>
                </div>
            )}
        </nav>
    )
}

function Clock() {
    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        setTimeout(() => setTime(new Date()), 0)
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    if (!time) return null

    // Format: HH:MM:SS
    const timeString = time.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    // Format: Mon, 09 Feb 2026
    const dateString = time.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })

    return (
        <div className="text-right flex flex-col items-end justify-center pointer-events-none select-none">
            <div className="text-sm font-mono font-medium leading-none tracking-wider text-muted-foreground/80">
                {timeString}
            </div>
            <div className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wide mt-0.5">
                {dateString}
            </div>
        </div>
    )
}
