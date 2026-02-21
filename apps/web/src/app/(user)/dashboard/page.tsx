import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { User, Settings, Calendar as CalendarIcon, Star, Moon, Sun, ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#05010d] text-white selection:bg-purple-500/30">
            <Navbar />

            <main className="pt-32 pb-20 container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
                                <User className="w-10 h-10" />
                            </div>
                            <h2 className="font-heading font-bold text-lg">Alex Doe</h2>
                            <p className="text-zinc-400 text-sm mb-4">Joined Feb 2026</p>
                            <Button size="sm" variant="outline" className="w-full">Edit Profile</Button>
                        </div>

                        <nav className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start bg-white/5 text-white">
                                <User className="w-4 h-4 mr-2" /> Overview
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white">
                                <CalendarIcon className="w-4 h-4 mr-2" /> Bookings
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white">
                                <Star className="w-4 h-4 mr-2" /> Favorited Charts
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white">
                                <Settings className="w-4 h-4 mr-2" /> Settings
                            </Button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        {/* Saved Birth Details */}
                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-6">Your Cosmic Profile</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                                    <div className="text-amber-400 mb-2"><Sun className="w-8 h-8" /></div>
                                    <span className="text-zinc-400 text-sm">Sun Sign</span>
                                    <strong className="text-xl font-heading">Leo</strong>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                                    <div className="text-zinc-300 mb-2"><Moon className="w-8 h-8" /></div>
                                    <span className="text-zinc-400 text-sm">Moon Sign</span>
                                    <strong className="text-xl font-heading">Libra</strong>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                                    <div className="text-purple-400 mb-2"><ArrowUpRight className="w-8 h-8" /></div>
                                    <span className="text-zinc-400 text-sm">Rising Sign</span>
                                    <strong className="text-xl font-heading">Scorpio</strong>
                                </div>
                            </div>
                        </section>

                        {/* Recent Activities / History */}
                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-6">Recent Activity</h2>
                            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-white/10 flex items-center justify-between hover:bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Star className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Daily Horoscope Read</h4>
                                            <p className="text-xs text-zinc-500">Today, 9:00 AM</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-zinc-400"><ArrowUpRight className="w-4 h-4" /></Button>
                                </div>
                                <div className="p-4 border-b border-white/10 flex items-center justify-between hover:bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                            <CalendarIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Booked Natal Chart Reading</h4>
                                            <p className="text-xs text-zinc-500">Yesterday</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-zinc-400"><ArrowUpRight className="w-4 h-4" /></Button>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                                            <Moon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Viewed Compatibility Report</h4>
                                            <p className="text-xs text-zinc-500">Feb 14, 2026</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-zinc-400"><ArrowUpRight className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
