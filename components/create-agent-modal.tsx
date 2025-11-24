"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreateAgentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateAgentModal({ isOpen, onClose }: CreateAgentModalProps) {
  const [formData, setFormData] = useState({
    agentName: "",
    channel: "WhatsApp",
    assignedNumber: "+1 (555) 123-4567",
    personalityTone: "Friendly",
    greetingMessage: "",
    knowledgeBase: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        knowledgeBase: file,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // TODO: Submit to backend
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-foreground">Create New AI Agent</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set up your AI agent to handle customer interactions automatically.
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Agent Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Agent Name</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleInputChange}
              placeholder="e.g., Reception Bot"
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Channel and Assigned Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Channel</label>
              <select
                name="channel"
                value={formData.channel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Call">Call</option>
                <option value="SMS">SMS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Assigned Number</label>
              <select
                name="assignedNumber"
                value={formData.assignedNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="+1 (555) 123-4567">+1 (555) 123-4567</option>
                <option value="+1 (555) 123-4568">+1 (555) 123-4568</option>
                <option value="+1 (555) 123-4569">+1 (555) 123-4569</option>
              </select>
            </div>
          </div>

          {/* Personality Tone */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Personality Tone</label>
            <select
              name="personalityTone"
              value={formData.personalityTone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Friendly">Friendly</option>
              <option value="Professional">Professional</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
            </select>
          </div>

          {/* Greeting Message */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Greeting Message</label>
            <textarea
              name="greetingMessage"
              value={formData.greetingMessage}
              onChange={handleInputChange}
              placeholder="Hello! I'm here to help you with..."
              rows={3}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Knowledge Base Upload */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Knowledge Base</label>
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-secondary/50">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Upload your knowledge base file</p>
              </div>
              <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.txt,.csv,.docx" />
            </label>
            {formData.knowledgeBase && (
              <p className="text-xs text-muted-foreground mt-2">{formData.knowledgeBase.name}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Create Agent
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
