import Link from "next/link"
import { Sparkles, Instagram, Twitter, Facebook, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#0b0516] border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <Sparkles className="h-5 w-5 text-purple-400" />
                            <span className="text-xl font-heading font-bold text-white tracking-widest">
                                ASTRUX
                            </span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            Unlocking your cosmic blueprint with modern astrology. Personalized insights for your journey through the stars.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                                <Facebook size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-6">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">Birth Chart</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">Daily Horoscope</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">Compatibility</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">Tarot Reading</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">Blog</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-6">Stay Connected</h4>
                        <p className="text-zinc-400 text-sm mb-4">
                            Subscribe to get daily cosmic updates.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-full"
                            />
                            <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-colors">
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-xs">
                        © {new Date().getFullYear()} Astrux. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
