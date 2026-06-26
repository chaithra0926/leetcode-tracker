import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Dashboard({ problems }) {
  const total = problems.length
  const easy = problems.filter(p => p.difficulty === 'Easy').length
  const medium = problems.filter(p => p.difficulty === 'Medium').length
  const hard = problems.filter(p => p.difficulty === 'Hard').length

  // Streak calculator
  const getDayKey = (dateStr) => new Date(dateStr).toDateString()
  const uniqueDays = [...new Set(problems.map(p => getDayKey(p.addedOn)).filter(Boolean))]
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (uniqueDays.includes(d.toDateString())) streak++
    else break
  }

  // Weekly bar chart data
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const label = d.toLocaleDateString('en-US', { weekday: 'short' })
    const count = problems.filter(p => p.addedOn && new Date(p.addedOn).toDateString() === d.toDateString()).length
    return { day: label, count }
  })

  // Pie chart data
  const pieData = [
    { name: 'Easy', value: easy, color: '#10b981' },
    { name: 'Medium', value: medium, color: '#f59e0b' },
    { name: 'Hard', value: hard, color: '#ef4444' },
  ].filter(d => d.value > 0)

  const stats = [
    { label: 'Total Solved', value: total, color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)' },
    { label: 'Easy', value: easy, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
    { label: 'Medium', value: medium, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
    { label: 'Hard', value: hard, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
  ]

  const recentProblems = [...problems].reverse().slice(0, 5)

  const tooltipStyle = {
    background: '#1e1e2e',
    border: '1px solid rgba(124,58,237,0.3)',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '0.85rem',
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#7c3aed', fontFamily: 'Space Grotesk', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Overview</p>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 700, color: '#fff' }}>Your Progress</h1>
          <p style={{ color: '#64748b', marginTop: '0.4rem' }}>Track every problem you conquer</p>
        </div>
        {streak > 0 && (
          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px', padding: '1rem 1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem' }}>🔥</p>
            <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#f59e0b', fontSize: '1.5rem' }}>{streak}</p>
            <p style={{ color: '#64748b', fontSize: '0.75rem' }}>day streak</p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: stat.bg,
            border: `1px solid ${stat.border}`,
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{stat.label}</p>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 700, color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      {total > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem', marginBottom: '2rem' }}>

          {/* Pie Chart */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0', marginBottom: '1rem' }}>Difficulty Breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              {pieData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0', marginBottom: '1rem' }}>This Week</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData}>
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(124,58,237,0.1)' }} />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Problems */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem' }}>
        <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, marginBottom: '1rem', color: '#e2e8f0' }}>Recently Solved</p>
        {recentProblems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</p>
            <p>No problems yet. Start solving!</p>
          </div>
        ) : (
          recentProblems.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.75rem 0',
              borderBottom: i < recentProblems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed' }} />
                <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{p.name}</span>
                {p.topic && <span style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{p.topic}</span>}
              </div>
              <span style={{
                padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                background: p.difficulty === 'Easy' ? 'rgba(16,185,129,0.15)' : p.difficulty === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                color: p.difficulty === 'Easy' ? '#10b981' : p.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
              }}>{p.difficulty}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard