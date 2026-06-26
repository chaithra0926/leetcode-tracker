import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ProblemList from './pages/ProblemList'
import Revision from './pages/Revision'
import './index.css'

function App() {
  const [problems, setProblems] = useState(() => {
    const saved = localStorage.getItem('problems')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('problems', JSON.stringify(problems))
  }, [problems])

  return (
    <BrowserRouter>
      <Navbar problems={problems} />
      <Routes>
        <Route path="/" element={<Dashboard problems={problems} />} />
        <Route path="/problems" element={<ProblemList problems={problems} setProblems={setProblems} />} />
        <Route path="/revision" element={<Revision problems={problems} setProblems={setProblems} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App