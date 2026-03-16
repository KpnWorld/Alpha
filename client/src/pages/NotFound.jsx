import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = '404 — KpnWorld'
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', zIndex: 2, overflow: 'hidden',
      padding: '120px 24px', textAlign: 'center',
    }}>

      {/* Glows */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(49,113,240,0.12) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', animation: 'glow-pulse 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,193,245,0.07) 0%, transparent 70%)',
        top: '20%', right: '10%', pointerEvents: 'none',
        animation: 'glow-pulse 8s ease-in-out infinite reverse',
      }} />

      {/* Ghost 404 */}
      <div style={{
        position: 'absolute',
        fontSize: 'clamp(180px, 30vw, 380px)',
        fontWeight: 800, letterSpacing: '-0.05em',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(101,136,240,0.07)',
        userSelect: 'none', pointerEvents: 'none',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        whiteSpace: 'nowrap', zIndex: 0,
        fontFamily: 'var(--font-head)',
      }}>404</div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          letterSpacing: '0.2em', color: 'var(--lavender)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginBottom: 24, animation: 'fade-up 0.7s 0.1s both',
        }}>
          <span style={{ display: 'block', width: 20, height: 1, background: 'var(--lavender)' }} />
          ERROR 404
          <span style={{ display: 'block', width: 20, height: 1, background: 'var(--lavender)' }} />
        </p>

        <h1 style={{
          fontSize: 'clamp(3rem, 9vw, 6.5rem)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 24,
          animation: 'fade-up 0.7s 0.25s both',
        }}>
          Page not<br />
          <span className="text-gradient">found.</span>
        </h1>

        {/* Code block showing broken path */}
        <div style={{
          border: '1px solid var(--border)', borderRadius: 10,
          background: 'var(--surface-2)', padding: '24px 28px',
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
          color: 'var(--text-muted)', lineHeight: 1.8,
          textAlign: 'left', marginBottom: 36,
          animation: 'fade-up 0.7s 0.4s both',
        }}>
          {[
            { n: 1, c: <span style={{opacity:.4}}># KpnWorld routing error</span> },
            { n: 2, c: null },
            { n: 3, c: <><span style={{color:'var(--blue)'}}>raise </span><span style={{color:'#7dd6f0'}}>NotFound</span>(<span style={{color:'var(--lavender)'}}>"{pathname}"</span>)</> },
            { n: 4, c: <span style={{opacity:.4}}># status: 404 — route does not exist</span> },
          ].map(({ n, c }) => (
            <div key={n} style={{ display: 'flex', gap: 16 }}>
              <span style={{ opacity: 0.3, minWidth: 16, userSelect: 'none' }}>{n}</span>
              <span>{c}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fade-up 0.7s 0.55s both',
        }}>
          <Link to="/" className="btn-primary">← Back home</Link>
          <Link to="/#bots" className="btn-ghost">View our bots</Link>
          <a href="https://discord.gg/F9PB47S3FJ" target="_blank" rel="noreferrer" className="btn-ghost">Discord</a>
        </div>

      </div>
    </div>
  )
}