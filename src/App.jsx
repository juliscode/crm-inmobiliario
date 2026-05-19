import { useMemo, useState } from 'react'

import { AppLayout } from './components/AppLayout.jsx'
import { ProfileSelector } from './components/ProfileSelector.jsx'
import { useDemoSession } from './hooks/useDemoSession.js'
import { useLeads } from './hooks/useLeads.js'
import { Dashboard } from './pages/Dashboard.jsx'
import { LeadDetail } from './pages/LeadDetail.jsx'

function App() {
  const [selectedLeadId, setSelectedLeadId] = useState(null)
  const { profiles, activeProfile, selectProfile, clearProfile } =
    useDemoSession()
  const {
    leads,
    visibleLeads,
    getFilteredLeads,
    addLead,
    saveLead,
    changeLeadStatus,
    resetLeads,
  } = useLeads(activeProfile)

  const selectedLead = useMemo(
    () => visibleLeads.find((lead) => lead.id === selectedLeadId) ?? null,
    [selectedLeadId, visibleLeads],
  )

  if (!activeProfile) {
    return <ProfileSelector profiles={profiles} onSelectProfile={selectProfile} />
  }

  return (
    <AppLayout
      activeProfile={activeProfile}
      onChangeProfile={() => {
        setSelectedLeadId(null)
        clearProfile()
      }}
    >
      {selectedLead ? (
        <LeadDetail
          activeProfile={activeProfile}
          lead={selectedLead}
          onBack={() => setSelectedLeadId(null)}
          onSaveLead={saveLead}
        />
      ) : (
        <Dashboard
          activeProfile={activeProfile}
          onChangeLeadStatus={changeLeadStatus}
          onCreateLead={addLead}
          getFilteredLeads={getFilteredLeads}
          totalLeads={leads.length}
          visibleLeads={visibleLeads}
          onOpenLead={setSelectedLeadId}
          onResetLeads={resetLeads}
        />
      )}
    </AppLayout>
  )
}

export default App
