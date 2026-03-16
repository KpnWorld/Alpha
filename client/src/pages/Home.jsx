import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import musubiIcon from '../assets/musubi.png'

export default function Home() {
  const revealRefs = useRef([])

  useEffect(() => {
    document.title = 'KpnWorld — We build bots.'
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const r = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  return (
    <main style={{ position: 'relative', zIndex: 2 }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 60px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(49,113,240,0.18) 0%, transparent 70%)',
          top: -100, right: -100, pointerEvents: 'none', borderRadius: '50%',
          animation: 'glow-pulse 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(220,193,245,0.10) 0%, transparent 70%)',
          bottom: 100, left: 200, pointerEvents: 'none', borderRadius: '50%',
          animation: 'glow-pulse 8s ease-in-out infinite reverse',
        }} />

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.18em',
          color: 'var(--blue)', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12,
          animation: 'fade-up 0.8s 0.2s both',
        }}>
          <span style={{ display: 'block', width: 32, height: 1, background: 'var(--blue)' }} />
          Discord Bot Development
        </p>

        <h1 style={{
          fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 800,
          lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: 32,
          animation: 'fade-up 0.8s 0.4s both',
        }}>
          We build<br />
          <span className="text-gradient">bots.</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '1rem',
          color: 'var(--text-muted)', maxWidth: 400, lineHeight: 1.7, marginBottom: 48,
          animation: 'fade-up 0.8s 0.6s both',
        }}>
          Imagining the future of Discord — one command at a time.
        </p>

        <div style={{
          display: 'flex', gap: 16, alignItems: 'center',
          animation: 'fade-up 0.8s 0.8s both',
        }}>
          <a href="#bots" className="btn-primary">Explore our bots</a>
          <a href="#about" className="btn-ghost">About KpnWorld</a>
        </div>

        <div style={{
          position: 'absolute', bottom: 48, left: 60,
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          letterSpacing: '0.15em', color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: 12,
          animation: 'fade-up 0.8s 1.2s both',
        }}>
          scroll
          <span style={{ display: 'block', width: 1, height: 48, background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        background: 'rgba(10,10,15,0.8)',
      }}>
        {[
          { num: '3', label: 'ACTIVE BOTS' },
          { num: '∞', label: 'POSSIBILITIES' },
          { num: '01', label: 'VISION' },
        ].map((s, i) => (
          <div key={i} ref={r} className="reveal" style={{
            padding: '40px 60px',
            borderRight: i < 2 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, var(--text) 0%, var(--blue) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{s.num}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── BOTS ── */}
      <section id="bots" style={{ background: 'var(--surface)', padding: '120px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <p ref={r} className="reveal section-eyebrow">OUR PRODUCTS</p>
            <h2 ref={r} className="reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Built for every<br />Discord need.
            </h2>
          </div>
          <a href="#contact" ref={r} className="reveal btn-ghost" style={{ whiteSpace: 'nowrap', alignSelf: 'flex-end' }}>All bots →</a>
        </div>

        <div ref={r} className="reveal" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2, background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden',
        }}>
          {[
            { to: '/musubi', icon: musubiIcon, isImg: true, tag: 'COMMUNICATION', tagColor: 'blue', name: 'Musubi', desc: 'Guild-to-guild relay bot. Two servers. One call. Real conversations in real time.' },
            { to: '/denki',  icon: '⚡',       isImg: false, tag: 'ECONOMY',       tagColor: 'pink', name: 'Denki',  desc: 'A global currency system that connects economies across Discord servers network-wide.' },
            { to: '/fate',   icon: '🌐',       isImg: false, tag: 'MULTIPURPOSE',  tagColor: 'blue', name: 'Fate',   desc: 'Moderation, utilities, and server stats — everything your community needs in one bot.' },
          ].map((bot) => (
            <BotCard key={bot.to} {...bot} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', padding: '120px 60px', position: 'relative', zIndex: 2 }}>
        <div ref={r} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CodeBlock lines={[
            { num: 1, content: <><span style={{color:'var(--text-muted)',opacity:.5}}># KpnWorld — bot architecture</span></> },
            { num: 2, content: null },
            { num: 3, content: <><span style={{color:'var(--blue)'}}>class </span><span style={{color:'#7dd6f0'}}>KpnBot</span><span>(commands.Bot):</span></> },
            { num: 4, content: <><span style={{paddingLeft:20, color:'var(--blue)'}}>async def </span><span style={{color:'#7dd6f0'}}>setup_hook</span><span>(self):</span></> },
            { num: 5, content: <><span style={{paddingLeft:40, color:'var(--blue)'}}>await </span><span>self.load_extensions()</span></> },
            { num: 6, content: <><span style={{paddingLeft:40, color:'var(--text-muted)', opacity:.5}}># always running. always ready.</span></> },
            { num: 7, content: null },
            { num: 8, content: <><span style={{color:'var(--blue)'}}>await </span><span style={{color:'#7dd6f0'}}>bot</span><span>.start(TOKEN) </span><span style={{color:'var(--text-muted)',opacity:.5}}>✓</span></> },
          ]} />
          <CodeBlock dark lines={[
            { num: 1, content: <><span style={{color:'var(--lavender)'}}>"company"</span><span>: </span><span style={{color:'var(--lavender)'}}>  "KpnWorld"</span><span>,</span></> },
            { num: 2, content: <><span style={{color:'var(--lavender)'}}>"mission"</span><span>: </span><span style={{color:'var(--lavender)'}}>  "Imagine the future"</span><span>,</span></> },
            { num: 3, content: <><span style={{color:'var(--lavender)'}}>"bots"</span><span>:    [</span><span style={{color:'var(--lavender)'}}>"Musubi"</span><span>, </span><span style={{color:'var(--lavender)'}}>"Denki"</span><span>, </span><span style={{color:'var(--lavender)'}}>"Fate"</span><span>],</span></> },
            { num: 4, content: <><span style={{color:'var(--lavender)'}}>"status"</span><span>:  </span><span style={{color:'var(--blue)'}}>true</span></> },
          ]} />
        </div>

        <div>
          <p ref={r} className="reveal section-eyebrow">ABOUT US</p>
          <h2 ref={r} className="reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
            Crafting the tools<br />Discord deserves.
          </h2>
          <p ref={r} className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 12 }}>
            KpnWorld is a Discord bot development studio focused on building reliable, thoughtful tools for communities of every size.
          </p>
          <p ref={r} className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 24 }}>
            From economy systems to moderation — we build with intention. Every bot is designed to feel native to Discord, not bolted on.
          </p>
          <div ref={r} className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['discord.py', 'Python', 'REST APIs', 'WebSockets', 'React', 'Flask'].map(t => (
              <span key={t} className={`pill ${['discord.py','Python','React'].includes(t) ? 'blue' : t === 'Flask' ? 'lavender' : ''}`}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ textAlign: 'center', background: 'var(--surface)', padding: '120px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p ref={r} className="reveal section-eyebrow center">GET IN TOUCH</p>
          <h2 ref={r} className="reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 24 }}>
            Join the<br /><span className="text-gradient">network.</span>
          </h2>
          <p ref={r} className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 48 }}>
            Have a project in mind or want to add our bots to your server?<br />
            Reach out on Discord — we're always building.
          </p>
          <div ref={r} className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <a href="https://discord.gg/F9PB47S3FJ" target="_blank" rel="noreferrer" className="btn-primary">Join Discord</a>
            <a href="https://github.com/kwcodex" target="_blank" rel="noreferrer" className="btn-ghost">GitHub →</a>
          </div>
        </div>
      </section>

    </main>
  )
}

function BotCard({ to, icon, isImg, tag, tagColor, name, desc }) {
  return (
    <Link to={to} style={{
      background: 'var(--surface-2)', padding: '48px 40px',
      textDecoration: 'none', color: 'inherit',
      display: 'flex', flexDirection: 'column', gap: 24,
      transition: 'background 0.3s', position: 'relative', overflow: 'hidden',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
    onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: tagColor === 'pink' ? 'rgba(220,193,245,0.12)' : 'rgba(101,136,240,0.12)',
        border: `1px solid ${tagColor === 'pink' ? 'rgba(220,193,245,0.2)' : 'rgba(101,136,240,0.2)'}`,
        fontSize: isImg ? 0 : '1.4rem', overflow: 'hidden',
      }}>
        {isImg ? <img src={icon} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : icon}
      </div>
      <div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em',
          color: tagColor === 'pink' ? 'var(--lavender)' : 'var(--blue)',
          background: tagColor === 'pink' ? 'rgba(220,193,245,0.1)' : 'rgba(101,136,240,0.1)',
          border: `1px solid ${tagColor === 'pink' ? 'rgba(220,193,245,0.2)' : 'rgba(101,136,240,0.2)'}`,
          padding: '3px 10px', borderRadius: 3, display: 'inline-block',
        }}>{tag}</span>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4 }}>{name}</div>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, flex: 1 }}>{desc}</p>
      <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', alignSelf: 'flex-end' }}>↗</span>
    </Link>
  )
}

function CodeBlock({ lines, dark }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      background: dark ? 'var(--surface-3)' : 'var(--surface-2)',
      padding: 32, fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.8,
    }}>
      {lines.map(({ num, content }) => (
        <div key={num} style={{ display: 'flex', gap: 16 }}>
          <span style={{ opacity: 0.35, minWidth: 20, textAlign: 'right', userSelect: 'none' }}>{num}</span>
          <span>{content}</span>
        </div>
      ))}
    </div>
  )
}