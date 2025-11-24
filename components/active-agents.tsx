"use client"

import { MessageCircle, Phone, MessageSquare } from "lucide-react"

const agents = [
  {
    id: 1,
    name: "Reception Bot",
    platform: "WhatsApp",
    icon: MessageCircle,
    status: "Online",
    interactions: "156 interactions",
  },
  {
    id: 2,
    name: "Appointment Scheduler",
    platform: "Call",
    icon: Phone,
    status: "Online",
    interactions: "89 interactions",
  },
  {
    id: 3,
    name: "Customer Support",
    platform: "WhatsApp",
    icon: MessageSquare,
    status: "Online",
    interactions: "203 interactions",
  },
]

export function ActiveAgents() {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Active AI Agents</h3>
      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
              <agent.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{agent.name}</p>
              <p className="text-sm text-muted-foreground">{agent.platform}</p>
              <p className="text-xs text-muted-foreground mt-2">{agent.interactions}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="text-xs font-medium text-green-600 whitespace-nowrap">{agent.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
