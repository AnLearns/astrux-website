import Link from "next/link";
import { ArrowLeft, Users, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AstrologerLandingPage() {
    return (
        <div className="py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
                        Coming Soon
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        For Professional Astrologers
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        A platform to manage bookings, accept payments, and connect with clients worldwide.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 rounded-xl bg-card border border-border text-center">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Users className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Global Reach</h3>
                        <p className="text-sm text-muted-foreground">Get discovered by seekers worldwide</p>
                    </div>
                    <div className="p-6 rounded-xl bg-card border border-border text-center">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Calendar className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Smart Scheduling</h3>
                        <p className="text-sm text-muted-foreground">Automated booking with timezone support</p>
                    </div>
                    <div className="p-6 rounded-xl bg-card border border-border text-center">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Star className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Build Your Brand</h3>
                        <p className="text-sm text-muted-foreground">Verified profiles, reviews & listings</p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Interested in joining?</p>
                    <Button variant="outline" disabled>
                        Notify Me at Launch
                    </Button>
                </div>
            </div>
        </div>
    );
}
