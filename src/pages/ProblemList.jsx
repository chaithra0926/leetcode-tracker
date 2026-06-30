import { useState } from 'react'
import toast from 'react-hot-toast'

const difficultyColor = {
  Easy: { color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  Hard: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
}

function ProblemList({ problems, setProblems }) {
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')
  const [topic, setTopic] = useState('')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  function getNextRevisionDate(difficulty) {
    const days = difficulty === 'Easy' ? 7 : difficulty === 'Medium' ? 3 : 1
    const next = new Date()
    next.setDate(next.getDate() + days)
    return next.toISOString()
  }

  function addProblem() {
    if (name.trim() === '') {
      toast.error('Please enter a problem name!')
      return
    }
    const newProblem = {
      name: name.trim(),
      difficulty,
      topic: topic.trim(),
      nextRevision: getNextRevisionDate(difficulty),
      addedOn: new Date().toISOString(),
    }
    setProblems([...problems, newProblem])
    setName('')
    setTopic('')
    toast.success(`"${name.trim()}" added! 🎯`)
  }

  function deleteProblem(index) {
    const problemName = problems[index].name
    setProblems(problems.filter((_, i) => i !== index))
    toast.error(`"${problemName}" removed`)
  }

  function getLeetCodeUrl(name) {
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `https://leetcode.com/problems/${slug}/`
  }

  const filtered = problems
    .filter(p => filter === 'All' || p.difficulty === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.topic.toLowerCase().includes(search.toLowerCase()))

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    color: '#e2e8f0',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#7c3aed', fontFamily: 'Space Grotesk', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Problems</p>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 700, color: '#fff' }}>Problem List</h1>
        <p style={{ color: '#64748b', marginTop: '0.4rem' }}>{problems.length} problems solved so far</p>
      </div>

      <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0', marginBottom: '1rem' }}>Add New Problem</p>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr auto', gap: '0.75rem', alignItems: 'end' }}>
          <div>
            <label style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '0.3rem' }}>Problem Name</label>
            <input
              style={inputStyle}
              placeholder="e.g. Two Sum"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addProblem()}
            />
          </div>
          <div>
            <label style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '0.3rem' }}>Topic</label>
            <input
              style={inputStyle}
              placeholder="e.g. Array"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
          </div>
          <div>
            <label style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '0.3rem' }}>Difficulty</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <button
            onClick={addProblem}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              border: 'none', borderRadius: '8px',
              padding: '0.65rem 1.5rem',
              color: '#fff', fontWeight: 600, fontSize: '0.9rem',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            + Add
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <input
          style={{ ...inputStyle, width: '300px' }}
          placeholder="🔍 Search problems or topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Easy', 'Medium', 'Hard'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '0.4rem 1rem', borderRadius: '20px', border: 'none',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
              background: filter === f ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
              color: filter === f ? '#a78bfa' : '#64748b',
              transition: 'all 0.2s',
            }}>{f} ({f === 'All' ? problems.length : problems.filter(p => p.difficulty === f).length})</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#475569' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧩</p>
          <p style={{ fontSize: '1.1rem' }}>No problems found.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px',
              padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600, minWidth: '28px' }}>#{i + 1}</span>
                <div>
                  <a
                    href={getLeetCodeUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#e2e8f0', fontWeight: 500, textDecoration: 'none' }}
                  >
                    {p.name} ↗
                  </a>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '3px' }}>
                    {p.topic && <span style={{ color: '#06b6d4', fontSize: '0.75rem' }}>{p.topic}</span>}
                    {p.addedOn && <span style={{ color: '#475569', fontSize: '0.75rem' }}>Added: {new Date(p.addedOn).toDateString()}</span>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  padding: '3px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                  background: difficultyColor[p.difficulty].bg,
                  color: difficultyColor[p.difficulty].color,
                }}>{p.difficulty}</span>
                <button onClick={() => deleteProblem(problems.indexOf(p))} style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: '6px', color: '#ef4444', cursor: 'pointer',
                  padding: '4px 10px', fontSize: '0.8rem',
                }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProblemList
