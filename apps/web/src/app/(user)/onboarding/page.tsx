import { OnboardingForm } from "@/components/features/onboarding/OnboardingForm"
import { Navbar } from "@/components/layout/Navbar"
import { Sparkles } from "lucide-react"

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-[#05010d] text-white flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[60px]" />
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 mb-6 border border-purple-500/20">
                            <Sparkles className="h-6 w-6" />
                        </div>
                    </div>

                    <OnboardingForm />
                </div>
            </main>
        </div>
    )
}
