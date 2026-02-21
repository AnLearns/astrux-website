import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo.png"
                                alt="Astrux Logo"
                                width={48}
                                height={48}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                            Unlock the secrets of your destiny with Vedic accuracy and modern clarity.
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon icon={<Facebook className="h-4 w-4" />} />
                            <SocialIcon icon={<Twitter className="h-4 w-4" />} />
                            <SocialIcon icon={<Instagram className="h-4 w-4" />} />
                            <SocialIcon icon={<Youtube className="h-4 w-4" />} />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Features</h4>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/panchang" className="hover:text-white transition-colors">Daily Panchang</Link></li>
                            <li><Link href="/kundli" className="hover:text-white transition-colors">Kundli Generator</Link></li>
                            <li><Link href="/horoscope" className="hover:text-white transition-colors">Horoscope</Link></li>
                            <li><Link href="/festivals" className="hover:text-white transition-colors">Festival Calendar</Link></li>
                            <li><Link href="/muhurat" className="hover:text-white transition-colors">Muhurat Finder</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/learn" className="hover:text-white transition-colors">Learn Astrology</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/astrologer" className="hover:text-white transition-colors">For Astrologers</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="h-px bg-white/10 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} Astrux. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
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
            className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 transition-all"
        >
            {icon}
        </a>
    )
}
