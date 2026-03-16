import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo">KpnWorld</Link>
          <p className="footer-tagline">We build bots. Imagining the future.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">Bots</p>
            <Link to="/musubi">Musubi</Link>
            <Link to="/denki">Denki</Link>
            <Link to="/fate">Fate</Link>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Company</p>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
            <a href="https://github.com/kwcodex" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Network</p>
            <a href="https://discord.gg/F9PB47S3FJ" target="_blank" rel="noreferrer">Discord</a>
            <a href="/health">Status</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 KpnWorld. All rights reserved.</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>Built with React & Flask</span>
      </div>
    </footer>
  )
}