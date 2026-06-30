import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar({ problems, user, onLogout }) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const navLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Problems', path: '/problems' },
    { label: 'Revision', path: '/revision', badge },
  ]

  return (
    <nav style={{
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(124,58,237,0.3)',
      padding: isMobile ? '0 1rem' : '0 2rem',
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
        {!isMobile && (
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
            LeetTracker
          </span>
        )}
      </div>

      {isMobile ? (
        <>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer',
          }}>
            {menuOpen ? '✕' : '☰'}
          </button>

          {menuOpen && (
            <div style={{
              position: 'fixed',
              top: '64px', left: 0, right: 0,
              background: 'rgba(10,10,15,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(124,58,237,0.3)',
              display: 'flex', flexDirection: 'column', padding: '1rem',
              gap: '0.5rem',
              zIndex: 99,
            }}>
              {navLinks.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)} style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: location.pathname === item.path ? '#fff' : '#94a3b8',
                  background: location.pathname === item.path ? 'rgba(124,58,237,0.3)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  {item.label}
                  {item.badge > 0 && (
                    <span style={{ background: '#ef4444', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '0.7rem', fontWeight: 700 }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              {user && (
                <button onClick={onLogout} style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: '#ef4444',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}>Logout</button>
              )}
            </div>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navLinks.map(item => (
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

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={user.photoURL} alt={user.displayName} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
              <button onClick={onLogout} style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '6px',
                padding: '0.4rem 0.8rem',
                color: '#ef4444',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar