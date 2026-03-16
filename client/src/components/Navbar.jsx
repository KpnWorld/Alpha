import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100, height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px',
        background: scrolled
          ? 'rgba(0,0,0,0.95)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.95), transparent)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.2rem',
          letterSpacing: '-0.02em', color: 'var(--text)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{
            display: 'inline-block', width: 26, height: 26,
            background: 'linear-gradient(135deg, var(--blue), var(--blue-deep))',
            borderRadius: 6, position: 'relative', flexShrink: 0,
          }}>
            <span style={{
              position: 'absolute', inset: 5,
              background: 'var(--black)', borderRadius: 3,
            }} />
          </span>
          KpnWorld
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 40, listStyle: 'none' }}>
          {[
            { to: '/#bots',    label: 'Bots' },
            { to: '/#about',   label: 'About' },
            { to: '/#contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <li key={to}>
              <a href={to} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--text-muted)', textDecoration: 'none',
                letterSpacing: '0.05em', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{label}</a>
            </li>
          ))}
          <li>
            <a href="https://discord.gg/F9PB47S3FJ" target="_blank" rel="noreferrer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--blue)', textDecoration: 'none',
                letterSpacing: '0.05em',
                border: '1px solid var(--border)', padding: '7px 16px', borderRadius: 4,
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--blue)'; e.target.style.color = 'white' }}
              onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = 'var(--blue)' }}
            >Discord →</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(o => !o)} style={{
          display: 'none', flexDirection: 'column', gap: 5,
          background: 'none', border: 'none', cursor: 'none', padding: 4,
        }} className="nav-hamburger" aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0,
          background: 'rgba(0,0,0,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)', zIndex: 99,
          padding: '24px 0',
        }}>
          {[
            { to: '/#bots',    label: 'Bots' },
            { to: '/#about',   label: 'About' },
            { to: '/#contact', label: 'Contact' },
            { to: 'https://discord.gg/F9PB47S3FJ', label: 'Discord ↗', external: true },
          ].map(({ to, label, external }) => (
            external
              ? <a key={to} href={to} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>{label}</a>
              : <a key={to} href={to} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>{label}</a>
          ))}
        </div>
      )}
    </>
  )
}