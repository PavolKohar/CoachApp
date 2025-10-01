import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/Home'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/userPages/UserProfile'
import { useAuth } from './context/AuthContext'
import AddClientForm from './components/clients/AddClientForm'
import ClientPage from './components/clients/ClientPage'




function App() {

  const { user } = useAuth();
  

  return (
    <>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/add-client/:userId" element={<AddClientForm />} />
        <Route path="/clients/:clientId" element={<ClientPage />} />
        

        
      </Routes>
    </>
  )
}

export default App
