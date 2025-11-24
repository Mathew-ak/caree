"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreateArticleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateArticleModal({ isOpen, onClose }: CreateArticleModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    agent: "Reception Bot",
    content: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Article submitted:", formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-foreground">Create Article</h2>
            <p className="text-sm text-muted-foreground mt-1">Add a new article to your knowledge base.</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Article Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Article Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., How to reset password"
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Select Agent */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Select Agent</label>
            <select
              name="agent"
              value={formData.agent}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Reception Bot">Reception Bot</option>
              <option value="Appointment Scheduler">Appointment Scheduler</option>
              <option value="Customer Support">Customer Support</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your article content here..."
              rows={5}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Create Article
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
