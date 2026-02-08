"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, Upload } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AstrologerOnboarding() {
    const [step, setStep] = useState(1)

    const nextStep = () => setStep(s => s + 1)
    const prevStep = () => setStep(s => s - 1)

    return (
        <div className="min-h-screen bg-[#05010d] text-white flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-2xl">
                <Link href="/astrologer" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portal
                </Link>

                <div className="bg-[#0b0516] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                        <div
                            className="h-full bg-amber-500 transition-all duration-500"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-heading font-bold mb-2">Join Astrux</h1>
                        <p className="text-zinc-400">Step {step} of 3: {step === 1 ? "Personal Details" : step === 2 ? "Professional Profile" : "Verification"}</p>
                    </div>

                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="Enter first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Enter last name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="name@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="pt-4">
                                <Button onClick={nextStep} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                                    Continue
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="specialty">Primary Specialty</Label>
                                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <option>Natal Astrology</option>
                                    <option>Horary Astrology</option>
                                    <option>Vedic Astrology</option>
                                    <option>Tarot Reading</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="experience">Years of Experience</Label>
                                <Input id="experience" type="number" placeholder="e.g. 5" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Professional Bio</Label>
                                <textarea
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tell us about your approach and background..."
                                />
                            </div>
                            <div className="pt-4 flex gap-4">
                                <Button variant="outline" onClick={prevStep} className="flex-1">Back</Button>
                                <Button onClick={nextStep} className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold">
                                    Continue
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center">
                            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                                <Upload className="w-10 h-10 text-zinc-500 mb-4" />
                                <h3 className="font-medium mb-1">Upload Certifications</h3>
                                <p className="text-sm text-zinc-500">Drag & drop or click to upload PDF/JPG</p>
                            </div>

                            <div className="flex items-start gap-4 text-left bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-200">
                                    By submitting this application, you agree to our Code of Ethics and Professional Standards.
                                </p>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <Button variant="outline" onClick={prevStep} className="flex-1">Back</Button>
                                <Button onClick={() => window.location.href = '/(astrologer)/dashboard'} className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold">
                                    Submit Application
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    )
}
