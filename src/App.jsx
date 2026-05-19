import { AppLayout } from './components/AppLayout.jsx'
import { ProfileSelector } from './components/ProfileSelector.jsx'
import { useDemoSession } from './hooks/useDemoSession.js'
import { useLeads } from './hooks/useLeads.js'
import { Dashboard } from './pages/Dashboard.jsx'

function App() {
  const { profiles, activeProfile, selectProfile, clearProfile } =
    useDemoSession()
  const {
    leads,
    visibleLeads,
    getFilteredLeads,
    addLead,
    changeLeadStatus,
    resetLeads,
  } = useLeads(activeProfile)

  if (!activeProfile) {
    return <ProfileSelector profiles={profiles} onSelectProfile={selectProfile} />
  }

  return (
    <AppLayout activeProfile={activeProfile} onChangeProfile={clearProfile}>
      <Dashboard
        activeProfile={activeProfile}
        onChangeLeadStatus={changeLeadStatus}
        onCreateLead={addLead}
        getFilteredLeads={getFilteredLeads}
        totalLeads={leads.length}
        visibleLeads={visibleLeads}
        onResetLeads={resetLeads}
      />
    </AppLayout>
  )
}

export default App
