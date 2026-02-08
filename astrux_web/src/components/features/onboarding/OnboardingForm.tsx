"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Sparkles, Check } from "lucide-react"
import Link from "next/link"

export function OnboardingForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        birthTime: "",
        birthPlace: "",
    })

    // Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Navigation Handlers
    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Progress Bar */}
            <div className="mb-8 flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0" />
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-purple-500 rounded-full z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                />

                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${step >= s ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]" : "bg-[#1a1033] text-zinc-500 border border-white/10"
                            }`}
                    >
                        {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                ))}
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-heading font-bold mb-2">Welcome to Astrux</h2>
                            <p className="text-zinc-400">Let&apos;s start your cosmic journey. What should we call you?</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>

                        <Button onClick={nextStep} className="w-full" disabled={!formData.name}>
                            Continue <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                )}

                {/* Step 2: Birth Details */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-heading font-bold mb-2">Birth Details</h2>
                            <p className="text-zinc-400">Accurate birth data ensures precise astrological readings.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="birthDate">Date of Birth</Label>
                                <Input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birthTime">
                                    Time of Birth
                                    <span className="text-xs text-zinc-500 ml-2 font-normal">(Optional but recommended)</span>
                                </Label>
                                <Input
                                    id="birthTime"
                                    name="birthTime"
                                    type="time"
                                    value={formData.birthTime}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birthPlace">Place of Birth</Label>
                                <Input
                                    id="birthPlace"
                                    name="birthPlace"
                                    placeholder="City, Country"
                                    value={formData.birthPlace}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={prevStep} className="w-1/3">
                                Back
                            </Button>
                            <Button onClick={nextStep} className="w-2/3" disabled={!formData.birthDate || !formData.birthPlace}>
                                Continue <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Account / Guest */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-heading font-bold mb-2">Create Your Profile</h2>
                            <p className="text-zinc-400">Save your chart to access it anytime, or continue as a guest.</p>
                        </div>

                        <div className="grid gap-4">
                            <Link href="/dashboard" className="w-full">
                                <Button variant="cosmic" className="w-full h-auto py-4 flex flex-col items-center gap-2 group">
                                    <div className="flex items-center gap-2 font-bold text-lg">
                                        <Sparkles className="w-5 h-5" /> Create Free Account
                                    </div>
                                    <span className="text-xs text-zinc-400 group-hover:text-purple-200">Save your chart & get daily insights</span>
                                </Button>
                            </Link>

                            <Link href="/dashboard" className="w-full">
                                <Button variant="outline" className="w-full">
                                    Continue as Guest
                                </Button>
                            </Link>
                        </div>

                        <Button variant="ghost" onClick={prevStep} className="w-full text-zinc-500 hover:text-white">
                            Back to Details
                        </Button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
