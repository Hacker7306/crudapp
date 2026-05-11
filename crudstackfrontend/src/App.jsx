import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import ProtectedRoute from './Components/ProtectedRoute'
import AuthPage from './Pages/AuthPage'

function App() {

  return (
    <>
      <Navbar />
  <Routes>
        <Route path='/' element={<ProtectedRoute>
          <Home />
          </ProtectedRoute>} />
        <Route path='login' element={<AuthPage />} />
  </Routes>
    </>
  )
}

export default App
