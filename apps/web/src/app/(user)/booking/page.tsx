"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { services, timeSlots } from "@/lib/mock-data"
import { Clock, CheckCircle2, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BookingPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [selectedService, setSelectedService] = useState(services[0])
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [isBooked, setIsBooked] = useState(false)

    const handleBooking = () => {
        setIsBooked(true)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }, 100)
    }

    if (isBooked) {
        return (
            <div className="min-h-screen bg-[#05010d] text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-400">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold mb-4">Booking Confirmed!</h1>
                    <p className="text-zinc-400 max-w-md mb-8">
                        Your session for <span className="text-white font-medium">{selectedService.name}</span> has been scheduled for {date?.toLocaleDateString()} at {selectedTime}.
                    </p>
                    <p className="text-sm text-zinc-500 mb-8">Check your email for the meeting link.</p>
                    <Button variant="outline" onClick={() => setIsBooked(false)}>Book Another Session</Button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#05010d] text-white selection:bg-purple-500/30">
            <Navbar />

            <main className="pt-32 pb-20 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
                        Book a Consultation
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Choose a service and find a time that works for you. All sessions are conducted via secure video call.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Step 1: Select Service */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center">1</span>
                            Select Service
                        </h2>
                        <div className="space-y-4">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    onClick={() => setSelectedService(service)}
                                    className={cn(
                                        "p-4 rounded-xl border cursor-pointer transition-all duration-200 group",
                                        selectedService.id === service.id
                                            ? "bg-purple-900/20 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.15)]"
                                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{service.name}</h3>
                                        <span className={cn(
                                            "text-sm font-medium px-2 py-1 rounded-md",
                                            selectedService.id === service.id ? "bg-purple-500 text-white" : "bg-white/10 text-zinc-300"
                                        )}>{service.price}</span>
                                    </div>
                                    <p className="text-xs text-zinc-400 mb-3">{service.description}</p>
                                    <div className="flex items-center text-xs text-zinc-500 group-hover:text-purple-300 transition-colors">
                                        <Clock className="w-3 h-3 mr-1" /> {service.duration}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Select Date & Time */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Calendar */}
                            <div>
                                <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center">2</span>
                                    Select Date
                                </h2>
                                <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 inline-block">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border-none"
                                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                    />
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div>
                                <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center">3</span>
                                    Select Time
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={cn(
                                                "py-2 px-3 rounded-lg text-sm font-medium border transition-all text-center",
                                                selectedTime === time
                                                    ? "bg-white text-black border-white"
                                                    : "bg-white/5 border-transparent text-zinc-300 hover:bg-white/10 hover:text-white"
                                            )}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                                {!selectedTime && (
                                    <p className="text-xs text-zinc-500 mt-4 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Please select a date first to see available times.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Summary & confirm */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <CalendarIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400">Selected Session</p>
                                    <h4 className="font-semibold text-lg">{selectedService.name}</h4>
                                    <p className="text-xs text-zinc-500">
                                        {date?.toDateString()} • {selectedTime || "Select time"}
                                    </p>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                onClick={handleBooking}
                                disabled={!date || !selectedTime}
                                className="w-full md:w-auto min-w-[200px]"
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
