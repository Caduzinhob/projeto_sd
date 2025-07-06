import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Agents from './pages/Agents'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/agents" element={
        <PrivateRoute>
          <Agents />
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
