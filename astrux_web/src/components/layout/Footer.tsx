
import Link from "next/link"
import { Sparkles, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-secondary/30 border-t border-border mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <span className="text-xl font-heading font-bold text-foreground tracking-widest">
                                ASTRUX
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Unlock the secrets of your destiny with Vedic accuracy and modern clarity. Your cosmic blueprint awaits.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon icon={<Facebook className="h-4 w-4" />} />
                            <SocialIcon icon={<Twitter className="h-4 w-4" />} />
                            <SocialIcon icon={<Instagram className="h-4 w-4" />} />
                            <SocialIcon icon={<Youtube className="h-4 w-4" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">Features</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/panchang" className="hover:text-primary transition-colors">Daily Panchang</Link></li>
                            <li><Link href="/kundli" className="hover:text-primary transition-colors">Kundli Generator</Link></li>
                            <li><Link href="/horoscope" className="hover:text-primary transition-colors">Horoscope</Link></li>
                            <li><Link href="/festivals" className="hover:text-primary transition-colors">Festival Calendar</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/learn" className="hover:text-primary transition-colors">Learn Astrology</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal/Newsletter */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">Stay Connected</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get daily celestial insights delivered to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-background border border-input rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Astrux. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
            {icon}
        </a>
    )
}
