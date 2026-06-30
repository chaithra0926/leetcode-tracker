import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import toast from 'react-hot-toast'

function Login() {
  async function handleLogin() {
    try {
      await signInWithPopup(auth, googleProvider)
      toast.success('Welcome! 🎉')
    } catch (error) {
      toast.error('Login failed. Try again.')
      console.error(error)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0f',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(124,58,237,0.3)',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center',
        maxWidth: '400px',
      }}>
        <div style={{
          width: '60px', height: '60px',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px',
          margin: '0 auto 1.5rem',
        }}>⚡</div>

        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
          LeetTracker
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Track problems. Build streaks. Never forget what you've learned.
        </p>

        <button onClick={handleLogin} style={{
          width: '100%',
          background: '#fff',
          border: 'none',
          borderRadius: '10px',
          padding: '0.8rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#1e1e2e',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}>
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Login