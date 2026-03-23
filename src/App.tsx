import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/header'
import HomePage from './pages/home'
import { useAppDispatch, useAppSelector } from './hooks/store_hooks'
import { useEffect, type JSX } from 'react'
import Auth from './pages/auth'
import { CheckAuthThunk } from './features/voterSlice'

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { is_authenticated } = useAppSelector((state) => state.voterReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
const checkAuth =async() => await dispatch(CheckAuthThunk());

checkAuth()
  },[dispatch,is_authenticated])
  
  if (!is_authenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />
  }
  
  return children
}

function App() {
  const location = useLocation()
  const { is_authenticated } = useAppSelector((state) => state.voterReducer)

  return (
    <AnimatePresence mode="wait">
  <Header />
      
      <Routes location={location} key={location.pathname}>
        <Route 
          path="home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        /> 
        
        <Route 
          path="/" 
          element={
            is_authenticated ? <Navigate to="/home" replace /> : <Auth />
          } 
        /> 
        
        <Route 
          path='*' 
          element={
            is_authenticated ? <Navigate to="/home" replace /> : <Auth />
          }
        />
      </Routes> 
    </AnimatePresence>
  )
}

export default App