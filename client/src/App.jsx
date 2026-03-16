import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Musubi from './pages/Musubi'
import MusubiCommands from './pages/MusubiCommands'
import Denki from './pages/Denki'
import Fate from './pages/Fate'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <div className="grid-bg" />
      <div className="noise" />
      <Navbar />
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/musubi"            element={<Musubi />} />
        <Route path="/musubi/commands"   element={<MusubiCommands />} />
        <Route path="/denki"             element={<Denki />} />
        <Route path="/fate"              element={<Fate />} />
        <Route path="*"                  element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}