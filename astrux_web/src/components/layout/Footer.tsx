
import Link from "next/link"
import Image from "next/image"
import { Sparkles, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-purple-900/5 via-background to-indigo-900/5 border-t border-border/50 mt-20 overflow-hidden">
            {/* Cosmic Background */}
            <div className="absolute inset-0 cosmic-bg opacity-10" />

            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image
                                src="/logo.png"
                                alt="Astrux Logo"
                                width={32}
                                height={32}
                                className="h-8 w-auto object-contain group-hover:scale-110 transition-transform"
                            />
                            <span className="text-2xl font-heading font-bold">
                                <GradientText gradient="cosmic">ASTRUX</GradientText>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Unlock the secrets of your destiny with Vedic accuracy and modern clarity. Your cosmic blueprint awaits.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <SocialIcon icon={<Facebook className="h-4 w-4" />} />
                            <SocialIcon icon={<Twitter className="h-4 w-4" />} />
                            <SocialIcon icon={<Instagram className="h-4 w-4" />} />
                            <SocialIcon icon={<Youtube className="h-4 w-4" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-6 text-lg">Features</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/panchang" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Daily Panchang</Link></li>
                            <li><Link href="/kundli" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Kundli Generator</Link></li>
                            <li><Link href="/horoscope" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Horoscope</Link></li>
                            <li><Link href="/festivals" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Festival Calendar</Link></li>
                            <li><Link href="/muhurat" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Muhurat Finder</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-6 text-lg">Resources</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/learn" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Learn Astrology</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Contact</Link></li>
                            <li><Link href="/astrologer" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">For Astrologers</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-6 text-lg">Stay Connected</h4>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            Get daily celestial insights and cosmic updates delivered to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-background/50 border border-input rounded-lg pl-10 pr-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                            </div>
                            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider with Gradient */}
                <div className="relative my-12">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Astrux. All rights reserved. Made with cosmic energy ✨</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a
            href="#"
            className="h-10 w-10 rounded-full bg-background/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all hover:scale-110"
        >
            {icon}
        </a>
    )
}
