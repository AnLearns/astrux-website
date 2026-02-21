"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setTheme, theme } = useTheme()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            console.log("Login attempt")
        }, 1000)
    }

    return (
        <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-yellow-50/30 dark:from-slate-900 dark:via-blue-950/50 dark:to-indigo-950/30">
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
            <div className="p-4 lg:p-8 h-full flex items-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight font-heading text-primary">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access your cosmic journey.
                        </p>
                    </div>
                    <Card className="glass border-none shadow-xl">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Enter your email and password below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            disabled={isLoading}
                                            className="bg-transparent"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            disabled={isLoading}
                                            className="bg-transparent"
                                        />
                                    </div>
                                    <Button className="w-full text-white" type="submit" disabled={isLoading}>
                                        {isLoading && (
                                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        )}
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground bg-transparent">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <Button variant="outline" disabled={isLoading} className="bg-transparent">
                                    Google
                                </Button>
                                <Button variant="outline" disabled={isLoading} className="bg-transparent">
                                    Apple
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <div className="text-sm text-center text-muted-foreground">
                                <Link href="/forgot-password" className="hover:text-primary underline underline-offset-4">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="text-sm text-center text-muted-foreground">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="hover:text-primary underline underline-offset-4">
                                    Sign Up
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                For Astrologers
                            </span>
                        </div>
                    </div>

                    <Link href="/astrologer/login" className="w-full">
                        <Button
                            variant="outline"
                            className="w-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 border-2 border-purple-400/50 hover:from-purple-500/30 hover:via-blue-500/30 hover:to-indigo-500/30 hover:border-purple-400 transition-all hover:shadow-lg hover:shadow-purple-500/20 text-foreground font-semibold"
                        >
                            <span className="mr-2 text-lg">🔮</span>
                            Astrologer Login
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
