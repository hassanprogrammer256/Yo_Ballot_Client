import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/home'
import Vote from './pages/vote'
import Header from './components/header'


function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="vote" element={<Vote />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App