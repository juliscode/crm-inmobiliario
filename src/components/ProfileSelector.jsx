export function ProfileSelector({ profiles, onSelectProfile }) {
  return (
    <main className="profile-screen">
      <section className="profile-card" aria-labelledby="profile-title">
        <div className="eyebrow">Modo demo local</div>
        <h1 id="profile-title">CRM inmobiliario</h1>
        <p>
          Elegí un perfil para probar permisos y flujo de trabajo sin
          autenticación real.
        </p>

        <div className="profile-options" aria-label="Perfiles disponibles">
          {profiles.map((profile) => (
            <button
              className="profile-option"
              key={profile.id}
              type="button"
              onClick={() => onSelectProfile(profile.id)}
            >
              <span>{profile.nombre}</span>
              <strong>{profile.rol === 'admin' ? 'Admin' : 'Agente'}</strong>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
