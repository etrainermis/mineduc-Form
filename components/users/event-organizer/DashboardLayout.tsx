import React from 'react'
import EventCard from './EventCard'
import EventChart from './EventChart'
import EventFooterCard from './EventFooterCard'
import DelegatesCard from './DelegatesCard'

const DashboardLayout = () => {
  return (
    <div className="space-y-4 p-6">
      <EventCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <EventChart />
        </div>
        <div>
          <DelegatesCard />
        </div>
      </div>
      <EventFooterCard />
    </div>
  )
}

export default DashboardLayout 