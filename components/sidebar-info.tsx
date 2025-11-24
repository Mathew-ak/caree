export default function SidebarInfo() {
  return (
    <div className="flex flex-col gap-12">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your AI-Powered Customer Engagement Platform</h2>
        <p className="text-base leading-relaxed opacity-90">
          Transform your business with intelligent automation for customer interactions, appointments, and support.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-6">
        {[
          {
            title: "WhatsApp & Call Automation",
            desc: "Handle customer conversations 24/7",
          },
          {
            title: "Smart Scheduling",
            desc: "Automated appointment booking and reminders",
          },
          {
            title: "Real-time Insights",
            desc: "Track engagement and performance metrics",
          },
        ].map((feature, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border-2 border-white">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">{feature.title}</p>
              <p className="text-sm opacity-80">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="border-t border-white/20 pt-8">
        <p className="text-sm opacity-80 mb-4">Trusted by thousands of businesses worldwide</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "10,000+", label: "Active Users" },
            { value: "500K+", label: "Conversations" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-75">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
