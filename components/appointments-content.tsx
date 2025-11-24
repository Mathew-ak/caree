"use client"

import { useState } from "react"
import { Phone, MessageSquare, Clock, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddAppointmentModal } from "@/components/add-appointment-modal"

const appointmentsStats = [
  {
    label: "Today's Appointments",
    value: "2",
    icon: Calendar,
  },
  {
    label: "Upcoming",
    value: "4",
    icon: Clock,
  },
]

const appointmentsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Consultation",
    status: "Confirmed",
    date: "Today",
    time: "2:00 PM",
    duration: "30 min",
    email: "sarahj@email.com",
    phone: "+1 (555) 234-5678",
    bookedBy: "Reception Bot",
    notes: "First-time patient",
  },
  {
    id: 2,
    name: "Mike Chen",
    type: "Follow-up",
    status: "Confirmed",
    date: "Tomorrow",
    time: "3:30 PM",
    duration: "30 min",
    email: "mike.chen@email.com",
    phone: "+1 (555) 234-5679",
    bookedBy: "Appointment Scheduler",
    notes: "Patient prefers morning appointments",
  },
  {
    id: 3,
    name: "Emma Davis",
    type: "New Patient",
    status: "Pending",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "45 min",
    email: "emma.d@email.com",
    phone: "+1 (555) 234-5680",
    bookedBy: "Reception Bot",
    notes: "Referred by Dr. Smith",
  },
  {
    id: 4,
    name: "Robert Wilson",
    type: "Check-up",
    status: "Confirmed",
    date: "Tomorrow",
    time: "2:00 PM",
    duration: "30 min",
    email: "robert.w@email.com",
    phone: "+1 (555) 234-5681",
    bookedBy: "Appointment Scheduler",
    notes: "Annual check-up",
  },
]

export function AppointmentsContent() {
  const [activeFilter, setActiveFilter] = useState("upcoming")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [automaticReminders, setAutomaticReminders] = useState(true)

  const filteredAppointments = appointmentsData.filter((apt) => {
    if (activeFilter === "pending") return apt.status === "Pending"
    if (activeFilter === "completed") return apt.status === "Completed"
    if (activeFilter === "rescheduled") return apt.status === "Rescheduled"
    return apt.status === "Confirmed"
  })

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-2">Manage bookings, reminders, and scheduling.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary/90 gap-2 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {appointmentsStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}

        {/* Automatic Reminders Card */}
        <div className="bg-white rounded-lg border border-border p-6 md:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-foreground">Automatic Reminders</p>
            <button
              onClick={() => setAutomaticReminders(!automaticReminders)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                automaticReminders ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  automaticReminders ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">Send 24h before</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="upcoming"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-foreground"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-foreground"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-foreground"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="rescheduled"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-foreground"
          >
            Rescheduled
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
          >
            {/* Appointment Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">
                    {appointment.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{appointment.name}</h3>
                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {appointment.date} · {appointment.time} ({appointment.duration})
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="outline" className="gap-2 text-sm bg-transparent">
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button variant="outline" className="gap-2 text-sm bg-transparent">
                <MessageSquare className="w-4 h-4" />
                Message
              </Button>
              <Button variant="outline" className="gap-2 text-sm bg-transparent">
                <Clock className="w-4 h-4" />
                Reschedule
              </Button>
            </div>

            {/* Contact and Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Section */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{appointment.email}</p>
                  <p className="text-muted-foreground">{appointment.phone}</p>
                </div>
              </div>

              {/* Booking and Notes */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Details</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Booked by{" "}
                    <span className="text-primary hover:underline cursor-pointer">{appointment.bookedBy}</span>
                  </p>
                  {appointment.notes && <p className="text-muted-foreground">{appointment.notes}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Appointment Modal */}
      <AddAppointmentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
