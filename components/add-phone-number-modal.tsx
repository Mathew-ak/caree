"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddPhoneNumberModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPhoneNumberModal({ isOpen, onClose }: AddPhoneNumberModalProps) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    channel: "WhatsApp",
    agent: "Reception Bot",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Phone number added:", formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Add Phone Number</h2>
            <p className="text-sm text-muted-foreground mt-1">Add a new phone number for your agents.</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4570"
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Channel */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Channel</label>
            <select
              name="channel"
              value={formData.channel}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Voice">Voice</option>
              <option value="SMS">SMS</option>
            </select>
          </div>

          {/* Assign to Agent */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Assign to Agent</label>
            <select
              name="agent"
              value={formData.agent}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Leave unassigned</option>
              <option value="Reception Bot">Reception Bot</option>
              <option value="Appointment Scheduler">Appointment Scheduler</option>
              <option value="Customer Support">Customer Support</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Add Number
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
