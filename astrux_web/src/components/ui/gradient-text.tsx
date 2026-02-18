import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    gradient?: "cosmic" | "sunset" | "ocean" | "fire"
    children: React.ReactNode
}

const gradientClasses = {
    cosmic: "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600",
    sunset: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    ocean: "bg-gradient-to-r from-cyan-500 to-blue-500",
    fire: "bg-gradient-to-r from-orange-600 to-yellow-500",
}

export function GradientText({
    gradient = "cosmic",
    className,
    children,
    ...props
}: GradientTextProps) {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent",
                gradientClasses[gradient],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}
