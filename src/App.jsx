import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ProblemList from './pages/ProblemList'
import Revision from './pages/Revision'
import Login from './pages/Login'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Watch login state and load data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProblems(docSnap.data().problems || [])
        } else {
          setProblems([])
        }
        setDataLoaded(true)
      } else {
        setDataLoaded(false)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Save problems to Firestore - ONLY after initial data has loaded
  useEffect(() => {
    if (user && dataLoaded) {
      setDoc(doc(db, 'users', user.uid), { problems })
    }
  }, [problems, user, dataLoaded])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <BrowserRouter>
      <Navbar problems={problems} user={user} onLogout={() => signOut(auth)} />
      <Routes>
        <Route path="/" element={<Dashboard problems={problems} />} />
        <Route path="/problems" element={<ProblemList problems={problems} setProblems={setProblems} />} />
        <Route path="/revision" element={<Revision problems={problems} setProblems={setProblems} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App