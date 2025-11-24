"use client"

import { useState } from "react"
import { MessageCircle, Phone, MessageSquare, Plus, MoreVertical, Download, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateAgentModal } from "@/components/create-agent-modal"
import { CreateArticleModal } from "@/components/create-article-modal"
import { AddPhoneNumberModal } from "@/components/add-phone-number-modal"

const agentsData = [
  {
    id: 1,
    name: "Reception Bot",
    type: "WhatsApp",
    icon: MessageCircle,
    status: "Online",
    assignedNumber: "+1 (555) 123-4567",
    interactions: 156,
    knowledgeBase: "Customer Support FAQs",
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Appointment Scheduler",
    type: "Call",
    icon: Phone,
    status: "Online",
    assignedNumber: "+1 (555) 123-4568",
    interactions: 89,
    knowledgeBase: "Scheduling Guide",
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Customer Support",
    type: "WhatsApp",
    icon: MessageSquare,
    status: "Online",
    assignedNumber: "+1 (555) 123-4569",
    interactions: 203,
    knowledgeBase: "Product Information",
    lastActive: "Just now",
  },
]

const knowledgeBasesData = [
  {
    id: 1,
    title: "Customer Support FAQs",
    agent: "Reception Bot",
    articles: 24,
    progress: 95,
  },
  {
    id: 2,
    title: "Scheduling Guide",
    agent: "Appointment Scheduler",
    articles: 12,
    progress: 100,
  },
  {
    id: 3,
    title: "Product Information",
    agent: "Customer Support",
    articles: 18,
    progress: 88,
  },
]

const phoneNumbersData = [
  {
    id: 1,
    number: "+1 (555) 123-4567",
    channel: "WhatsApp",
    assignedAgent: "Reception Bot",
    status: "Active",
  },
  {
    id: 2,
    number: "+1 (555) 123-4568",
    channel: "Voice",
    assignedAgent: "Appointment Scheduler",
    status: "Active",
  },
  {
    id: 3,
    number: "+1 (555) 123-4569",
    channel: "WhatsApp",
    assignedAgent: "Customer Support",
    status: "Active",
  },
  {
    id: 4,
    number: "+1 (555) 123-4570",
    channel: "Voice",
    assignedAgent: null,
    status: "Available",
  },
]

export function AgentsContent() {
  const [activeTab, setActiveTab] = useState("my-agents")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreateArticleOpen, setIsCreateArticleOpen] = useState(false)
  const [isAddPhoneOpen, setIsAddPhoneOpen] = useState(false)

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Agents</h1>
          <p className="text-muted-foreground mt-2">Manage your AI agents, phone numbers, and knowledge bases.</p>
        </div>
        {activeTab === "my-agents" && (
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary hover:bg-primary/90 gap-2 w-full md:w-auto"
          >
            <Plus className="w-4 h-4" />
            Create New Agent
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="my-agents">My Agents</TabsTrigger>
          <TabsTrigger value="phone-numbers">Phone Numbers</TabsTrigger>
          <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
        </TabsList>

        {/* My Agents Tab */}
        <TabsContent value="my-agents" className="space-y-6">
          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentsData.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.type}</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Agent Details */}
                <div className="space-y-3 text-sm">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-green-600 font-medium">{agent.status}</span>
                    </div>
                  </div>

                  {/* Assigned Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Assigned Number</span>
                    <span className="text-foreground font-medium">{agent.assignedNumber}</span>
                  </div>

                  {/* Interactions */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Interactions</span>
                    <span className="text-foreground font-medium">{agent.interactions}</span>
                  </div>

                  {/* Knowledge Base */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Knowledge Base</span>
                    <span className="text-primary hover:underline cursor-pointer font-medium">
                      {agent.knowledgeBase}
                    </span>
                  </div>
                </div>

                {/* Last Active */}
                <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  Last active: {agent.lastActive}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Phone Numbers Tab */}
        <TabsContent value="phone-numbers" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <p className="text-muted-foreground">Manage and assign phone numbers to your AI agents.</p>
            <Button
              onClick={() => setIsAddPhoneOpen(true)}
              className="bg-primary hover:bg-primary/90 gap-2 w-full md:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add New Number
            </Button>
          </div>

          {/* Phone Numbers List */}
          <div className="space-y-4">
            {phoneNumbersData.map((phone) => (
              <div
                key={phone.id}
                className="bg-white rounded-lg border border-border p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{phone.number}</p>
                    <p className="text-sm text-muted-foreground">{phone.channel}</p>
                    {phone.assignedAgent && (
                      <p className="text-sm text-primary hover:underline cursor-pointer">
                        Assigned to {phone.assignedAgent}
                      </p>
                    )}
                    {!phone.assignedAgent && <p className="text-sm text-muted-foreground">Not assigned</p>}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${phone.status === "Active" ? "bg-green-600" : "bg-gray-400"}`}
                    />
                    <span
                      className={`text-sm font-medium ${phone.status === "Active" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      {phone.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                    {phone.assignedAgent ? "Reassign" : "Assign"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge-base" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <p className="text-muted-foreground">Manage training data and FAQs for your AI agents.</p>
            <div className="flex gap-3 w-full md:w-auto flex-col md:flex-row">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Upload Documents
              </Button>
              <Button onClick={() => setIsCreateArticleOpen(true)} className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                Create Article
              </Button>
            </div>
          </div>

          {/* Knowledge Bases List */}
          <div className="space-y-4">
            {knowledgeBasesData.map((kb) => (
              <div key={kb.id} className="bg-white rounded-lg border border-border p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{kb.title}</h3>
                      <p className="text-sm text-muted-foreground">{kb.articles} articles</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="text-primary hover:underline cursor-pointer">{kb.agent}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Training Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Training Progress</span>
                    <span className="text-sm font-semibold text-foreground">{kb.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all"
                      style={{ width: `${kb.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CreateAgentModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <CreateArticleModal isOpen={isCreateArticleOpen} onClose={() => setIsCreateArticleOpen(false)} />
      <AddPhoneNumberModal isOpen={isAddPhoneOpen} onClose={() => setIsAddPhoneOpen(false)} />
    </div>
  )
}
