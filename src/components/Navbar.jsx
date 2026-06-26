import { Link, useLocation } from 'react-router-dom'

function Navbar({ problems }) {
  const location = useLocation()

  const overdue = problems ? problems.filter(p => {
    if (!p.nextRevision) return false
    const today = new Date(); today.setHours(0,0,0,0)
    return new Date(p.nextRevision) < today
  }).length : 0

  const dueToday = problems ? problems.filter(p => {
    if (!p.nextRevision) return false
    const today = new Date()
    return new Date(p.nextRevision).toDateString() === today.toDateString()
  }).length : 0

  const badge = overdue + dueToday

  return (
    <nav style={{
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(124,58,237,0.3)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px'
        }}>⚡</div>
        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
          LeetTracker
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {[
          { label: 'Dashboard', path: '/' },
          { label: 'Problems', path: '/problems' },
          { label: 'Revision', path: '/revision', badge },
        ].map(item => (
          <Link key={item.path} to={item.path} style={{
            padding: '0.4rem 1rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: location.pathname === item.path ? '#fff' : '#94a3b8',
            background: location.pathname === item.path ? 'rgba(124,58,237,0.3)' : 'transparent',
            border: location.pathname === item.path ? '1px solid rgba(124,58,237,0.5)' : '1px solid transparent',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            {item.label}
            {item.badge > 0 && (
              <span style={{ background: '#ef4444', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '0.7rem', fontWeight: 700 }}>
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar