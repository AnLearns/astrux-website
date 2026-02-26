import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    gradient?: "cosmic" | "sunset" | "ocean" | "fire"
    children: React.ReactNode
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
                "inline-block pb-0.5 text-transparent bg-clip-text bg-gradient-to-r",
                gradient === "cosmic" && "from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-indigo-400",
                gradient === "sunset" && "from-pink-500 via-red-500 to-yellow-500",
                gradient === "ocean" && "from-cyan-400 to-blue-500",
                gradient === "fire" && "from-orange-500 to-yellow-400",
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}
