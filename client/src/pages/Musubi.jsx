import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import musubiIcon from '../assets/musubi.png'

const M = {
  purple:     '#C084FC',
  purpleDeep: '#A855F7',
  pink:       '#F472B6',
  bg:         '#fdf8ff',
  bg2:        '#f7f0ff',
  bg3:        '#ede0ff',
  border:     'rgba(192,132,252,0.18)',
  text:       '#150a28',
  muted:      '#7a6695',
}

const mStyle = {
  body: {
    background: M.bg,
    color: M.text,
    fontFamily: "'Playfair Display', 'Syne', serif",
  }
}

function useMusubiTheme() {
  useEffect(() => {
    document.body.style.background = M.bg
    document.body.style.color = M.text
    // Override grid bg color
    document.querySelectorAll('.grid-bg').forEach(el => {
      el.style.backgroundImage = `linear-gradient(rgba(192,132,252,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(192,132,252,0.05) 1px, transparent 1px)`
    })
    return () => {
      document.body.style.background = ''
      document.body.style.color = ''
      document.querySelectorAll('.grid-bg').forEach(el => { el.style.backgroundImage = '' })
    }
  }, [])
}

function useStats() {
  const [stats, setStats] = useState({ active_calls: null, registered_guilds: null, total_users: null, callboard: [] })
  useEffect(() => {
    fetch('/api/musubi/stats')
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setStats(d))
      .catch(() => {})
  }, [])
  return stats
}

function useReveal() {
  const refs = useRef([])
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const r = el => { if (el && !refs.current.includes(el)) refs.current.push(el) }
  return r
}

function countUp(val) {
  if (val === null) return '—'
  return val.toLocaleString()
}

export default function Musubi() {
  useMusubiTheme()
  const stats = useStats()
  const r = useReveal()

  useEffect(() => {
    document.title = 'Musubi — KpnWorld'
    // Set musubi favicon
    const link = document.querySelector("link[rel~='icon']")
    if (link) { link.href = '/musubi-icon.png' }
    return () => { if (link) link.href = '/favicon.svg' }
  }, [])

  return (
    <div style={{ background: M.bg, color: M.text, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '120px 60px 80px', overflow: 'hidden',
      }}>
        <Blob style={{ width: 550, height: 550, background: 'rgba(192,132,252,0.15)', top: -80, right: -80 }} />
        <Blob style={{ width: 350, height: 350, background: 'rgba(244,114,182,0.12)', bottom: 0, left: 50, animationDelay: '3s' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', width: '100%', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Left */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em', color: M.purple, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, animation: 'fade-up 0.7s 0.1s both' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: M.purple, boxShadow: `0 0 8px ${M.purple}`, flexShrink: 0 }} />
              GUILD-TO-GUILD RELAY BOT
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', background: 'rgba(192,132,252,0.15)', border: `1px solid ${M.border}`, color: M.purple, padding: '2px 8px', borderRadius: 3 }}>v1.0.0</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3.2rem, 7vw, 6.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', color: M.text, marginBottom: 16, animation: 'fade-up 0.7s 0.25s both' }}>
              Extend<br />the server.
            </h1>

            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontStyle: 'italic', color: M.purple, marginBottom: 20, animation: 'fade-up 0.7s 0.4s both' }}>
              Cross the distance. Make the call.
            </p>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: M.muted, lineHeight: 1.85, maxWidth: 400, marginBottom: 36, animation: 'fade-up 0.7s 0.5s both' }}>
              Musubi connects your Discord server to a stranger's. Two servers. One call. Real conversations — names, avatars, replies relayed in real time.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 36, animation: 'fade-up 0.7s 0.6s both' }}>
              {[
                { val: countUp(stats.registered_guilds), label: 'Servers' },
                { val: countUp(stats.total_users),       label: 'Users' },
                { val: countUp(stats.active_calls),      label: 'Active calls' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', fontWeight: 700, color: M.purple }}>{s.val}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: M.muted }}>{s.label}</span>
                  {i < 2 && <span style={{ display: 'none' }} />}
                </div>
              )).reduce((acc, el, i) => i < 2 ? [...acc, el, <span key={`d${i}`} style={{ width: 1, height: 30, background: M.border }} />] : [...acc, el], [])}
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', animation: 'fade-up 0.7s 0.7s both' }}>
              <a href="https://discord.com/oauth2/authorize?client_id=920092351551139880" target="_blank" rel="noreferrer" style={btnPrimary}>Add to Server ↗</a>
              <Link to="/musubi/commands" style={btnGhost}>Commands ref</Link>
            </div>
          </div>

          {/* Right — call diagram */}
          <div style={{ position: 'relative', animation: 'fade-up 0.7s 0.4s both' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 48, background: 'rgba(255,255,255,0.6)',
              border: `1px solid ${M.border}`, borderRadius: 24,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 40px rgba(192,132,252,0.12)',
              position: 'relative',
            }}>
              {/* Your server */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <img src={musubiIcon} alt="Musubi" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(192,132,252,0.3)', boxShadow: '0 0 24px rgba(192,132,252,0.2)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: M.muted }}>Your Server</span>
              </div>

              {/* Wire */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px', position: 'relative' }}>
                <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, rgba(192,132,252,0.2), rgba(192,132,252,0.5), rgba(192,132,252,0.2))`, position: 'relative', overflow: 'visible' }}>
                  <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: M.purple, boxShadow: `0 0 8px ${M.purple}`, animation: 'travel-r 2.5s linear infinite' }} />
                  <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: M.pink, boxShadow: `0 0 8px ${M.pink}`, animation: 'travel-r 2.5s linear infinite', animationDelay: '1.25s' }} />
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: '50%', background: M.bg, border: `1px solid ${M.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 0 20px rgba(192,132,252,0.2)', zIndex: 1 }}>📞</div>
                <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, rgba(192,132,252,0.2), rgba(192,132,252,0.5), rgba(192,132,252,0.2))`, position: 'relative', overflow: 'visible' }}>
                  <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: M.purple, boxShadow: `0 0 8px ${M.purple}`, animation: 'travel-l 2.5s linear infinite' }} />
                  <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: M.pink, boxShadow: `0 0 8px ${M.pink}`, animation: 'travel-l 2.5s linear infinite', animationDelay: '1.25s' }} />
                </div>
              </div>

              {/* Stranger server */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: M.bg3, border: `2px dashed rgba(192,132,252,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: M.purple, opacity: 0.5, fontFamily: "'Playfair Display', serif" }}>?</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: M.muted }}>Stranger's Server</span>
              </div>
            </div>

            {/* Floating messages */}
            <div style={{ position: 'absolute', bottom: -20, left: -10, background: 'white', border: `1px solid ${M.border}`, borderRadius: 10, padding: '10px 16px', boxShadow: '0 4px 20px rgba(192,132,252,0.12)', minWidth: 180, animation: 'fade-up 0.6s 1.4s both' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: M.purple, marginBottom: 4 }}>spector</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: M.text }}>hello? anyone there</div>
            </div>
            <div style={{ position: 'absolute', top: -20, right: -10, background: 'white', border: `1px solid ${M.border}`, borderRadius: 10, padding: '10px 16px', boxShadow: '0 4px 20px rgba(192,132,252,0.12)', minWidth: 180, animation: 'fade-up 0.6s 1.8s both' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: M.pink, marginBottom: 4 }}>stranger</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: M.text }}>hey!! where are you from</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 60px', background: 'white', borderTop: `1px solid ${M.border}`, borderBottom: `1px solid ${M.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div ref={r} className="reveal" style={{ marginBottom: 56 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: M.purple, marginBottom: 12 }}>HOW IT WORKS</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: M.text }}>Three steps.<br />One call.</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {[
              { num: '01', icon: '⚙️', name: 'Setup your booth', desc: <>Run <code style={codeStyle}>/setup</code> to register your server and pick a booth channel where all calls happen.</> },
              { num: '02', icon: '📞', name: 'Dial in',          desc: <>Run <code style={codeStyle}>/call</code> to enter the network. Smart matchmaking finds a partner — premium guilds get priority.</> },
              { num: '03', icon: '💬', name: 'Talk',             desc: <>Messages, names, avatars relay in real time. When done, <code style={codeStyle}>/hangup</code>.</> },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div ref={r} className="reveal" style={{ flex: 1, background: M.bg, border: `1px solid ${M.border}`, borderRadius: 16, padding: '36px 32px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: M.purple, marginBottom: 12 }}>{step.num}</div>
                  <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{step.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: M.text, marginBottom: 10 }}>{step.name}</h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: M.muted, lineHeight: 1.8 }}>{step.desc}</p>
                </div>
                {i < 2 && <span style={{ fontSize: '1.4rem', color: M.purple, padding: '0 16px', opacity: 0.5, flexShrink: 0 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '100px 60px', background: M.bg2, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div ref={r} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: M.purple, marginBottom: 12 }}>FEATURES</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: M.text }}>Everything the network needs.<br />Nothing it doesn't.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: '📞', name: 'Phone',        tag: 'Core',    desc: 'Place a call, get matched, talk in real time. Go anonymous or drop your tag with /friendme.', cmds: ['/call', '/hangup', '/anonymous', '/friendme'] },
              { icon: '👤', name: 'Profile',      tag: '✨ Premium', tagPurple: true, desc: 'Control how you appear on the network. Custom display names and avatars for premium users.', cmds: ['/me status', '/me name', '/me avatar', '/me reset'] },
              { icon: '⚙️', name: 'Server Setup', tag: 'Admin',   desc: 'Everything admins need. Register, pick a booth channel, set a prefix, or unregister safely.', cmds: ['/setup', '/setbooth', '/prefix', '/unregister'] },
              { icon: '🏆', name: 'Callboard',    tag: 'Network', desc: 'Servers earn XP every message sent on a call. Top 7 reset monthly. Premium servers earn double XP.', cmds: ['/callboard'] },
              { icon: '✨', name: 'Premium',      tag: 'Two Tiers', tagPurple: true, desc: 'User: custom name, avatar, personal prefix. Server: attachment forwarding, sticker relay, double XP.', cmds: ['/premium status', '/redeem'] },
              { icon: '🛡️', name: 'Safety',       tag: 'Built-in', desc: 'Global filter, invite blocking, flood detection, caps spam. Banned users dropped at the door automatically.', cmds: ['automatic'] },
            ].map((f, i) => (
              <div key={i} ref={r} className="reveal" style={{ background: 'white', border: `1px solid ${M.border}`, borderRadius: 16, padding: 32, transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(192,132,252,0.12)'; e.currentTarget.style.borderColor = 'rgba(192,132,252,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = M.border }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: M.text, flex: 1 }}>{f.name}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', padding: '2px 8px', borderRadius: 3, background: f.tagPurple ? 'rgba(192,132,252,0.12)' : M.bg2, border: `1px solid ${M.border}`, color: f.tagPurple ? M.purple : M.muted, whiteSpace: 'nowrap' }}>{f.tag}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: M.muted, lineHeight: 1.8, marginBottom: 16 }}>{f.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {f.cmds.map(c => <code key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', background: M.bg3, color: M.purple, padding: '3px 8px', borderRadius: 4, border: `1px solid ${M.border}` }}>{c}</code>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALLBOARD ── */}
      <section style={{ padding: '100px 60px', background: 'white', borderTop: `1px solid ${M.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div ref={r} className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: M.purple, marginBottom: 12 }}>CALLBOARD</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: M.text }}>Top servers<br />this cycle.</h2>
          </div>

          <div ref={r} className="reveal" style={{ border: `1px solid ${M.border}`, borderRadius: 16, overflow: 'hidden' }}>
            {stats.callboard.length === 0 ? (
              <div style={{ padding: '48px 32px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: M.muted }}>
                {stats.registered_guilds === null ? 'Loading callboard...' : 'No callboard data yet.'}
              </div>
            ) : stats.callboard.map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '20px 28px',
                borderBottom: i < stats.callboard.length - 1 ? `1px solid ${M.border}` : 'none',
                background: i === 0 ? 'rgba(192,132,252,0.05)' : 'white',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(192,132,252,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = i === 0 ? 'rgba(192,132,252,0.05)' : 'white'}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: i === 0 ? M.purple : M.muted, minWidth: 32 }}>#{row.rank}</span>
                {row.icon_url
                  ? <img src={row.icon_url} alt="" style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${M.border}` }} />
                  : <div style={{ width: 36, height: 36, borderRadius: '50%', background: M.bg3, border: `1px solid ${M.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: M.muted }}>?</div>
                }
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: M.text, flex: 1 }}>{row.guild_name || `Server …${(row.guild_id || '').slice(-4)}`}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: M.purple }}>{(row.xp || 0).toLocaleString()} xp</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '120px 60px', background: M.bg2, borderTop: `1px solid ${M.border}`, textAlign: 'center', position: 'relative', zIndex: 2, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', animation: 'glow-pulse 6s ease-in-out infinite' }} />
        <div ref={r} className="reveal" style={{ position: 'relative', zIndex: 1, maxWidth: 540, margin: '0 auto' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: 20 }}>📞</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: M.text, marginBottom: 16, letterSpacing: '-0.01em' }}>
            Ready to make<br />the first call?
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: M.muted, lineHeight: 1.8, marginBottom: 36 }}>
            Add Musubi to your server. Pick a booth channel. Dial in.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
            <a href="https://discord.com/oauth2/authorize?client_id=920092351551139880" target="_blank" rel="noreferrer" style={btnPrimary}>Add Musubi ↗</a>
            <a href="https://discord.gg/F9PB47S3FJ" target="_blank" rel="noreferrer" style={btnGhost}>Join the network</a>
          </div>
          <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: M.muted, textDecoration: 'none', letterSpacing: '0.05em' }}>← Back to KpnWorld</Link>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes travel-r {
          0%   { left: -4px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
        @keyframes travel-l {
          0%   { right: -4px; left: auto; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { right: calc(100% + 4px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function Blob({ style }) {
  return <div style={{ position: 'absolute', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(100px)', animation: 'glow-pulse 7s ease-in-out infinite', ...style }} />
}

const btnPrimary = {
  background: `linear-gradient(135deg, ${M.purple}, ${M.purpleDeep})`,
  color: 'white', padding: '13px 28px', borderRadius: 100,
  textDecoration: 'none', fontFamily: 'var(--font-mono)',
  fontSize: '0.82rem', letterSpacing: '0.04em',
  boxShadow: '0 4px 24px rgba(192,132,252,0.35)', display: 'inline-block',
  transition: 'transform 0.2s, box-shadow 0.2s',
}
const btnGhost = {
  color: M.muted, padding: '13px 28px', borderRadius: 100,
  textDecoration: 'none', fontFamily: 'var(--font-mono)',
  fontSize: '0.82rem', border: `1px solid ${M.border}`,
  transition: 'color 0.2s, border-color 0.2s', display: 'inline-block',
}
const codeStyle = {
  background: 'rgba(192,132,252,0.1)', color: M.purple,
  padding: '1px 5px', borderRadius: 3, fontSize: '0.78rem',
  fontFamily: 'var(--font-mono)',
}