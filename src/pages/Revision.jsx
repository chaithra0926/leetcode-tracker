function Revision({ problems, setProblems }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const overdue = problems.filter(p => p.nextRevision && new Date(p.nextRevision) < today)
  const dueToday = problems.filter(p => p.nextRevision && new Date(p.nextRevision).toDateString() === today.toDateString())
  const upcoming = problems.filter(p => p.nextRevision && new Date(p.nextRevision) > today)
  const noRevision = problems.filter(p => !p.nextRevision)

  function markRevised(index) {
    const updated = [...problems]
    const problem = updated[index]
    const days = problem.difficulty === 'Easy' ? 7 : problem.difficulty === 'Medium' ? 3 : 1
    const next = new Date()
    next.setDate(next.getDate() + days)
    updated[index] = { ...problem, nextRevision: next.toISOString() }
    setProblems(updated)
  }

  const cardStyle = (color) => ({
    background: `rgba(${color},0.05)`,
    border: `1px solid rgba(${color},0.2)`,
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
  })

  const Section = ({ title, items, color, emoji, allProblems }) => (
    items.length > 0 && (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0', fontSize: '1.1rem' }}>{title}</h2>
          <span style={{ background: `rgba(${color},0.2)`, color: `rgb(${color})`, borderRadius: '20px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 600 }}>{items.length}</span>
        </div>
        {items.map((p) => {
          const realIndex = allProblems.indexOf(p)
          return (
            <div key={realIndex} style={cardStyle(color)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <p style={{ color: '#e2e8f0', fontWeight: 500 }}>{p.name}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '3px' }}>
                    {p.topic && <span style={{ color: '#06b6d4', fontSize: '0.75rem' }}>{p.topic}</span>}
                    {p.nextRevision && <span style={{ color: '#475569', fontSize: '0.75rem' }}>Next: {new Date(p.nextRevision).toDateString()}</span>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  padding: '3px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                  background: p.difficulty === 'Easy' ? 'rgba(16,185,129,0.15)' : p.difficulty === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                  color: p.difficulty === 'Easy' ? '#10b981' : p.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
                }}>{p.difficulty}</span>
                <button onClick={() => markRevised(realIndex)} style={{
                  background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)',
                  borderRadius: '6px', color: '#a78bfa', cursor: 'pointer',
                  padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600,
                }}>✓ Revised</button>
              </div>
            </div>
          )
        })}
      </div>
    )
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#7c3aed', fontFamily: 'Space Grotesk', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Spaced Repetition</p>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 700, color: '#fff' }}>Revision Scheduler</h1>
        <p style={{ color: '#64748b', marginTop: '0.4rem' }}>Never forget a problem again</p>
      </div>

      {problems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#475569' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</p>
          <p style={{ fontSize: '1.1rem' }}>No problems added yet.</p>
        </div>
      ) : (
        <>
          <Section title="Overdue" items={overdue} color="239,68,68" emoji="🔴" allProblems={problems} />
          <Section title="Due Today" items={dueToday} color="245,158,11" emoji="🟡" allProblems={problems} />
          <Section title="Upcoming" items={upcoming} color="16,185,129" emoji="🟢" allProblems={problems} />
          {noRevision.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⚪</span>
                <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0', fontSize: '1.1rem' }}>Not Scheduled</h2>
                <span style={{ background: 'rgba(100,116,139,0.2)', color: '#64748b', borderRadius: '20px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 600 }}>{noRevision.length}</span>
              </div>
              {noRevision.map((p) => {
                const realIndex = problems.indexOf(p)
                return (
                  <div key={realIndex} style={cardStyle('100,116,139')}>
                    <div>
                      <p style={{ color: '#e2e8f0', fontWeight: 500 }}>{p.name}</p>
                      {p.topic && <span style={{ color: '#06b6d4', fontSize: '0.75rem' }}>{p.topic}</span>}
                    </div>
                    <button onClick={() => markRevised(realIndex)} style={{
                      background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)',
                      borderRadius: '6px', color: '#a78bfa', cursor: 'pointer',
                      padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600,
                    }}>Schedule</button>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Revision