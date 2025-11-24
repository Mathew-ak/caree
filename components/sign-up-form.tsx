"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

interface SignUpFormProps {
  onSwitchTab: () => void
}

export default function SignUpForm({ onSwitchTab }: SignUpFormProps) {
  const [fullName, setFullName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const validatePassword = (pwd: string) => pwd.length >= 8

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePassword(password)) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      })
      return
    }

    if (!agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
            required
          />
        </div>
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-2">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Your Business"
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Work Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@business.com"
          className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a strong password"
          className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">Must be at least 8 characters</p>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="terms"
          type="checkbox"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-border bg-secondary accent-teal-600 cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          I agree to the{" "}
          <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchTab} className="text-teal-600 hover:text-teal-700 font-semibold">
          Sign in
        </button>
      </p>
    </form>
  )
}
