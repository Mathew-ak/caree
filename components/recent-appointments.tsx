"use client"

import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react"

const appointments = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Consultation",
    time: "Today, 2:00 PM",
    status: "Confirmed",
    statusColor: "text-green-600",
  },
  {
    id: 2,
    name: "Mike Chen",
    type: "Follow-up",
    time: "Today, 3:30 PM",
    status: "Confirmed",
    statusColor: "text-green-600",
  },
  {
    id: 3,
    name: "Emma Davis",
    type: "New Patient",
    time: "Tomorrow, 10:00 AM",
    status: "Pending",
    statusColor: "text-yellow-600",
  },
  {
    id: 4,
    name: "Robert Wilson",
    type: "Check-up",
    time: "Tomorrow, 2:00 PM",
    status: "Confirmed",
    statusColor: "text-green-600",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Confirmed":
      return <CheckCircle className="w-4 h-4" />
    case "Pending":
      return <AlertCircle className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

export function RecentAppointments() {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Appointments</h3>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{appointment.name}</p>
              <p className="text-sm text-muted-foreground">
                {appointment.type} • {appointment.time}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`w-4 h-4 ${appointment.statusColor}`}>{getStatusIcon(appointment.status)}</span>
              <span className={`text-sm font-medium ${appointment.statusColor}`}>{appointment.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
