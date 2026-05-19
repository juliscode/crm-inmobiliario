export function AppLayout({ activeProfile, onChangeProfile, children }) {
  const roleLabel = activeProfile.rol === 'admin' ? 'Admin' : 'Agente'

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <span className="brand-mark">CRM</span>
          <h1>CRM inmobiliario</h1>
        </div>

        <div className="session-panel">
          <div>
            <strong>{activeProfile.nombre}</strong>
            <span>{roleLabel}</span>
          </div>
          <button type="button" onClick={onChangeProfile}>
            Cambiar perfil
          </button>
        </div>
      </header>

      {children}
    </div>
  )
}
