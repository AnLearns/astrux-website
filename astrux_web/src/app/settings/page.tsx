
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-background pb-20 pt-10">
            <div className="container mx-auto px-6 max-w-2xl space-y-8">
                <h1 className="text-3xl font-heading font-bold">Settings</h1>

                <div className="space-y-6">
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-border pb-2">Appearance</h2>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Theme Mode</span>
                            <ModeToggle />
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-border pb-2">Preferences</h2>
                        <div className="space-y-2">
                            <Label>Default Location</Label>
                            <Input placeholder="Enter City (e.g. New Delhi)" />
                        </div>
                        <div className="space-y-2">
                            <Label>Language</Label>
                            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Sanskrit</option>
                            </select>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-border pb-2">Notifications</h2>
                        <div className="flex items-center justify-between p-4 border border-input rounded-lg bg-card">
                            <div>
                                <h4 className="font-medium">Daily Horoscope</h4>
                                <p className="text-sm text-muted-foreground">Get daily predictions at 8 AM</p>
                            </div>
                            <input type="checkbox" className="h-5 w-5 accent-primary" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-input rounded-lg bg-card">
                            <div>
                                <h4 className="font-medium">Major Transits</h4>
                                <p className="text-sm text-muted-foreground">Alerts for Saturn/Jupiter transits</p>
                            </div>
                            <input type="checkbox" className="h-5 w-5 accent-primary" />
                        </div>
                    </section>

                    <div className="pt-4">
                        <Button className="w-full">Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
