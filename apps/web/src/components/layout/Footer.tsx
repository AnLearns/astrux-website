import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Compass, MessageCircle, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
    return (
        <footer className="relative mt-20 border-t border-white/10 safe-bottom">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-background to-background" />
            
            <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    <div className="md:col-span-2 space-y-5">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <Image
                                src="/logo.png"
                                alt="Astrux Logo"
                                width={48}
                                height={48}
                                className="h-10 sm:h-12 w-auto object-contain"
                            />
                            <span className="font-heading text-xl font-bold text-white">Astrux</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Unlock the secrets of your destiny with Vedic accuracy and modern clarity. 
                            Your cosmic journey begins here.
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon icon={<Facebook className="h-4 w-4" />} label="Facebook" />
                            <SocialIcon icon={<Twitter className="h-4 w-4" />} label="Twitter" />
                            <SocialIcon icon={<Instagram className="h-4 w-4" />} label="Instagram" />
                            <SocialIcon icon={<Youtube className="h-4 w-4" />} label="YouTube" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-white flex items-center gap-2">
                            <Compass className="w-4 h-4 text-purple-400" />
                            Features
                        </h4>
                        <ul className="space-y-2.5">
                            <FooterLink href="/panchang">Daily Panchang</FooterLink>
                            <FooterLink href="/kundli">Kundli Generator</FooterLink>
                            <FooterLink href="/horoscope">Horoscope</FooterLink>
                            <FooterLink href="/festivals">Festival Calendar</FooterLink>
                            <FooterLink href="/muhurat">Muhurat Finder</FooterLink>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-white flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-purple-400" />
                            Contact
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span>support@astrux.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                                <span>Mumbai, Maharashtra, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="h-px bg-border my-8 sm:my-10" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p className="text-center md:text-left">
                        &copy; {new Date().getFullYear()} Astrux. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function SocialIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <a
            href="#"
            aria-label={label}
            className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
        >
            {icon}
        </a>
    )
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <li>
            <Link 
                href={href} 
                className="text-sm text-muted-foreground hover:text-white hover:pl-1 transition-all duration-300 inline-block"
            >
                {children}
            </Link>
        </li>
    )
}
