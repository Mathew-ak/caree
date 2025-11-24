"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SignInForm from "@/components/sign-in-form"
import SignUpForm from "@/components/sign-up-form"
import SidebarInfo from "@/components/sidebar-info"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

function AuthLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-foreground">Loading...</p>
      </div>
    </div>
  )
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (isLoading) {
    return <AuthLoadingFallback />
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Mobile Logo */}
      <div className="lg:hidden px-4 sm:px-6 py-4 border-b border-border">
        <img src="/logo.png" alt="CareFlow" className="h-8 sm:h-10 w-auto" />
      </div>

      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-600 text-white flex-col justify-between p-6 sm:p-8 lg:p-12">
        <SidebarInfo />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        <div className="hidden lg:block mb-8 lg:mb-12">
          <img src="/logo.png" alt="CareFlow" className="h-10 sm:h-12 w-auto" />
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h1 className="font-bold text-foreground mb-2">{isSignUp ? "Create Account" : "Welcome back"}</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            {isSignUp
              ? "Sign up to get started with CareFlow"
              : "Sign in to your account or create a new one to get started"}
          </p>

          {/* Tab Selector */}
          <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-3 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${
                !isSignUp ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-3 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${
                isSignUp ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {isSignUp ? (
            <SignUpForm onSwitchTab={() => setIsSignUp(false)} />
          ) : (
            <SignInForm onSwitchTab={() => setIsSignUp(true)} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 lg:mt-12 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2025 CareFlow AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
