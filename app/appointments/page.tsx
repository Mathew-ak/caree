"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Spinner } from "@/components/ui/spinner"
import { AppointmentsContent } from "@/components/appointments-content"

export default function AppointmentsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setLoading(false)
      } else {
        router.push("/")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    await signOut(auth)
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    )
  }

  return (
    <DashboardLayout user={user} onSignOut={handleSignOut} currentPage="appointments">
      <AppointmentsContent />
    </DashboardLayout>
  )
}
