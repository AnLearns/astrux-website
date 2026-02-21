import { Button } from "@/components/ui/button";
import { Users, DollarSign, Calendar, Star } from "lucide-react";

export default function AstrologerDashboard() {
    return (
        <div className="min-h-screen bg-[#05010d] text-white">
            {/* Top Bar */}
            <header className="border-b border-white/10 bg-[#0b0516]/50 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-heading font-bold text-amber-100">
                        <Star className="text-amber-400 w-5 h-5 fill-amber-400" />
                        <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-zinc-400">Welcome, <span className="text-white font-medium">Dr. Astra</span></div>
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50" />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Earnings", value: "$4,250", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
                        { label: "Active Clients", value: "128", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
                        { label: "Upcoming Sessions", value: "8", icon: Calendar, color: "text-purple-400", bg: "bg-purple-500/10" },
                        { label: "Rating", value: "4.9", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#0b0516] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-zinc-400 text-sm">{stat.label}</span>
                                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold font-heading">{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity / Content Mock */}
                <div className="bg-[#0b0516] border border-white/5 rounded-xl p-6 min-h-[400px]">
                    <h2 className="text-xl font-heading font-bold mb-6">Upcoming Appointments</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800" />
                                    <div>
                                        <div className="font-medium">Client Object #{i}</div>
                                        <div className="text-sm text-zinc-400">Natal Chart Reading • 60 min</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-sm text-amber-200">Today</div>
                                        <div className="text-sm text-zinc-400">2:00 PM EST</div>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-amber-500/20 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300">
                                        Join Call
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
