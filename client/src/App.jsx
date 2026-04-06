import './App.css'
import { Routes, Route } from "react-router-dom"
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import Arrivals from './pages/Arrivals'
import Archive from './pages/Archive'
import About from './pages/About'
import Collection from './pages/Collections'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/layout/Navbar'
import MainLayout from './layouts/MainLayout'
import useAuthStore from './store/AuthStore'
import { useEffect } from 'react'
import Dashboard from './pages/Admin/Dashboard'
import AdminProtect from './Protect/AdminProtect'

function App() {

  const { checkAuth } = useAuthStore()


  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/arrivals" element={<Arrivals />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminProtect><Dashboard /></AdminProtect>} />
        </Route>

      </Routes>
    </>
  )
}

export default App
